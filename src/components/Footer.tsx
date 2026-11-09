import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Image } from 'lucide-react';

interface FooterProps {
  customLogoUrl?: string | null;
  onOpenAssetModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  customLogoUrl,
  onOpenAssetModal,
}) => {
  return (
    <footer className="bg-forest-950 text-stone-300 pt-16 pb-12 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-900">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo
              customLogoUrl={customLogoUrl}
              size="lg"
              className="text-white"
            />

            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Thoughtful landscape design for courtyards, gardens, and outdoor
              living spaces.
            </p>

            <div className="text-[11px] font-mono text-emerald-400">
              Landscape planning · Outdoor living
            </div>
          </div>

          {/* Disciplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100">
              Disciplines
            </h4>

            <ul className="text-xs space-y-2 text-stone-400">
              <li><a href="#services" className="hover:text-white transition-colors">Landscape Masterplanning</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Stone Hardscaping &amp; Walls</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Reflecting Rills &amp; Water</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Courtyard Microclimates</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Sky Terraces &amp; Louvers</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Native Horticulture</a></li>
            </ul>
          </div>

          {/* Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100">
              Explore
            </h4>

            <ul className="text-xs space-y-2 text-stone-400">
              <li><a href="#portfolio" className="hover:text-white transition-colors">Villa Portfolio</a></li>
              <li><a href="#estimator" className="hover:text-white transition-colors">Cost &amp; Timeline Estimator</a></li>
              <li><a href="#before-after" className="hover:text-white transition-colors">Site Transformations</a></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">Design Approach</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Book Consultation</a></li>
            </ul>
          </div>

          {/* Brand & Assets */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100">
              Brand &amp; Assets
            </h4>

            <ul className="text-xs space-y-2 text-stone-400">
              <li>
                <button
                  onClick={onOpenAssetModal}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <Image className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Upload Custom Photos &amp; Logo</span>
                </button>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Landscape Studio. All rights reserved.
          </div>

        </div>

      </div>
    </footer>
  );
};