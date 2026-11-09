import React, { useState, useRef, useCallback } from 'react';
import { Sliders } from 'lucide-react';
const DEFAULT_BEFORE_IMAGE = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"><defs><linearGradient id="s" x2="0" y2="1"><stop stop-color="#b9c9cc"/><stop offset="1" stop-color="#e7d6bb"/></linearGradient></defs><rect width="1200" height="700" fill="url(#s)"/><path fill="#a8492d" d="M0 390 260 330 520 400 830 340 1200 390V700H0Z"/><path fill="#873b29" d="m0 540 310-85 290 80 300-90 300 55v200H0Z"/></svg>'
)}`;
const DEFAULT_AFTER_IMAGE = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"><defs><linearGradient id="s" x2="0" y2="1"><stop stop-color="#9bc3d0"/><stop offset="1" stop-color="#e4d7b6"/></linearGradient></defs><rect width="1200" height="700" fill="url(#s)"/><path fill="#527d47" d="M0 390 260 330 520 400 830 340 1200 390V700H0Z"/><path fill="#32633a" d="m0 540 310-85 290 80 300-90 300 55v200H0Z"/><path fill="#c9b99a" d="m500 700 150-360 60 0 150 360z"/><g fill="#a65d3c"><path d="M180 440h60l-6 55h-48zM970 405h60l-6 55h-48z"/></g></svg>'
)}`;

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [])

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="before-after" className="py-16 sm:py-20 bg-stone-100/60 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-forest-800 dark:text-emerald-400">
            <span>Visual Evidence</span>
            <span aria-hidden="true">·</span>
            <span>Site Transformation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 dark:text-stone-100 text-balance">
            Before &amp; After: A Garden Transformation
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Drag the slider horizontally to view the metamorphosis from raw unpaved red earth into an emerald lawn with chiseled granite steppers and terracotta amphoras.
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => { isDragging.current = true; }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseLeave={() => { isDragging.current = false; }}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[340px] sm:h-[480px] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border border-stone-300 dark:border-stone-700 shadow-xl"
          >
            {/* Finished landscape */}
            <img
              src={DEFAULT_AFTER_IMAGE}
              alt="After: Finished garden with stepping stones and terracotta urns"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* "Before" Image (Authentic pre-construction red soil terrain) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={DEFAULT_BEFORE_IMAGE}
                alt="Before: Pre-construction site conditions and raw earthworks"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                }}
                draggable={false}
              />
              
              {/* "Before" Label */}
              <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-xs text-white text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded">
                Pre-Construction Phase (Raw Soil)
              </div>
            </div>

            {/* "After" Label */}
            <div className="absolute top-4 right-4 bg-forest-950/80 backdrop-blur-xs text-emerald-300 text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded">
              Completed Landscape
            </div>

            {/* Divider Line & Drag Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-forest-900 border-2 border-white text-white flex items-center justify-center shadow-lg">
                <Sliders className="w-4 h-4 text-emerald-400 rotate-90" />
              </div>
            </div>

            {/* Bottom info caption */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-xs pointer-events-none">
              <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded">
                Drag slider to inspect red soil grading, turf installation &amp; stone pathway
              </span>
            </div>
          </div>

          {/* Quick specs for the showcase */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
            <span>Project: Courtyard Garden</span>
            <span>Design: Garden pathway</span>
            <span>Features: Lawn, stone steppers, and planting</span>
          </div>
        </div>

      </div>
    </section>
  );
};
