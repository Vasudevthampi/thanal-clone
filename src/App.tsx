
import React, { useEffect, useState } from 'react';
import { MinimalNavbar } from './components/MinimalNavbar';
import { MinimalHero } from './components/MinimalHero';
import { InteractiveShowcase } from './components/InteractiveShowcase';
import { PhotoGallery } from './components/PhotoGallery';
import { InteractiveBeforeAfter } from './components/InteractiveBeforeAfter';
import { ClientsSection } from './components/ClientsSection';
import { LandscapeStudio } from './components/LandscapeStudio';
import { MinimalContact } from './components/MinimalContact';
import { MinimalFooter } from './components/MinimalFooter';
import { LandscapePhoto } from './data/photos';
import { sectionIdByPath } from './data/sectionRoutes';

export default function App() {
  const [selectedPhotoForModal, setSelectedPhotoForModal] =
    useState<LandscapePhoto | null>(null);

  const [contactInitialNotes, setContactInitialNotes] = useState('');

  useEffect(() => {
    const scrollToCurrentRoute = () => {
      const sectionId = sectionIdByPath[window.location.pathname];
      if (sectionId) {
        const scroll = () => {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: 'instant' });
        };
        requestAnimationFrame(() => requestAnimationFrame(scroll));
      }
    };

    scrollToCurrentRoute();
    window.addEventListener('popstate', scrollToCurrentRoute);
    return () => window.removeEventListener('popstate', scrollToCurrentRoute);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireAboutDesign = (designTitle: string) => {
    setContactInitialNotes(
      `I am interested in a landscaping design concept similar to "${designTitle}".`
    );
    scrollTo('inquire');
  };

  const handleRequestQuote = (brief: string) => {
    setContactInitialNotes(brief);
    scrollTo('inquire');
  };

  const handleSelectPhotoForStudio = (_photo: LandscapePhoto) => {
    scrollTo('studio');
  };

  return (
    <div className="site-app min-h-screen flex flex-col antialiased">

      {/* Minimal Top Navigation */}
      <MinimalNavbar
        onNavigateToSection={scrollTo}
      />

      {/* Main Content Sections */}
      <main className="flex-1">

        {/* 1. Hero */}
        <MinimalHero
          onExploreProjects={() => scrollTo('showcase')}
          onOpenStudio={() => scrollTo('studio')}
          onSelectPhoto={(photo) => setSelectedPhotoForModal(photo)}
        />

        {/* 2. Interactive Photo Showcase */}
        <InteractiveShowcase
          onSelectForStudio={handleSelectPhotoForStudio}
          onInquireAboutDesign={handleInquireAboutDesign}
          selectedPhotoForModal={selectedPhotoForModal}
          onClosePhotoModal={() => setSelectedPhotoForModal(null)}
          onOpenPhotoModal={(photo) => setSelectedPhotoForModal(photo)}
        />

        <PhotoGallery />

        {/* Client marquee */}
        <ClientsSection />

        {/* 3. Before & After Transformation */}
        <InteractiveBeforeAfter />

        {/* 4. Interactive Landscape Studio */}
        <LandscapeStudio onRequestQuote={handleRequestQuote} />

        {/* 5. Contact Section */}
        <MinimalContact initialNotes={contactInitialNotes} />

      </main>

      {/* Minimal Footer */}
      <MinimalFooter />

    </div>
  );
}
