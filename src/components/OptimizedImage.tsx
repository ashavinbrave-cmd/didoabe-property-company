import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  '/assets/aistudio/DIDOABE_LOGO_d8bd4994.jpg': { width: 282, height: 282 },
  '/assets/images/client-consultation.jpg': { width: 547, height: 365 },
  '/assets/images/property-handover.jpg': { width: 447, height: 447 },
  '/assets/images/residential-estate.jpg': { width: 455, height: 303 },
  '/assets/images/residential-homes.jpg': { width: 590, height: 444 },
  '/assets/images/residential-property.jpg': { width: 638, height: 480 },
};

const IMAGE_FALLBACK_SRC = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480"><rect width="640" height="480" fill="#eff6ff"/><path d="M0 376h640v104H0z" fill="#dbeafe"/><g fill="#fff" stroke="#0369a1" stroke-linejoin="round" stroke-width="10"><path d="m154 247 166-123 166 123v129H154z"/><path d="M266 376V264h108v112"/></g><g fill="#bfdbfe"><path d="M191 263h43v43h-43zM406 263h43v43h-43zM285 285h28v31h-28zM327 285h28v31h-28z"/></g><text x="320" y="430" fill="#075985" font-family="Arial,sans-serif" font-size="23" font-weight="600" text-anchor="middle">Image unavailable</text></svg>',
)}`;

const getResponsiveSrcSet = (src: string, width: number): string =>
  [...new Set([320, 480, width])]
    .filter((candidateWidth) => candidateWidth <= width)
    .sort((a, b) => a - b)
    .map((candidateWidth) => {
      const candidateSrc = candidateWidth === width
        ? src
        : src.replace(/\.jpg$/i, `-${candidateWidth}.jpg`);
      return `${candidateSrc} ${candidateWidth}w`;
    })
    .join(', ');

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  srcSet,
  sizes,
  width,
  height,
  alt,
  onError,
  ...props
}) => {
  const dimensions = IMAGE_DIMENSIONS[src];
  const [failedSource, setFailedSource] = React.useState<string | null>(null);
  const hasFailed = failedSource === src;

  const handleImageError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    setFailedSource(src);
    onError?.(event);
  };

  return (
    <img
      src={hasFailed ? IMAGE_FALLBACK_SRC : src}
      srcSet={hasFailed ? undefined : srcSet ?? (dimensions ? getResponsiveSrcSet(src, dimensions.width) : undefined)}
      sizes={sizes ?? '(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw'}
      width={width ?? dimensions?.width}
      height={height ?? dimensions?.height}
      alt={hasFailed && alt ? `Image unavailable: ${alt}` : alt}
      onError={hasFailed ? undefined : handleImageError}
      {...props}
    />
  );
};
