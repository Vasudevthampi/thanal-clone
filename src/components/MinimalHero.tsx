import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { LandscapePhoto } from '../data/photos';

interface MinimalHeroProps {
  onExploreProjects: () => void;
  onOpenStudio: () => void;
  onSelectPhoto: (photo: LandscapePhoto) => void;
}

export const MinimalHero: React.FC<MinimalHeroProps> = ({
  onExploreProjects,
  onOpenStudio,
  onSelectPhoto,
}) => {
  const heroPhotos: LandscapePhoto[] = [
    {
      id: 'hero-tropical-lawn',
      title: 'A Tropical Garden Lawn',
      category: 'lawn',
      categoryLabel: 'Tropical Garden Landscapes',
      src: '/images/hero-tropical-lawn-16x9.jpg',
      description: 'A spacious green lawn framed by palms, clipped hedges, and mature tropical trees.',
      aspect: 'landscape',
    },
    {
      id: 'hero-stone-courtyard',
      title: 'A Stone Courtyard Garden',
      category: 'paths',
      categoryLabel: 'Stone Courtyards',
      src: '/images/hero-stone-courtyard-16x9.jpg',
      description: 'A geometric stone courtyard surrounds a green island beneath mature palms.',
      aspect: 'landscape',
    },
    {
      id: 'hero-villa-garden',
      title: 'A Villa Garden Entrance',
      category: 'paths',
      categoryLabel: 'Villa Garden Design',
      src: '/images/hero-villa-garden-16x9.jpg',
      description: 'A spacious villa entrance with patterned paving and tropical planting.',
      aspect: 'landscape',
    },
    {
      id: 'hero-public-landscape',
      title: 'A Public Garden Landscape',
      category: 'nooks',
      categoryLabel: 'Public Landscapes',
      src: '/images/hero-public-landscape-16x9.jpg',
      description: 'Aerial view of a landscaped public space with curved pathways and lawn.',
      aspect: 'landscape',
    },
    {
      id: 'hero-sanctuary-garden',
      title: 'A Sanctuary Garden',
      category: 'nooks',
      categoryLabel: 'Sanctuary Gardens',
      src: '/images/hero-sanctuary-garden-16x9.jpg',
      description: 'Lush greenery and mature trees complement the architecture of a peaceful sanctuary.',
      aspect: 'landscape',
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto advance every 6 seconds if user isn't interacting
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroPhotos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroPhotos.length]);

  const activePhoto = heroPhotos[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroPhotos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroPhotos.length);
  };

  return (
    <section id="home" className="hero-stage group relative overflow-hidden">
      <button
        type="button"
        aria-label={`View featured project: ${activePhoto.title}`}
        className="hero-stage-image-button"
        onClick={() => onSelectPhoto(activePhoto)}
      >
        <img
          src={activePhoto.src}
          alt=""
          className="hero-stage-image"
        />
      </button>
      <div className="hero-stage-shade absolute inset-0" />

      <div className="hero-stage-topline">
        <span>LANDSCAPE DESIGN</span>
        <span className="hero-stage-location">GARDENS · OUTDOOR LIVING</span>
      </div>

      <div className="hero-stage-content">
        <p className="hero-stage-kicker">THOUGHTFUL OUTDOOR SPACES</p>
        <h1 className="hero-stage-title">
          GARDENS
          <br />
          <span className="hero-stage-tagline">
            <span className="hero-stage-tagline-protect">MADE FOR</span>
            <br />
            <span className="hero-stage-tagline-highlight">LIVING</span>
          </span>
        </h1>
        <div className="hero-stage-bottom">
          <div>
            <p className="hero-stage-description">
              Thoughtful landscapes, rooted in nature.
              <br className="hidden sm:block" /> Made for the way you live.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={onExploreProjects}
                className="editorial-button editorial-button-primary"
              >
                Explore our work <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onOpenStudio}
                className="editorial-button editorial-button-glass"
              >
                <Sparkles className="h-4 w-4" />
                Garden planner
              </button>
            </div>
          </div>

          <div className="hero-stage-project">
            <span>{activePhoto.categoryLabel}</span>
            <button onClick={() => onSelectPhoto(activePhoto)}>
              {activePhoto.title}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="hero-stage-controls" aria-label="Featured project carousel">
        <span className="hero-stage-index">
          {String(currentIndex + 1).padStart(2, '0')}
          <span />
          {String(heroPhotos.length).padStart(2, '0')}
        </span>
        {heroPhotos.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Show project ${idx + 1}: ${photo.title}`}
            aria-current={currentIndex === idx}
            className={`hero-stage-progress ${currentIndex === idx ? 'is-active' : ''}`}
          />
        ))}
        <button onClick={handlePrev} aria-label="Previous featured project" className="hero-stage-arrow">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button onClick={handleNext} aria-label="Next featured project" className="hero-stage-arrow">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};
