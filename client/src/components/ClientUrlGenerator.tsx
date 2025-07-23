/**
 * Client URL Generator Component
 * Shows clean URLs for clients and provides copy functionality
 */

import { useState, useEffect } from 'react';
import { Copy, ExternalLink, Check } from 'lucide-react';

interface ClientUrlGeneratorProps {
  clientId: number;
  businessName: string;
  onUrlGenerated?: (url: string) => void;
}

export default function ClientUrlGenerator({ clientId, businessName, onUrlGenerated }: ClientUrlGeneratorProps) {
  const [clientUrl, setClientUrl] = useState<string>('');
  const [fullUrl, setFullUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateClientUrl();
  }, [clientId, businessName]);

  const generateClientUrl = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/client-url/${clientId}`);
      
      if (!response.ok) {
        throw new Error('Failed to generate client URL');
      }

      const data = await response.json();
      setClientUrl(data.clientUrl);
      setFullUrl(data.fullUrl);
      
      if (onUrlGenerated) {
        onUrlGenerated(data.fullUrl);
      }

    } catch (err) {
      console.error('Error generating client URL:', err);
      setError('Failed to generate URL');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      const domain = window.location.hostname === 'localhost' 
        ? window.location.origin 
        : 'https://websitiopro.com';
      
      const fullClientUrl = `${domain}${fullUrl}`;
      await navigator.clipboard.writeText(fullClientUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const openClientSite = () => {
    const domain = window.location.hostname === 'localhost' 
      ? window.location.origin 
      : 'https://websitiopro.com';
    
    const fullClientUrl = `${domain}${fullUrl}`;
    window.open(fullClientUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="d-flex align-items-center">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="text-muted">Generating URL...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-danger">
        <small>{error}</small>
      </div>
    );
  }

  const domain = window.location.hostname === 'localhost' 
    ? window.location.host 
    : 'websitiopro.com';

  return (
    <div className="client-url-generator">
      <div className="input-group input-group-sm">
        <span className="input-group-text bg-light">
          <code>{domain}</code>
        </span>
        <input
          type="text"
          className="form-control"
          value={fullUrl}
          readOnly
          style={{ fontFamily: 'monospace' }}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={copyToClipboard}
          title="Copy URL to clipboard"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={openClientSite}
          title="Open client website"
        >
          <ExternalLink size={14} />
        </button>
      </div>
      
      {copied && (
        <small className="text-success mt-1 d-block">
          URL copied to clipboard!
        </small>
      )}
    </div>
  );
}