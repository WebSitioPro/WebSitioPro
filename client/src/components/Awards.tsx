import { WebsiteConfig } from '@/lib/types';

interface AwardsProps {
  config: WebsiteConfig;
  language: string;
  t: (key: string) => string;
  getLocalizedValue: <T extends { en: string; es: string }>(obj: T) => string;
}

export default function Awards({ config, language, t, getLocalizedValue }: AwardsProps) {
  return (
    <section id="awards" className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary-custom">{t('awardsTitle')}</h2>
          <p className="lead">{t('awardsSubtitle')}</p>
        </div>
        
        <div className="row g-4 justify-content-center">
          {config.awards.map((award, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3 text-secondary-custom">
                    <i className={`fas fa-${award.icon} fa-3x`}></i>
                  </div>
                  <h3 className="h4 mb-3">{getLocalizedValue(award.title)}</h3>
                  <p className="text-muted">{getLocalizedValue(award.description)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
