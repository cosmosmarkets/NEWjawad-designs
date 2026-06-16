/**
 * Phase-1 route placeholder. Just enough to label a route and prove the shell
 * (nav fill snap, cursor, view-transition) works across navigations. Real
 * content lands in Phase 4.
 */
export default function Placeholder({ name, sub }: { name: string; sub?: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 pb-32 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">Phase 1 · stub route</p>
      <h1 className="font-hand text-6xl text-ink sm:text-7xl">{name}</h1>
      {sub && <p className="max-w-md font-mono text-sm leading-relaxed text-ink-soft">{sub}</p>}
    </main>
  );
}
