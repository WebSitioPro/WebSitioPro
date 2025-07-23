/**
 * Client Router Component
 * Handles clean URL routing for client pages like /dr.juangarcia43
 */

import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { parseClientUrl } from '@/utils/urlUtils';
import { ProfessionalsDemo } from '@/templates/professionals';
import { RestaurantsDemo } from '@/templates/restaurants';
import { TourismDemo } from '@/templates/tourism';
import { RetailDemo } from '@/templates/retail';
import { ServicesDemo } from '@/templates/services';
import NotFound from '@/pages/not-found';

interface ClientConfig {
  id: number;
  name: string;
  templateType: string;
}

export default function ClientRouter() {
  const [match, params] = useRoute('/:clientSlug');
  const [clientConfig, setClientConfig] = useState<ClientConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!match || !params?.clientSlug) {
      setIsLoading(false);
      return;
    }

    loadClientConfig(params.clientSlug);
  }, [match, params?.clientSlug]);

  const loadClientConfig = async (clientSlug: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Parse the client URL to extract ID
      const { clientId } = parseClientUrl(clientSlug);
      
      if (!clientId) {
        setError('Invalid client URL format');
        setIsLoading(false);
        return;
      }

      // Fetch client configuration
      const response = await fetch(`/api/config/${clientId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Client not found');
        } else {
          setError('Failed to load client configuration');
        }
        setIsLoading(false);
        return;
      }

      const config = await response.json();
      setClientConfig({
        id: config.id,
        name: config.name,
        templateType: config.templateType
      });

    } catch (err) {
      console.error('Error loading client config:', err);
      setError('Network error loading client');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading website...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !clientConfig) {
    return <NotFound />;
  }

  // Render appropriate template based on client configuration
  const renderTemplate = () => {
    // Create a wrapper component that injects the client parameter
    const ClientTemplateWrapper = ({ children }: { children: React.ReactNode }) => {
      useEffect(() => {
        // Add client parameter to current location for templates to read
        const url = new URL(window.location.href);
        url.searchParams.set('client', clientConfig.id.toString());
        
        // Update URL without page reload to make client ID available
        window.history.replaceState({}, '', `${window.location.pathname}?client=${clientConfig.id}`);
      }, []);

      return <>{children}</>;
    };
    
    const template = (() => {
      switch (clientConfig.templateType) {
        case 'professionals':
          return <ProfessionalsDemo />;
        case 'restaurants':
          return <RestaurantsDemo />;
        case 'tourism':
          return <TourismDemo />;
        case 'retail':
          return <RetailDemo />;
        case 'services':
          return <ServicesDemo />;
        default:
          console.warn(`Unknown template type: ${clientConfig.templateType}`);
          return <ProfessionalsDemo />;
      }
    })();

    return <ClientTemplateWrapper>{template}</ClientTemplateWrapper>;
  };

  return renderTemplate();
}