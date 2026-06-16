/**
 * Home route. The whole homepage is the spatial canvas (Direction E) — the
 * camera engine lives in <HomeCamera/>. home.css (the ported e-* styles) is a
 * global stylesheet, imported here from inside app/ where Next allows it.
 */
import '@/styles/home.css';
import HomeCamera from '@/components/home/HomeCamera';

export default function Home() {
  return <HomeCamera />;
}
