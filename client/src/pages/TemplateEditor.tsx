import { Link, useLocation } from 'wouter';
import { 
  ArrowLeft, 
  Eye, 
  Settings,
  Briefcase,
  UtensilsCrossed,
  MapPin,
  ShoppingBag,
  Wrench,
  ChevronRight
} from 'lucide-react';

interface TemplateOption {
  id: 'professionals' | 'restaurants' | 'tourism' | 'retail' | 'services';
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  demoUrl: string;
  editorUrl: string;
  color: string;
}

const templateOptions: TemplateOption[] = [
  {
    id: 'professionals',
    name: 'Professionals',
    description: 'Perfect for doctors, lawyers, consultants and medical professionals',
    icon: Briefcase,
    demoUrl: '/professionals-demo',
    editorUrl: '/editor/professionals',
    color: '#C8102E'
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    description: 'Ideal for restaurants, cafes, food services and culinary businesses',
    icon: UtensilsCrossed,
    demoUrl: '/restaurants-demo',
    editorUrl: '/editor/restaurants',
    color: '#FF6B35'
  },
  {
    id: 'tourism',
    name: 'Tourism',
    description: 'Great for tours, hotels, travel agencies and tourism services',
    icon: MapPin,
    demoUrl: '/tourism-demo',
    editorUrl: '/editor/tourism',
    color: '#00A859'
  },
  {
    id: 'retail',
    name: 'Retail',
    description: 'Perfect for shops, boutiques, retail stores and online commerce',
    icon: ShoppingBag,
    demoUrl: '/retail-demo',
    editorUrl: '/editor/retail',
    color: '#007ACC'
  },
  {
    id: 'services',
    name: 'Services',
    description: 'Ideal for plumbers, electricians, repair services and home services',
    icon: Wrench,
    demoUrl: '/services-demo',
    editorUrl: '/editor/services',
    color: '#6C5CE7'
  }
];

export default function TemplateEditor() {
  const [, navigate] = useLocation();

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <Link href="/" className="btn btn-outline-secondary me-3">
              <ArrowLeft size={16} className="me-2" />
              Back to Home
            </Link>
            <h1 className="navbar-brand mb-0 h4">Template Editor</h1>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header Section */}
            <div className="text-center mb-5">
              <h2 className="h3 mb-3">Choose Your Template Type</h2>
              <p className="lead text-muted">
                Select the template that best fits your business to start editing. 
                Each template is specifically designed for different business types.
              </p>
            </div>

            {/* Template Options Grid */}
            <div className="row g-4">
              {templateOptions.map((template) => {
                const IconComponent = template.icon;
                return (
                  <div key={template.id} className="col-lg-6">
                    <div className="card h-100 shadow-sm border-0 template-card">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-start mb-3">
                          <div 
                            className="flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{ 
                              width: '60px', 
                              height: '60px', 
                              backgroundColor: `${template.color}20`,
                              border: `2px solid ${template.color}30`
                            }}
                          >
                            <IconComponent 
                              size={28} 
                              style={{ color: template.color }}
                            />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="card-title mb-2">{template.name}</h5>
                            <p className="card-text text-muted">{template.description}</p>
                          </div>
                        </div>
                        
                        <div className="d-flex gap-2 mt-4">
                          <button 
                            className="btn btn-outline-primary flex-fill"
                            onClick={() => window.open(template.demoUrl, '_blank')}
                          >
                            <Eye size={16} className="me-2" />
                            Preview
                          </button>
                          <button 
                            className="btn btn-primary flex-fill"
                            onClick={() => navigate(template.editorUrl)}
                          >
                            <Settings size={16} className="me-2" />
                            Edit Template
                            <ChevronRight size={16} className="ms-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Help Section */}
            <div className="text-center mt-5">
              <div className="card border-0 bg-light">
                <div className="card-body p-4">
                  <h5 className="card-title">Need Help Choosing?</h5>
                  <p className="card-text text-muted mb-3">
                    Each template includes specialized sections and features tailored to specific business types. 
                    You can preview any template before editing, and switching between templates is easy.
                  </p>
                  <div className="row g-3 text-start">
                    <div className="col-md-6">
                      <strong>Professionals:</strong> Appointment booking, credentials, specialties
                    </div>
                    <div className="col-md-6">
                      <strong>Restaurants:</strong> Menu displays, photo galleries, reservations
                    </div>
                    <div className="col-md-6">
                      <strong>Tourism:</strong> Tour packages, booking systems, location maps
                    </div>
                    <div className="col-md-6">
                      <strong>Retail:</strong> Product catalogs, shopping features, inventory
                    </div>
                    <div className="col-md-6">
                      <strong>Services:</strong> Service areas, pricing, contact forms
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .template-card {
          transition: all 0.3s ease;
        }
        
        .template-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
        
        .template-card .btn {
          transition: all 0.2s ease;
        }
        
        .template-card .btn:hover {
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}