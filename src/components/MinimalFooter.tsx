import React from 'react';
import { ArrowUp } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface MinimalFooterProps {
  customLogoUrl?: string | null;
}

export const MinimalFooter: React.FC<MinimalFooterProps> = ({ customLogoUrl }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer bg-[#111311] text-stone-400 text-xs border-t border-stone-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <BrandLogo customLogoUrl={customLogoUrl} size="md" showSubtitle={false} showTagline={false} />
          <span className="text-[11px]">Thoughtful outdoor spaces</span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-[11px]">
            © {new Date().getFullYear()} Landscape Studio
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors cursor-pointer self-start sm:self-auto"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
