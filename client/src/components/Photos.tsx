import { WebsiteConfig } from '@/lib/types';

interface PhotosProps {
  config: WebsiteConfig;
  language: string;
  t: (key: string) => string;
  getLocalizedValue: <T extends { en: string; es: string }>(obj: T) => string;
}

export default function Photos({ config, language, t, getLocalizedValue }: PhotosProps) {
  return (
    <section id="photos" className="section-padding">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary-custom">{t('photosTitle')}</h2>
          <p className="lead">{t('photosSubtitle')}</p>
        </div>
        
        <div className="row g-4">
          {config.photos.map((photo, index) => (
            <div className="col-md-4" key={index}>
              <div className="photo-item shadow-sm rounded">
                <img 
                  src={photo.url} 
                  alt={getLocalizedValue(photo.caption)} 
                  className="img-fluid" 
                />
                <div className="p-3">
                  <h5>{getLocalizedValue(photo.caption)}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
