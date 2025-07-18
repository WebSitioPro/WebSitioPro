import { useEffect, ReactNode } from 'react';
import { usePerformance } from '../hooks/use-performance';
import { useIsMobile } from '../hooks/use-mobile';

interface MobileOptimizerProps {
  children: ReactNode;
}

export function MobileOptimizer({ children }: MobileOptimizerProps) {
  const { isLowEnd, shouldReduceAnimations, shouldOptimizeImages } = usePerformance();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Apply performance optimizations to document
    const applyOptimizations = () => {
      const root = document.documentElement;
      
      // Add performance classes
      if (isLowEnd) {
        root.classList.add('low-end-device');
      } else {
        root.classList.remove('low-end-device');
      }
      
      if (shouldReduceAnimations) {
        root.classList.add('reduce-animations');
      } else {
        root.classList.remove('reduce-animations');
      }
      
      if (shouldOptimizeImages) {
        root.classList.add('optimize-images');
      } else {
        root.classList.remove('optimize-images');
      }
      
      if (isMobile) {
        root.classList.add('mobile-device');
      } else {
        root.classList.remove('mobile-device');
      }
    };

    applyOptimizations();
  }, [isLowEnd, shouldReduceAnimations, shouldOptimizeImages, isMobile]);

  return <>{children}</>;
}