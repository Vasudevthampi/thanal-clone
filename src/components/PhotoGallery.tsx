import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const photos = [
  'assets/aistudio/5-00HouseFrontSouthFlowersDCP_0821_a9ca259f.jpg',
  'assets/aistudio/IMG_2446_76889e91.jpg',
  'assets/aistudio/index_0f10740b.jpg',
  'assets/aistudio/index_11_f3a8271c.jpg',
  'assets/aistudio/index_12_25f4d54f.jpg',
  'assets/aistudio/index_13_bf9141de.jpg',
  'assets/aistudio/index_15_b063b46c.jpg',
  'assets/aistudio/index_16_c47b2a35.jpg',
  'assets/aistudio/index_17_4e9cc61e.jpg',
  'assets/aistudio/index-10_e196da10.jpg',
  'assets/aistudio/index13_1f051231.jpg',
  'assets/aistudio/index-14-sharpened.jpg',
  'assets/aistudio/index-2_7c5f48d2.jpg',
  'assets/aistudio/index-3_d9296543.jpg',
  'assets/aistudio/index-4_c12e236d.jpg',
  'assets/aistudio/index-5_b0afa870.jpg',
  'assets/aistudio/index-6_1c857644.jpg',
  'assets/aistudio/index-7-sharpened.jpg',
  'assets/aistudio/index-8_b197b6cc.jpg',
  'assets/aistudio/index-9_3b8de573.jpg',
  'assets/aistudio/photo_1__1__bd5b5da2.JPG',
  'assets/aistudio/photo_1__3__1fbf574c.JPG',
  'assets/aistudio/photo_1_0e0ae330.JPG',
  'assets/aistudio/photo_2__1__cfa77fc8.JPG',
  'assets/aistudio/photo_2__2__400f61e6.JPG',
  'assets/aistudio/photo_2__3__df0670da.JPG',
  'assets/aistudio/photo_2__4__6027aaf3.JPG',
  'assets/aistudio/photo_2_c688fdbc.JPG',
  'assets/aistudio/photo_3__1__283598f1.JPG',
  'assets/aistudio/photo_3__3__93339f68.JPG',
  'assets/aistudio/photo_4__2__ddbee2d8.JPG',
  'assets/aistudio/photo_4_20a979ba.JPG',
  'assets/aistudio/photo_5_db838078.JPG',
  'images/checkerboard-garden-path.jpg',
  'images/flowering-garden-border.jpg',
  'images/garden-site-before.jpg',
  'images/geometric-steppers.jpg',
  'images/illuminated-living-wall.jpg',
  'images/lawn-after.jpg',
  'images/lawn-before.jpg',
  'images/living-wall-after.jpg',
  'images/living-wall-before.jpg',
  'images/pebble-garden-path.jpg',
  'images/tropical-living-wall.jpg',
  'images/walled-courtyard-lawn.jpg',
  ...Array.from(
    { length: 66 },
    (_, index) => `images/gallery/gallery-project-${String(index + 1).padStart(2, '0')}.jpg`,
  ),
].map((path, index) => ({
  src: `/${path}`,
  title: `Landscape project ${String(index + 1).padStart(2, '0')}`,
}));

export const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[number] | null>(null);
  const [visiblePhotoCount, setVisiblePhotoCount] = useState(8);
  const hasMorePhotos = visiblePhotoCount < photos.length;
  const displayedPhotos = photos.slice(0, visiblePhotoCount);

  useEffect(() => {
    if (!selectedPhoto) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedPhoto]);

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="photo-gallery-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="photo-gallery-heading">
          <div>
            <p className="photo-gallery-eyebrow">From our project archive</p>
            <h2 id="gallery-heading" className="font-serif">
              A closer look at <em>our work.</em>
            </h2>
          </div>
          <p>
            Explore our landscape projects, from residential gardens and
            pathways to living walls and larger outdoor spaces.
          </p>
        </div>

        <div className="photo-gallery-grid">
          {displayedPhotos.map((photo) => (
            <button
              key={photo.src}
              type="button"
              className="photo-gallery-card"
              onClick={() => setSelectedPhoto(photo)}
              aria-label={`View ${photo.title}`}
            >
              <img src={photo.src} alt={photo.title} loading="lazy" decoding="async" />
              <span>{photo.title}</span>
            </button>
          ))}
        </div>
        <div className="photo-gallery-more">
          <p aria-live="polite">
            Showing {displayedPhotos.length} of {photos.length} projects
          </p>
          <button
            type="button"
            onClick={() =>
              setVisiblePhotoCount(hasMorePhotos ? visiblePhotoCount + 8 : 8)
            }
          >
            {hasMorePhotos ? 'Show more projects' : 'Show fewer projects'}
          </button>
        </div>
      </div>

      {selectedPhoto && (
        <div
          className="photo-gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            className="photo-gallery-close"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close image"
          >
            <X className="h-5 w-5" />
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={selectedPhoto.src} alt={selectedPhoto.title} />
            <figcaption>{selectedPhoto.title}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};
