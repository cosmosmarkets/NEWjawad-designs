'use client';
import '@/styles/canvas.css';
import '@/styles/contact.css';
import SpatialCanvasPage from '@/components/canvas/SpatialCanvasPage';
import { sheetD, detailFor, TIER_NAMES } from '@/lib/contact-content';

/**
 * Wires the in-form tier label, ported from contact-render.js's setTier:
 * the segmented control (and a ?tier= query, the "pre-filled from /pricing"
 * link) updates the tier name + the pressed button + the is-set border.
 * Scoped to the canvas root (the prototype used document.body; we keep it
 * local so it doesn't bleed across route changes).
 *
 * Also wires the real form submit: posts to /api/contact (Resend) and reports
 * progress/success/error on the `.cf-status` aria-live line. Kept plain (text
 * swaps, no GSAP) so it's reduced-motion-safe by default.
 */
function wireForm(root: HTMLElement) {
  const setTier = (raw: string | undefined) => {
    const k = raw && TIER_NAMES[raw] ? raw : 'none';
    root.querySelectorAll('[data-tier-name]').forEach((el) => (el.textContent = TIER_NAMES[k]));
    root.querySelectorAll<HTMLElement>('.cf-tierseg button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tier === k)));
    root.querySelectorAll('.cf-tier').forEach((t) => t.classList.toggle('is-set', k !== 'none'));
  };
  const onClick = (e: MouseEvent) => {
    const seg = (e.target as Element).closest<HTMLElement>('.cf-tierseg button');
    if (seg) {
      e.preventDefault();
      setTier(seg.dataset.tier);
    }
  };

  const form = root.querySelector<HTMLFormElement>('.cf-form');
  const status = root.querySelector<HTMLElement>('.cf-status');
  const send = root.querySelector<HTMLButtonElement>('.cf-send');
  const val = (name: string) => (form?.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`)?.value || '').trim();
  const setStatus = (msg: string, state: '' | 'ok' | 'err') => {
    if (!status) return;
    status.textContent = msg;
    status.dataset.state = state;
  };

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!send || send.disabled) return;
    const name = val('name');
    const email = val('email');
    const message = val('message');
    // Light client check — the server validates again, this is just fast feedback.
    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
      setStatus('Add your name, a valid email, and a message.', 'err');
      return;
    }
    send.disabled = true;
    const label = send.textContent;
    send.textContent = 'Sending…';
    setStatus('', '');
    try {
      const tier = root.querySelector<HTMLElement>('[data-tier-name]')?.textContent?.trim() || '';
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, tier, website: val('website') }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        send.textContent = 'Sent ✓';
        setStatus("Sent — I'll reply soon.", 'ok');
        form?.reset();
        setTier('none');
        return; // leave the button disabled; the message has gone.
      }
      setStatus(data.error || 'Could not send — email me at hi@jawadj.design', 'err');
    } catch {
      setStatus('Could not send — email me at hi@jawadj.design', 'err');
    }
    send.disabled = false;
    send.textContent = label || 'Send it ▸';
  };

  root.addEventListener('click', onClick);
  form?.addEventListener('submit', onSubmit);
  setTier(new URLSearchParams(window.location.search).get('tier') || 'none');
  return () => {
    root.removeEventListener('click', onClick);
    form?.removeEventListener('submit', onSubmit);
  };
}

export default function ContactPage() {
  // Higher home scale than the default 0.46 — the form is the focal panel and
  // should feel closer when you land from nav (ORDER →).
  return (
    <SpatialCanvasPage
      sheet={sheetD}
      detailFor={detailFor}
      engineOpts={{ mainHomeScale: 0.68 }}
      onMount={wireForm}
    />
  );
}
