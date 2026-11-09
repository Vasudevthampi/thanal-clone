import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { Image, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  customLogoUrl?: string | null;
  onOpenAssetModal: () => void;
  onNavigateToEstimate: () => void;
  onNavigateToContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  customLogoUrl,
  onOpenAssetModal,
  onNavigateToEstimate,
  onNavigateToContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">

        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center shrink-0 focus:outline-none"
          aria-label="Landscape Studio Home"
        >
          <BrandLogo customLogoUrl={customLogoUrl} size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700 dark:text-stone-300">
          <a href="#services" className="hover:text-forest-900 dark:hover:text-stone-100 transition-colors whitespace-nowrap shrink-0">
            Services
          </a>

          <a href="#portfolio" className="hover:text-forest-900 dark:hover:text-stone-100 transition-colors whitespace-nowrap shrink-0">
            Portfolio
          </a>

          <a
            href="#estimator"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToEstimate();
            }}
            className="hover:text-forest-900 dark:hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <span>Cost Estimator</span>
          </a>

          <a href="#before-after" className="hover:text-forest-900 dark:hover:text-stone-100 transition-colors whitespace-nowrap shrink-0">
            Transformations
          </a>

          <a href="#philosophy" className="hover:text-forest-900 dark:hover:text-stone-100 transition-colors whitespace-nowrap shrink-0">
            Philosophy
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToContact();
            }}
            className="hover:text-forest-900 dark:hover:text-stone-100 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Upload Photos & Logo */}
          <button
            onClick={onOpenAssetModal}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors rounded-lg whitespace-nowrap shrink-0"
            title="Upload your company logo and photos"
          >
            <Image className="w-3.5 h-3.5 text-forest-700" />
            <span>Upload Photos/Logo</span>
          </button>

          {/* Book Consultation */}
          <button
            onClick={onNavigateToContact}
            className="hidden sm:inline-flex px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-semibold text-white bg-forest-900 hover:bg-forest-800 active:bg-forest-950 transition-colors rounded-lg shadow-xs items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-stone-700 dark:text-stone-300 hover:text-stone-950 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors focus:outline-none flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 space-y-3">

          <nav className="flex flex-col space-y-2 text-sm font-medium text-stone-700 dark:text-stone-300">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800">
              Services
            </a>

            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800">
              Portfolio
            </a>

            <a
              href="#estimator"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToEstimate();
              }}
              className="px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-between"
            >
              <span>Cost Estimator</span>
              <span className="text-[10px] bg-forest-100 text-forest-800 px-2 py-0.5 rounded font-mono">
                Live
              </span>
            </a>

            <a href="#before-after" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800">
              Transformations
            </a>

            <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800">
              Philosophy
            </a>

            <a
              href="#contact"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToContact();
              }}
              className="px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Actions */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2">

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssetModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-stone-700 bg-stone-100 dark:bg-stone-800 rounded-lg"
            >
              <Image className="w-4 h-4 text-forest-700" />
              <span>Upload Photos &amp; Logo</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToContact();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-white bg-forest-900 rounded-lg"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};