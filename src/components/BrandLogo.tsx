import React from 'react';
import { Leaf } from 'lucide-react';

interface BrandLogoProps {
  customLogoUrl?: string | null;
  emblemUrl?: string;
  light?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showTagline?: boolean;
  showEmblem?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  customLogoUrl,
  emblemUrl,
  light = false,
  className = '',
  size = 'md',
  showSubtitle = true,
  showTagline = true,
  showEmblem = true,
}) => {
  const logoSrc = customLogoUrl || emblemUrl;

  const logoHeightClass =
    size === 'sm'
      ? 'h-10'
      : size === 'lg'
      ? 'h-16'
      : size === 'xl'
      ? 'h-20'
      : 'h-12 sm:h-14';

  return (
    <div className={`flex items-center ${showEmblem ? 'gap-2.5 sm:gap-3' : ''} ${className}`}>
      {showEmblem && (
        logoSrc ? (
          <img
            src={logoSrc}
            alt="Landscape Studio"
            className={`${logoHeightClass} w-auto max-w-[190px] object-contain shrink-0 drop-shadow-xs transition-transform hover:scale-105`}
          />
        ) : (
          <Leaf className={`${logoHeightClass} w-auto text-emerald-400`} aria-hidden="true" />
        )
      )}

      {(showSubtitle || showTagline) && (
        <div className="flex flex-col">
          <div>
            <span className={`font-serif font-bold text-base sm:text-lg tracking-tight leading-none ${light ? 'text-[#f7f3e8]' : 'text-[#16291b] dark:text-stone-100'}`}>
              Landscape Studio
            </span>
          </div>

          {showTagline && (
            <span className={`text-[10px] italic font-serif leading-tight mt-0.5 ${light ? 'text-[#f7f3e8]' : 'text-stone-600 dark:text-stone-300'}`}>
              Thoughtful outdoor spaces
            </span>
          )}

          {showSubtitle && (
            <span className={`text-[9px] tracking-wider uppercase font-sans font-medium leading-tight ${light ? 'text-[#f7f3e8]' : 'text-stone-500 dark:text-stone-400'}`}>
              Landscape design
            </span>
          )}
        </div>
      )}
    </div>
  );
};
