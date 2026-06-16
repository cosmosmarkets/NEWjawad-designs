'use client';
import '@/styles/canvas.css';
import '@/styles/pricing.css';
import SpatialCanvasPage from '@/components/canvas/SpatialCanvasPage';
import { sheetD, detailFor } from '@/lib/pricing-content';

export default function PricingPage() {
  return <SpatialCanvasPage sheet={sheetD} detailFor={detailFor} />;
}
