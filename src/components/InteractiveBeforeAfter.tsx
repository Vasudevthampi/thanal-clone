import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle2 } from 'lucide-react';

type ViewMode = 'slider' | 'before' | 'after';

const steps = [
  { title: 'Prepare the ground', desc: 'Clear and shape the area for the new lawn.' },
  { title: 'Lay fresh turf', desc: 'Install new grass to create a softer garden floor.' },
  { title: 'Set the pathway', desc: 'Place stepping stones for an easy garden route.' },
  { title: 'Finish the planting', desc: 'Add greenery to bring the outdoor space together.' },
];

export const InteractiveBeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [viewMode, setViewMode] = useState<ViewMode>('slider');

  const beforeImage = '/images/lawn-before.jpg';
  const afterImage = '/images/lawn-after.jpg';

  const selectMode = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === 'before') setSliderPosition(100);
    if (mode === 'after') setSliderPosition(0);
    if (mode === 'slider') setSliderPosition(50);
  };

  return (
    <section id="transformation" className="transformation-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="transformation-heading">
          <div className="transformation-heading-copy">
            <p className="transformation-eyebrow">
              <span />
              A space, transformed
            </p>
            <h2 className="font-serif">
              From a lawn in progress
              <br />
              <em>to a garden path.</em>
            </h2>
          </div>
          <p className="transformation-intro">
            Compare the garden during installation with its lawn and stepping
            stone finish. Drag across the image to reveal each view.
          </p>
        </div>

        <div className="transformation-toolbar">
          <div className="transformation-mode-switch" aria-label="Comparison view">
            <button
              type="button"
              onClick={() => selectMode('slider')}
              aria-pressed={viewMode === 'slider'}
              className={viewMode === 'slider' ? 'is-selected' : ''}
            >
              <ArrowLeftRight className="h-4 w-4" />
              Compare
            </button>
            <button
              type="button"
              onClick={() => selectMode('before')}
              aria-pressed={viewMode === 'before'}
              className={viewMode === 'before' ? 'is-selected' : ''}
            >
              Before
            </button>
            <button
              type="button"
              onClick={() => selectMode('after')}
              aria-pressed={viewMode === 'after'}
              className={viewMode === 'after' ? 'is-selected' : ''}
            >
              After
            </button>
          </div>
          <span className="transformation-hint">
            {viewMode === 'slider' ? 'Drag to reveal' : 'Full image view'}
          </span>
        </div>

        <div className={`transformation-frame mode-${viewMode}`}>
          <img
            src={afterImage}
            alt="Garden with lawn and curved stepping-stone path"
            className="transformation-image transformation-image-after"
            draggable={false}
          />

          <div
            className="transformation-before-clip"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            aria-hidden="true"
          >
            <img
              src={beforeImage}
              alt=""
              className="transformation-image"
              draggable={false}
            />
            <div className="transformation-image-label transformation-label-before">
              Before
            </div>
          </div>

          <div
            className="transformation-after-label-clip"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            aria-hidden="true"
          >
            <div className="transformation-image-label transformation-label-after">
              After
            </div>
          </div>

          {viewMode === 'slider' && (
            <>
              <div
                className="transformation-divider"
                style={{ left: `${sliderPosition}%` }}
                aria-hidden="true"
              >
                <span>
                  <ArrowLeftRight className="h-5 w-5" />
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(event) => setSliderPosition(Number(event.target.value))}
                aria-label="Compare the site before and after landscaping"
                aria-valuetext={`${Math.round(sliderPosition)}% before image visible`}
                className="transformation-range"
              />
            </>
          )}

          <span className="transformation-frame-caption">
            Garden landscaping · Before &amp; after
          </span>
        </div>

        <div className="transformation-steps">
          {steps.map((step, index) => (
            <article key={step.title} className="transformation-step">
              <div className="transformation-step-number">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
