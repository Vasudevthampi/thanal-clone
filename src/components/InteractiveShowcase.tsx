import React, { useState, useEffect, useCallback } from 'react';
import { Maximize2, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, X, MessageCircle, Sparkles } from 'lucide-react';
import { LANDSCAPE_PHOTOS, LandscapePhoto } from '../data/photos';

interface InteractiveShowcaseProps {
  onSelectForStudio?: (photo: LandscapePhoto) => void;
  onInquireAboutDesign?: (designTitle: string) => void;
  selectedPhotoForModal?: LandscapePhoto | null;
  onClosePhotoModal?: () => void;
  onOpenPhotoModal?: (photo: LandscapePhoto) => void;
}

export const InteractiveShowcase: React.FC<InteractiveShowcaseProps> = ({
  onSelectForStudio,
  onInquireAboutDesign,
  selectedPhotoForModal,
  onClosePhotoModal,
  onOpenPhotoModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [internalActivePhoto, setInternalActivePhoto] = useState<LandscapePhoto | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Sync with prop if passed
  const activeModalPhoto = selectedPhotoForModal || internalActivePhoto;

  const categories = [
    { id: 'all', label: 'All Projects', count: LANDSCAPE_PHOTOS.length },
    { id: 'lawn', label: 'Lawn Transformations', count: LANDSCAPE_PHOTOS.filter((p) => p.category === 'lawn').length },
    { id: 'pebbles', label: 'Stone & Pebble Zen', count: LANDSCAPE_PHOTOS.filter((p) => p.category === 'pebbles').length },
    { id: 'vertical', label: 'Vertical Green Walls', count: LANDSCAPE_PHOTOS.filter((p) => p.category === 'vertical').length },
    { id: 'paths', label: 'Pathways & Steppers', count: LANDSCAPE_PHOTOS.filter((p) => p.category === 'paths').length },
    { id: 'nooks', label: 'Courtyard Nooks', count: LANDSCAPE_PHOTOS.filter((p) => p.category === 'nooks').length },
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? LANDSCAPE_PHOTOS
      : LANDSCAPE_PHOTOS.filter((p) => p.category === activeCategory);

  const handleOpenPhoto = (photo: LandscapePhoto) => {
    setZoomLevel(1);
    if (onOpenPhotoModal) {
      onOpenPhotoModal(photo);
    } else {
      setInternalActivePhoto(photo);
    }
  };

  const handleClose = () => {
    setZoomLevel(1);
    if (onClosePhotoModal) {
      onClosePhotoModal();
    }
    setInternalActivePhoto(null);
  };

  const handleNextPhoto = useCallback(() => {
    if (!activeModalPhoto) return;
    setZoomLevel(1);
    const currentIndex = LANDSCAPE_PHOTOS.findIndex((p) => p.id === activeModalPhoto.id);
    const nextIndex = (currentIndex + 1) % LANDSCAPE_PHOTOS.length;
    const nextPhoto = LANDSCAPE_PHOTOS[nextIndex];
    if (onOpenPhotoModal) {
      onOpenPhotoModal(nextPhoto);
    } else {
      setInternalActivePhoto(nextPhoto);
    }
  }, [activeModalPhoto, onOpenPhotoModal]);

  const handlePrevPhoto = useCallback(() => {
    if (!activeModalPhoto) return;
    setZoomLevel(1);
    const currentIndex = LANDSCAPE_PHOTOS.findIndex((p) => p.id === activeModalPhoto.id);
    const prevIndex = currentIndex === 0 ? LANDSCAPE_PHOTOS.length - 1 : currentIndex - 1;
    const prevPhoto = LANDSCAPE_PHOTOS[prevIndex];
    if (onOpenPhotoModal) {
      onOpenPhotoModal(prevPhoto);
    } else {
      setInternalActivePhoto(prevPhoto);
    }
  }, [activeModalPhoto, onOpenPhotoModal]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalPhoto) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalPhoto, handleNextPhoto, handlePrevPhoto]);

  return (
    <section id="showcase" className="py-16 sm:py-24 bg-white dark:bg-[#151715] border-t border-stone-200/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="project-gallery-heading flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest mb-2">
              <span className="w-5 h-0.5 bg-emerald-700 dark:bg-emerald-400"></span>
              <span>Project Portfolio</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#142318] dark:text-stone-100">
              Outside, reimagined.
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-xl">
              A closer look at gardens and gathering places shaped by thoughtful design.
            </p>
          </div>

          <span className="text-xs text-stone-500 font-sans">
            Showing {filteredPhotos.length} of {LANDSCAPE_PHOTOS.length} project photos
          </span>
        </div>

        {/* Minimal Category Tabs (Zero-pill button controls with active states) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#172b1d] text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <span>{cat.label}</span>
              <span className="ml-1.5 opacity-60 text-xs">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Clean Photo Gallery Grid */}
        <div className="project-image-wall">
          {filteredPhotos.map((photo, index) => (
            <article
              key={photo.id}
              className="project-tile group"
            >
              <div className="project-tile-visual">
                <button
                  type="button"
                  aria-label={`View ${photo.title}`}
                  onClick={() => handleOpenPhoto(photo)}
                  className="project-tile-image-button"
                >
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="project-tile-image"
                />
                </button>
                <div className="project-tile-shade" />
                <div className="project-tile-number">
                  {String(index + 1).padStart(2, '0')}
                </div>
                {photo.highlight && (
                  <span className="project-tile-highlight">{photo.highlight}</span>
                )}
                <div className="project-tile-copy">
                  <span className="project-tile-category">
                    {photo.categoryLabel}
                  </span>
                  <h3>{photo.title}</h3>
                  <p>{photo.description}</p>
                  <div className="project-tile-actions">
                    <button onClick={() => handleOpenPhoto(photo)}>
                      View project <Maximize2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onInquireAboutDesign?.(photo.title)}
                    >
                      Inquire <MessageCircle className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Interactive Fullscreen Lightbox Modal */}
      {activeModalPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] bg-stone-950 text-white rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-stone-800 bg-stone-900/80">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                  {activeModalPhoto.categoryLabel}
                </span>
                <span className="text-stone-600" aria-hidden="true">·</span>
                <span className="text-xs text-stone-400 truncate max-w-[200px] sm:max-w-md">
                  {activeModalPhoto.title}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
                  className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800"
                  title="Zoom In"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 1))}
                  className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800"
                  title="Zoom Out"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 ml-2"
                  title="Close (Esc)"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative flex-1 overflow-auto bg-black flex items-center justify-center min-h-[350px] sm:min-h-[500px]">
              <div
                style={{ transform: `scale(${zoomLevel})` }}
                className="transition-transform duration-200 ease-out origin-center max-w-full max-h-[65vh] flex items-center justify-center p-2"
              >
                <img
                  src={activeModalPhoto.src}
                  alt={activeModalPhoto.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain select-none"
                />
              </div>

              {/* Previous / Next buttons */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white backdrop-blur-xs transition-colors"
                title="Previous photo (Left arrow)"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white backdrop-blur-xs transition-colors"
                title="Next photo (Right arrow)"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Bottom Information & Actions */}
            <div className="p-4 sm:p-5 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-2xl">
                <h3 className="font-serif text-lg font-bold text-white">
                  {activeModalPhoto.title}
                </h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {activeModalPhoto.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {onSelectForStudio && (
                  <button
                    onClick={() => {
                      onSelectForStudio(activeModalPhoto);
                      handleClose();
                    }}
                    className="px-4 py-2 text-xs font-semibold text-stone-200 bg-stone-800 hover:bg-stone-700 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Load in Studio</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onInquireAboutDesign?.(activeModalPhoto.title);
                    handleClose();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Plan a project</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
