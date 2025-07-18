import { useState, useEffect, useRef } from 'react';
import { usePerformance } from '../hooks/use-performance';
import { useIsSmallMobile } from '../hooks/use-mobile';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  style = {},
  width,
  height,
  loading = 'lazy',
  priority = false
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { shouldOptimizeImages, shouldUseLazyLoading } = usePerformance();
  const isSmallMobile = useIsSmallMobile();

  useEffect(() => {
    let optimizedSrc = src;

    // For placeholder images, adjust size based on device capability
    if (src.includes('placeholder.com') || src.includes('via.placeholder.com')) {
      const url = new URL(src);
      const originalSize = url.pathname.split('/')[1]; // e.g., "400x600"
      
      if (shouldOptimizeImages && originalSize) {
        const [w, h] = originalSize.split('x').map(Number);
        if (w && h) {
          // Reduce image size for low-end devices
          const newW = Math.floor(w * 0.7);
          const newH = Math.floor(h * 0.7);
          optimizedSrc = src.replace(originalSize, `${newW}x${newH}`);
        }
      }
      
      // Further reduce for small mobile screens
      if (isSmallMobile && originalSize) {
        const [w, h] = originalSize.split('x').map(Number);
        if (w && h) {
          const newW = Math.floor(w * 0.5);
          const newH = Math.floor(h * 0.5);
          optimizedSrc = src.replace(originalSize, `${newW}x${newH}`);
        }
      }
    }

    setImageSrc(optimizedSrc);
  }, [src, shouldOptimizeImages, isSmallMobile]);

  useEffect(() => {
    if (!shouldUseLazyLoading || priority) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    const img = imgRef.current;
    if (img) {
      observer.observe(img);
    }

    return () => {
      if (img) {
        observer.unobserve(img);
      }
    };
  }, [shouldUseLazyLoading, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  // Generate placeholder while loading
  const placeholderStyle: React.CSSProperties = {
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontSize: '14px',
    minHeight: '100px',
    ...style
  };

  if (hasError) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-gray-100 text-gray-500`}
        style={placeholderStyle}
      >
        Imagen no disponible
      </div>
    );
  }

  const imgProps = {
    ref: imgRef,
    alt,
    className: `${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`,
    style: {
      ...style,
      transition: shouldOptimizeImages ? 'none' : 'opacity 0.3s ease-in-out'
    },
    width,
    height,
    onLoad: handleLoad,
    onError: handleError,
    loading: (shouldUseLazyLoading && !priority) ? 'lazy' : 'eager'
  };

  return (
    <div className="relative">
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse"
          style={placeholderStyle}
        >
          {shouldOptimizeImages ? '...' : 'Cargando...'}
        </div>
      )}
      
      {shouldUseLazyLoading && !priority ? (
        <img
          {...imgProps}
          data-src={imageSrc}
          src={priority ? imageSrc : undefined}
        />
      ) : (
        <img
          {...imgProps}
          src={imageSrc}
        />
      )}
    </div>
  );
}