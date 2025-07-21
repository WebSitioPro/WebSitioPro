import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Send, User, Mail, MessageSquare, Eye } from 'lucide-react';

interface SectionApproval {
  status: "pending" | "approved" | "needsEdit";
  approved: boolean;
  comments: string;
}

interface ClientApprovalFormProps {
  config: any;
  language: string;
  onSubmit: (formData: {
    clientName: string;
    clientEmail: string;
    sectionApprovals: Record<string, SectionApproval>;
    generalInstructions: string;
    overallApproved: boolean;
  }) => void;
}

export function ClientApprovalForm({ config, language, onSubmit }: ClientApprovalFormProps) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [generalInstructions, setGeneralInstructions] = useState('');
  const [sectionApprovals, setSectionApprovals] = useState<Record<string, SectionApproval>>({
    hero: { status: "pending", approved: false, comments: "" },
    about: { status: "pending", approved: false, comments: "" },
    services: { status: "pending", approved: false, comments: "" },
    photos: { status: "pending", approved: false, comments: "" },
    reviews: { status: "pending", approved: false, comments: "" },
    contact: { status: "pending", approved: false, comments: "" }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const sections = [
    { key: 'hero', name: language === 'es' ? 'Sección Principal (Hero)' : 'Hero Section', description: language === 'es' ? 'Imagen principal, nombre y especialidad' : 'Main image, name and specialty' },
    { key: 'about', name: language === 'es' ? 'Acerca de Mí' : 'About Me', description: language === 'es' ? 'Información personal y estadísticas' : 'Personal information and statistics' },
    { key: 'services', name: language === 'es' ? 'Servicios' : 'Services', description: language === 'es' ? 'Lista de servicios médicos' : 'List of medical services' },
    { key: 'photos', name: language === 'es' ? 'Galería de Fotos' : 'Photo Gallery', description: language === 'es' ? 'Fotos del consultorio y equipo' : 'Office and equipment photos' },
    { key: 'reviews', name: language === 'es' ? 'Reseñas' : 'Reviews', description: language === 'es' ? 'Comentarios de pacientes' : 'Patient testimonials' },
    { key: 'contact', name: language === 'es' ? 'Contacto' : 'Contact', description: language === 'es' ? 'Información de contacto y horarios' : 'Contact info and hours' }
  ];

  const handleSectionApproval = (sectionKey: string, approved: boolean, comments: string = '') => {
    setSectionApprovals(prev => ({
      ...prev,
      [sectionKey]: {
        status: approved ? 'approved' : (comments ? 'needsEdit' : 'pending'),
        approved,
        comments
      }
    }));
  };

  const getApprovalSummary = () => {
    const approvals = Object.values(sectionApprovals);
    return {
      approved: approvals.filter(a => a.approved).length,
      needsEdit: approvals.filter(a => a.status === 'needsEdit').length,
      total: approvals.length
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientName.trim() || !clientEmail.trim()) {
      alert(language === 'es' ? 'Por favor completa tu nombre y email' : 'Please complete your name and email');
      return;
    }

    const summary = getApprovalSummary();
    const overallApproved = summary.approved === summary.total;

    setIsSubmitting(true);

    // Simulate processing delay
    setTimeout(() => {
      onSubmit({
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        sectionApprovals,
        generalInstructions: generalInstructions.trim(),
        overallApproved
      });
      
      setIsSubmitting(false);
      
      // Show success message
      alert(
        language === 'es' 
          ? `¡Gracias por tu feedback, ${clientName}! Hemos recibido tu aprobación del sitio web.`
          : `Thank you for your feedback, ${clientName}! We have received your website approval.`
      );
    }, 1500);
  };

  const summary = getApprovalSummary();
  const allFieldsCompleted = clientName.trim() && clientEmail.trim();

  return (
    <section id="client-approval" className="py-5" style={{ backgroundColor: '#f8f9fa', borderTop: '3px solid #C8102E' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-4">
              <h3 className="text-primary mb-2">
                {language === 'es' ? '🎉 ¡Tu sitio web está listo!' : '🎉 Your Website is Ready!'}
              </h3>
              <p className="lead text-muted">
                {language === 'es' 
                  ? 'Por favor revisa cada sección y danos tu aprobación final'
                  : 'Please review each section and give us your final approval'
                }
              </p>
              <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                <div className="text-center">
                  <div className="h4 text-success">{summary.approved}</div>
                  <small className="text-muted">{language === 'es' ? 'Aprobadas' : 'Approved'}</small>
                </div>
                <div className="text-center">
                  <div className="h4 text-warning">{summary.needsEdit}</div>
                  <small className="text-muted">{language === 'es' ? 'Necesitan edición' : 'Need editing'}</small>
                </div>
                <div className="text-center">
                  <div className="h4 text-secondary">{summary.total - summary.approved - summary.needsEdit}</div>
                  <small className="text-muted">{language === 'es' ? 'Pendientes' : 'Pending'}</small>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Client Information */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <User size={20} className="me-2" />
                    {language === 'es' ? 'Información del Cliente' : 'Client Information'}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        {language === 'es' ? 'Nombre completo *' : 'Full name *'}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder={language === 'es' ? 'Dr. María González' : 'Dr. María González'}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        {language === 'es' ? 'Email *' : 'Email *'}
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="maria@ejemplo.com"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Approvals */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <Eye size={20} className="me-2" />
                    {language === 'es' ? 'Revisión por Secciones' : 'Section-by-Section Review'}
                  </h5>
                </div>
                <div className="card-body">
                  {sections.map((section) => {
                    const approval = sectionApprovals[section.key];
                    return (
                      <div key={section.key} className="border rounded p-3 mb-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="mb-1">{section.name}</h6>
                            <small className="text-muted">{section.description}</small>
                          </div>
                          <div className="d-flex gap-2">
                            <button
                              type="button"
                              className={`btn btn-sm ${approval.approved ? 'btn-success' : 'btn-outline-success'}`}
                              onClick={() => handleSectionApproval(section.key, true)}
                            >
                              <CheckCircle size={16} className="me-1" />
                              {language === 'es' ? 'Aprobado' : 'Approved'}
                            </button>
                            <button
                              type="button"
                              className={`btn btn-sm ${!approval.approved && approval.status === 'needsEdit' ? 'btn-warning' : 'btn-outline-warning'}`}
                              onClick={() => {
                                if (!approval.approved) {
                                  handleSectionApproval(section.key, false, approval.comments || 'Necesita cambios');
                                } else {
                                  handleSectionApproval(section.key, false);
                                }
                              }}
                            >
                              <AlertCircle size={16} className="me-1" />
                              {language === 'es' ? 'Necesita cambios' : 'Needs changes'}
                            </button>
                          </div>
                        </div>
                        
                        {(!approval.approved || approval.comments) && (
                          <div className="mt-2">
                            <textarea
                              className="form-control"
                              rows={2}
                              placeholder={language === 'es' 
                                ? 'Comentarios o cambios específicos para esta sección...'
                                : 'Comments or specific changes for this section...'}
                              value={approval.comments}
                              onChange={(e) => handleSectionApproval(section.key, approval.approved, e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* General Instructions */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <MessageSquare size={20} className="me-2" />
                    {language === 'es' ? 'Instrucciones Generales' : 'General Instructions'}
                  </h5>
                </div>
                <div className="card-body">
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder={language === 'es' 
                      ? 'Cualquier comentario adicional, cambios generales, o instrucciones especiales...'
                      : 'Any additional comments, general changes, or special instructions...'}
                    value={generalInstructions}
                    onChange={(e) => setGeneralInstructions(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={!allFieldsCompleted || isSubmitting}
                  className={`btn btn-lg px-5 ${
                    summary.approved === summary.total ? 'btn-success' : 'btn-primary'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      {language === 'es' ? 'Enviando...' : 'Submitting...'}
                    </>
                  ) : (
                    <>
                      <Send size={20} className="me-2" />
                      {summary.approved === summary.total 
                        ? (language === 'es' ? '✅ Aprobar Sitio Web' : '✅ Approve Website')
                        : (language === 'es' ? '📝 Enviar Feedback' : '📝 Submit Feedback')
                      }
                    </>
                  )}
                </button>
                
                {!allFieldsCompleted && (
                  <div className="mt-2">
                    <small className="text-muted">
                      {language === 'es' 
                        ? 'Completa tu nombre y email para continuar'
                        : 'Complete your name and email to continue'}
                    </small>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}