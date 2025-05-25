import { WebsiteConfig } from '@/lib/types';

interface ServicesProps {
  config: WebsiteConfig;
  language: string;
  t: (key: string) => string;
  getLocalizedValue: <T extends { en: string; es: string }>(obj: T) => string;
}

export default function Services({ config, language, t, getLocalizedValue }: ServicesProps) {
  return (
    <section id="services" className="section-padding">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary-custom">{t('servicesTitle')}</h2>
          <p className="lead">{t('servicesSubtitle')}</p>
        </div>
        
        <div className="row g-4">
          {config.services.map((service, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="service-card shadow-sm h-100 bg-white p-4">
                <div className="text-primary-custom mb-3">
                  <i className={`fas fa-${service.icon} fa-2x`}></i>
                </div>
                <h3 className="h4 mb-3">
                  {getLocalizedValue(service.title)}
                </h3>
                <p>
                  {getLocalizedValue(service.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
