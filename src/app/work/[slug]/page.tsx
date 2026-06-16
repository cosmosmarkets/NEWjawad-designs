'use client';
import '@/styles/canvas.css';
import '@/styles/slug.css';
import SpatialCanvasPage from '@/components/canvas/SpatialCanvasPage';
import { sheetD } from '@/lib/slug-content';

// The prototype only populates the case-study template with weld, so every
// slug renders the weld write-up (other projects would slot into the same
// shape). Pan/zoom + hero→all wires, no zoom-into-detail; the slug's larger
// home scale (0.78) and 0.3 zoom floor come through engineOpts.
export default function CaseStudyPage() {
  return (
    <SpatialCanvasPage
      sheet={sheetD}
      engineOpts={{ mainHomeScale: 0.78, zoomMin: 0.3, wireSelector: '.sc-panel:not(.sc-hero)', wireClass: '' }}
    />
  );
}
