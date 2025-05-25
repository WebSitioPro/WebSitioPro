import { useState } from 'react';
import { WebsiteConfig } from '@/lib/types';

interface FooterProps {
  config: WebsiteConfig;
  language: string;
  t: (key: string) => string;
}

export default function Footer({ config, language, t }: FooterProps) {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
    // In a real implementation, this would send the email to a newsletter service
  };
  
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h4 className="h5 mb-3">{t('footerAbout')}</h4>
            <p className="mb-3">{t('footerAboutText')}</p>
            <div className="d-flex gap-3">
              {config.facebookUrl && (
                <a href={config.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
              )}
              <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-white"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          
          <div className="col-md-4">
            <h4 className="h5 mb-3">{t('footerQuickLinks')}</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#intro" className="text-white text-decoration-none">{t('footerLinkIntro')}</a>
              </li>
              <li className="mb-2">
                <a href="#services" className="text-white text-decoration-none">{t('footerLinkServices')}</a>
              </li>
              <li className="mb-2">
                <a href="#reviews" className="text-white text-decoration-none">{t('footerLinkReviews')}</a>
              </li>
              <li className="mb-2">
                <a href="#contact" className="text-white text-decoration-none">{t('footerLinkContact')}</a>
              </li>
            </ul>
          </div>
          
          <div className="col-md-4">
            <h4 className="h5 mb-3">{t('footerNewsletter')}</h4>
            <p className="mb-3">{t('footerNewsletterText')}</p>
            <form className="d-flex" onSubmit={handleSubmit}>
              <input 
                type="email" 
                className="form-control me-2" 
                placeholder={t('footerEmailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="btn btn-primary-custom" type="submit">{t('footerSubscribe')}</button>
            </form>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="mb-0">{t('footerCopyright')}</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">
              <span>{t('footerPoweredBy')}</span> <a href="https://websitiopro.com" className="text-white">WebSitioPro.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
