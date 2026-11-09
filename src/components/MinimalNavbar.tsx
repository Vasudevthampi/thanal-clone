
import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { sectionLinks, sectionPathById } from '../data/sectionRoutes';

interface MinimalNavbarProps {
  onNavigateToSection: (id: string) => void;
}

export const MinimalNavbar: React.FC<MinimalNavbarProps> = ({
  onNavigateToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    window.history.pushState(null, '', sectionPathById[id] ?? '/');
    onNavigateToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header sticky top-0 z-40">
      <div className="site-header-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center text-left group transition-opacity hover:opacity-95 cursor-pointer"
          aria-label="Landscape Studio Home"
        >
          <BrandLogo
            light
            size="md"
            showSubtitle={false}
            showTagline={false}
            showEmblem={true}
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="site-navigation hidden md:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
          {sectionLinks.map((link) => (
            <a
              key={link.id}
              href={link.path}
              onClick={(event) => {
                event.preventDefault();
                handleNavClick(link.id);
              }}
              className="site-navigation-link transition-colors py-1 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-xs font-semibold text-stone-700 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-1">
            {sectionLinks.map((link) => (
              <a
                key={link.id}
                href={link.path}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick(link.id);
                }}
                className="text-left py-2 text-base font-medium text-stone-800 dark:text-stone-200 hover:text-emerald-800"
              >
                {link.label}
              </a>
            ))}
          </div>

        </div>
      )}
    </header>
  );
};
