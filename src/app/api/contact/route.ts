import { Resend } from 'resend';

/**
 * Contact form backend — receives a submission from the /contact form and
 * emails it to the studio owner via Resend.
 *
 * Why a route handler (not a server action): the form lives inside a spatial
 * canvas built from HTML strings and hydrated imperatively, so a plain fetch()
 * to an endpoint is the least-invasive wiring. The API key stays server-side
 * (read from process.env), never shipped to the client.
 *
 * Sender is Resend's shared `onboarding@resend.dev`, which works without domain
 * verification; we set reply-to to the visitor so replies go straight to them.
 * Swap `from` for a verified domain address (e.g. hi@jawadj.design) once the
 * domain is verified in Resend.
 */

export const runtime = 'nodejs';

// Where submissions land. The owner's inbox = the Resend account address, so
// delivery is reliable even before a custom domain is verified.
const TO = 'hijawadjalal@gmail.com';
const FROM = 'Jawad Portfolio <onboarding@resend.dev>';

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'Bad request.' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();
  const tier = String(body.tier ?? '').trim();
  // Honeypot: a real human leaves this blank. Bots that fill every field trip it.
  const honeypot = String(body.website ?? '').trim();

  // Silently accept-and-drop spam so bots get no signal that they were caught.
  if (honeypot) return Response.json({ ok: true });

  if (!name || !email || !message || !isEmail(email)) {
    return Response.json({ ok: false, error: 'Please add your name, a valid email, and a message.' }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Fail loud in dev rather than pretending it sent.
    console.error('RESEND_API_KEY is not set — cannot send contact email.');
    return Response.json({ ok: false, error: 'Email is not configured on the server.' }, { status: 500 });
  }

  const tierLine = tier && tier !== '—' ? ` · ${tier}` : '';
  const resend = new Resend(key);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New enquiry — ${name}${tierLine}`,
      text: `From: ${name} <${email}>${tierLine}\n\n${message}`,
      html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;${tierLine ? ` · ${escapeHtml(tier)}` : ''}</p>`
        + `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });

    if (error) {
      console.error('Resend send error:', error);
      return Response.json({ ok: false, error: 'Could not send right now.' }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error('Contact send failed:', err);
    return Response.json({ ok: false, error: 'Could not send right now.' }, { status: 502 });
  }
}

// Minimal HTML escaping for the values we interpolate into the email body.
function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
