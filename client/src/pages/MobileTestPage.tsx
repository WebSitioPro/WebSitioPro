import { useState } from 'react';
import { usePerformance } from '../hooks/use-performance';
import { useIsMobile, useIsSmallMobile } from '../hooks/use-mobile';
import { OptimizedImage } from '../components/OptimizedImage';
import { Link } from 'wouter';

export default function MobileTestPage() {
  const [testImages, setTestImages] = useState([
    'https://via.placeholder.com/800x600/C8102E/FFFFFF?text=Large+Test+Image',
    'https://via.placeholder.com/400x300/00A859/FFFFFF?text=Medium+Test+Image',
    'https://via.placeholder.com/200x150/C8102E/FFFFFF?text=Small+Test+Image',
  ]);

  const performance = usePerformance();
  const isMobile = useIsMobile();
  const isSmallMobile = useIsSmallMobile();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Mobile Performance Test
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </header>

        {/* Performance Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Device Performance Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-medium text-gray-800">Device Type</h3>
              <p className="text-sm text-gray-600">
                {performance.isLowEnd ? '🔴 Low-end device' : '🟢 High-end device'}
              </p>
              <p className="text-sm text-gray-600">
                Mobile: {isMobile ? 'Yes' : 'No'}
              </p>
              <p className="text-sm text-gray-600">
                Small Mobile: {isSmallMobile ? 'Yes' : 'No'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-medium text-gray-800">Device Specs</h3>
              <p className="text-sm text-gray-600">
                Memory: {performance.memory}GB
              </p>
              <p className="text-sm text-gray-600">
                CPU Cores: {performance.hardwareConcurrency}
              </p>
              <p className="text-sm text-gray-600">
                Connection: {performance.connection}
              </p>
            </div>
          </div>
        </div>

        {/* Optimizations Applied */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Applied Optimizations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded ${performance.shouldReduceAnimations ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
              <h3 className="font-medium">Reduced Animations</h3>
              <p className="text-sm text-gray-600">
                {performance.shouldReduceAnimations ? 'Enabled' : 'Disabled'}
              </p>
            </div>
            
            <div className={`p-4 rounded ${performance.shouldOptimizeImages ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
              <h3 className="font-medium">Image Optimization</h3>
              <p className="text-sm text-gray-600">
                {performance.shouldOptimizeImages ? 'Enabled' : 'Disabled'}
              </p>
            </div>
            
            <div className={`p-4 rounded ${performance.shouldUseLazyLoading ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
              <h3 className="font-medium">Lazy Loading</h3>
              <p className="text-sm text-gray-600">
                {performance.shouldUseLazyLoading ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>
        </div>

        {/* Test Images */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Optimized Images Test</h2>
          <p className="text-gray-600 mb-4">
            These images use the OptimizedImage component and will be automatically 
            resized and optimized based on your device capabilities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testImages.map((src, index) => (
              <div key={index} className="text-center">
                <OptimizedImage
                  src={src}
                  alt={`Test image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Test Image {index + 1}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CSS Classes Applied */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">CSS Classes Applied</h2>
          <div className="text-sm text-gray-600">
            <p>The following CSS classes are automatically applied to the document:</p>
            <ul className="mt-2 space-y-1">
              <li>• <code className="bg-gray-100 px-2 py-1 rounded">low-end-device</code>: {performance.isLowEnd ? '✅ Applied' : '❌ Not applied'}</li>
              <li>• <code className="bg-gray-100 px-2 py-1 rounded">reduce-animations</code>: {performance.shouldReduceAnimations ? '✅ Applied' : '❌ Not applied'}</li>
              <li>• <code className="bg-gray-100 px-2 py-1 rounded">optimize-images</code>: {performance.shouldOptimizeImages ? '✅ Applied' : '❌ Not applied'}</li>
              <li>• <code className="bg-gray-100 px-2 py-1 rounded">mobile-device</code>: {isMobile ? '✅ Applied' : '❌ Not applied'}</li>
            </ul>
          </div>
        </div>

        {/* Performance Tips */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h3 className="font-medium text-blue-800 mb-2">Performance Tips Applied:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Images are automatically resized for your device</li>
            <li>• Lazy loading reduces initial page load time</li>
            <li>• Animations are reduced on low-end devices</li>
            <li>• Touch targets are optimized for mobile</li>
            <li>• Network-aware optimizations for slow connections</li>
          </ul>
        </div>
      </div>
    </div>
  );
}