import { WebsiteConfig } from '@/lib/types';

interface IntroProps {
  config: WebsiteConfig;
  language: string;
  t: (key: string) => string;
  getLocalizedValue: <T extends { en: string; es: string }>(obj: T) => string;
}

export default function Intro({ config, language, t, getLocalizedValue }: IntroProps) {
  return (
    <section id="intro" className="section-padding bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-4 mb-lg-0">
            {/* Professional headshot */}
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=900" 
              alt={config.name} 
              className="img-fluid rounded-3 shadow-lg" 
            />
          </div>
          <div className="col-lg-7">
            <h2 className="display-5 fw-bold mb-4 text-primary-custom">
              {t('introTitle')}
            </h2>
            <p className="lead mb-4">
              {t('bio')}
            </p>
            <p className="mb-4">
              {t('bioExtra')}
            </p>
            {config.facebookUrl && (
              <a 
                href={config.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-primary d-inline-flex align-items-center"
              >
                <i className="fab fa-facebook me-2"></i> {t('followFacebook')}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
