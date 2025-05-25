import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Intro from '@/components/Intro';
import Services from '@/components/Services';
import Reviews from '@/components/Reviews';
import Photos from '@/components/Photos';
import Awards from '@/components/Awards';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { WebsiteConfig } from '@/lib/types';
import useTranslation from '@/hooks/useTranslation';

export default function HomePage() {
  const { data: config, isLoading, error } = useQuery<WebsiteConfig>({ 
    queryKey: ['/api/config'],
  });
  
  const { language, toggleLanguage, t, getLocalizedValue } = useTranslation(config || null);
  
  // Set CSS variables for the theme colors
  useEffect(() => {
    if (config) {
      document.documentElement.style.setProperty('--primary', hexToHSL(config.primaryColor));
      document.documentElement.style.setProperty('--secondary', hexToHSL(config.secondaryColor));
      document.documentElement.style.setProperty('--background', hexToHSL(config.backgroundColor));
    }
  }, [config]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner-border text-primary-custom" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-danger" role="alert">
          Failed to load website configuration.
        </div>
      </div>
    );
  }
  
  return (
    <div className="site-container" data-bs-spy="scroll" data-bs-target="#navbar" data-bs-offset="100">
      <Header 
        config={config} 
        language={language} 
        toggleLanguage={toggleLanguage} 
        t={t} 
      />
      
      <main>
        <Intro 
          config={config} 
          language={language} 
          t={t} 
          getLocalizedValue={getLocalizedValue}
        />
        
        <Services 
          config={config} 
          language={language} 
          t={t} 
          getLocalizedValue={getLocalizedValue}
        />
        
        <Reviews 
          config={config} 
          language={language} 
          t={t} 
          getLocalizedValue={getLocalizedValue}
        />
        
        <Photos 
          config={config} 
          language={language} 
          t={t} 
          getLocalizedValue={getLocalizedValue}
        />
        
        <Awards 
          config={config} 
          language={language} 
          t={t} 
          getLocalizedValue={getLocalizedValue}
        />
        
        <Contact 
          config={config} 
          language={language} 
          t={t} 
        />
      </main>
      
      <Footer 
        config={config} 
        language={language} 
        t={t} 
      />
      
      {config.showChatbot && (
        <Chatbot 
          config={config} 
          language={language} 
          t={t} 
          getLocalizedValue={getLocalizedValue}
        />
      )}
      
      {/* Analytics code if provided */}
      {config.analyticsCode && (
        <div dangerouslySetInnerHTML={{ __html: config.analyticsCode }} />
      )}
    </div>
  );
}

// Helper function to convert HEX color to HSL format for CSS variables
function hexToHSL(hex: string): string {
  // Remove the # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the HEX values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;
  
  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }
    
    h *= 60;
  }
  
  // Round the values
  h = Math.round(h);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return `${h} ${s}% ${l}%`;
}
