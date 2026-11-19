import type React from 'react';
import { useState } from 'react';
import { Home } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle = 'Didoabe Property',
  loading = 'lazy',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className="w-full h-full bg-gradient-to-br from-[#F3F7FE] via-[#E5EEFD] to-[#D6E4FC] flex flex-col items-center justify-center p-6 text-center select-none"
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-xl bg-white/90 border border-[#185DF1]/15 flex items-center justify-center mb-3 shadow-xs">
          <Home className="w-6 h-6 text-[#185DF1]" aria-hidden="true" />
        </div>
        <p className="text-sm font-medium text-[#031130] max-w-[22ch] leading-snug">
          {fallbackTitle}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

