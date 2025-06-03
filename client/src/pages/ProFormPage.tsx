
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export default function ProFormPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    address: '',
    phone: '',
    bio: '',
    hours: '',
    rating: '',
    photo_url: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; previewUrl?: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/make/auto-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: 'Error creating website'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container py-3">
          <h1 className="fw-bold" style={{ color: '#C8102E' }}>
            WebSitioPro - Formulario Pro
          </h1>
        </div>
      </header>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="bg-white rounded shadow p-4">
              <h2 className="mb-4">Crear Sitio Web Profesional</h2>
              
              {result && (
                <div className={`alert ${result.success ? 'alert-success' : 'alert-danger'}`}>
                  {result.message}
                  {result.success && result.previewUrl && (
                    <div className="mt-3">
                      <a href={result.previewUrl} target="_blank" className="btn btn-primary">
                        Ver Sitio Web
                      </a>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre del Negocio *</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Categoría *</label>
                    <select
                      name="category"
                      className="form-control"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Dentist & Dental Office">Dentista</option>
                      <option value="Medical & Health">Doctor/Médico</option>
                      <option value="Restaurant">Restaurante</option>
                      <option value="Lawyer & Law Office">Abogado</option>
                      <option value="Travel & Transportation">Turismo</option>
                      <option value="Retail">Tienda/Retail</option>
                      <option value="Services">Servicios</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Dirección *</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Teléfono *</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Calificación (Google)</label>
                    <input
                      type="number"
                      name="rating"
                      className="form-control"
                      min="1"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Biografía/Descripción *</label>
                    <textarea
                      name="bio"
                      className="form-control"
                      rows={4}
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Ej: ¡Bienvenidos a Dr. García! Con 15 años de experiencia, ofrecemos cuidado dental profesional en Chetumal..."
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Horarios</label>
                    <input
                      type="text"
                      name="hours"
                      className="form-control"
                      value={formData.hours}
                      onChange={handleChange}
                      placeholder="Ej: Lun-Vie 9AM-5PM"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">URL de Foto</label>
                    <input
                      type="url"
                      name="photo_url"
                      className="form-control"
                      value={formData.photo_url}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-lg text-white"
                      style={{ backgroundColor: '#C8102E' }}
                      disabled={submitting}
                    >
                      {submitting ? 'Creando...' : 'Crear Sitio Web'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
