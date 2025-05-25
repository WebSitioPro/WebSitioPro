import { WebsiteConfig } from '@/lib/types';

interface ReviewsProps {
  config: WebsiteConfig;
  language: string;
  t: (key: string) => string;
  getLocalizedValue: <T extends { en: string; es: string }>(obj: T) => string;
}

export default function Reviews({ config, language, t, getLocalizedValue }: ReviewsProps) {
  // Helper function to render star ratings directly
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={i < rating ? "fas fa-star" : "far fa-star"}
          style={{ color: "#FFD700" }}
        />
      );
    }
    return stars;
  };

  return (
    <section id="reviews" className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary-custom">{t('reviewsTitle')}</h2>
          <p className="lead">{t('reviewsSubtitle')}</p>
        </div>
        
        <div className="row g-4">
          {config.reviews.map((review, index) => (
            <div className="col-md-4" key={index}>
              <div className="review-card bg-white p-4 shadow-sm h-100">
                <div className="star-rating mb-3">
                  {renderStars(review.rating)}
                </div>
                <p className="mb-3 fst-italic">
                  {getLocalizedValue(review.quote)}
                </p>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-secondary-custom text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <span>{review.initials}</span>
                  </div>
                  <div className="ms-3">
                    <h5 className="mb-0">{review.name}</h5>
                    <small className="text-muted">{getLocalizedValue(review.date)}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
