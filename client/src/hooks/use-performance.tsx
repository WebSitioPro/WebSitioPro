import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  isLowEnd: boolean;
  memory: number;
  connection: string;
  hardwareConcurrency: number;
  shouldReduceAnimations: boolean;
  shouldOptimizeImages: boolean;
  shouldUseLazyLoading: boolean;
}

export function usePerformance(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isLowEnd: false,
    memory: 4,
    connection: 'unknown',
    hardwareConcurrency: 4,
    shouldReduceAnimations: false,
    shouldOptimizeImages: false,
    shouldUseLazyLoading: false,
  });

  useEffect(() => {
    const detectCapabilities = () => {
      // Check device memory (GB)
      const deviceMemory = (navigator as any).deviceMemory || 4;
      
      // Check CPU cores
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      
      // Check network connection
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const effectiveType = connection?.effectiveType || 'unknown';
      
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check screen size (budget phones typically have smaller screens)
      const isSmallScreen = window.innerWidth <= 480;
      
      // Check pixel ratio (budget phones often have lower pixel density)
      const pixelRatio = window.devicePixelRatio || 1;
      const isLowDensity = pixelRatio < 2;
      
      // Determine if device is low-end based on multiple factors
      const isLowEnd = (
        deviceMemory <= 2 ||
        hardwareConcurrency <= 2 ||
        effectiveType === 'slow-2g' ||
        effectiveType === '2g' ||
        (isSmallScreen && isLowDensity) ||
        prefersReducedMotion
      );
      
      // Determine optimizations
      const shouldReduceAnimations = isLowEnd || prefersReducedMotion;
      const shouldOptimizeImages = isLowEnd || effectiveType === 'slow-2g' || effectiveType === '2g';
      const shouldUseLazyLoading = true; // Always beneficial
      
      setCapabilities({
        isLowEnd,
        memory: deviceMemory,
        connection: effectiveType,
        hardwareConcurrency,
        shouldReduceAnimations,
        shouldOptimizeImages,
        shouldUseLazyLoading,
      });
    };

    detectCapabilities();
    
    // Re-check on network change
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      connection.addEventListener('change', detectCapabilities);
      return () => connection.removeEventListener('change', detectCapabilities);
    }
  }, []);

  return capabilities;
}