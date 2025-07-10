
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Plus, Edit, Users, Trash2, Calendar, Search, Filter } from 'lucide-react';

interface ClientInfo {
  id: string;
  name: string;
  templateType: string;
  lastModified: string;
  businessName: string;
  createdAt: string;
  templateId: string;
}

interface TemplateData {
  templateId: string;
  clientName: string;
  businessName: string;
  templateType: string;
  createdAt: string;
  lastModified?: string;
}

export default function ClientSelectorPage() {
  const [clients, setClients] = useState<ClientInfo[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientInfo[]>([]);
  const [newClientName, setNewClientName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    filterClients();
  }, [clients, searchTerm, filterType]);

  const loadClients = async () => {
    setIsLoading(true);
    try {
      // Load clients from the configs endpoint (where template editors create clients)
      const response = await fetch('/api/configs');
      if (response.ok) {
        const configs = await response.json();
        
        const clientList: ClientInfo[] = configs.map((config: any) => ({
          id: config.id?.toString() || 'unknown',
          name: config.name || 'Unnamed Client',
          templateType: config.templateType || 'professionals',
          businessName: config.businessName || config.name || '',
          lastModified: config.lastModified || config.createdAt || new Date().toISOString(),
          createdAt: config.createdAt || new Date().toISOString(),
          templateId: config.id?.toString() || 'unknown'
        }));

        setClients(clientList);
      } else {
        // Fallback to empty list if API doesn't exist yet
        setClients([]);
      }
    } catch (error) {
      console.error('Failed to load clients:', error);
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterClients = () => {
    let filtered = clients;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.businessName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(client => client.templateType === filterType);
    }

    // Sort by last modified (newest first)
    filtered.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

    setFilteredClients(filtered);
  };

  const createNewClient = () => {
    if (newClientName.trim()) {
      // Navigate to template tools for new client
      window.location.href = `/editor/tools?client=${encodeURIComponent(newClientName.trim())}`;
    }
  };

  const deleteClient = async (clientId: string, clientName: string) => {
    if (!confirm(`Are you sure you want to delete "${clientName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/config/${clientId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setClients(clients.filter(client => client.id !== clientId));
        alert('Client deleted successfully');
      } else {
        alert('Failed to delete client');
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Error deleting client');
    }
  };



  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Unknown date';
    }
  };

  const getTemplateIcon = (type: string) => {
    const icons: Record<string, string> = {
      professionals: '👨‍⚕️',
      restaurants: '🍽️',
      tourism: '🗺️',
      retail: '🛍️',
      services: '🔧'
    };
    return icons[type] || '🌐';
  };

  const templateTypes = [
    { value: 'all', label: 'All Templates' },
    { value: 'professionals', label: 'Professionals' },
    { value: 'restaurants', label: 'Restaurants' },
    { value: 'tourism', label: 'Tourism' },
    { value: 'retail', label: 'Retail' },
    { value: 'services', label: 'Services' }
  ];

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-fluid">
          <div className="row align-items-center py-3">
            <div className="col-auto">
              <Link className="fw-bold text-decoration-none fs-4" href="/">
                WebSitioPro - Client Manager
              </Link>
            </div>
            <div className="col text-end">
              <Link href="/" className="btn btn-outline-primary me-2">
                Back to Main Site
              </Link>
              <Link href="/editor/tools" className="btn btn-primary">
                <Plus size={16} className="me-1" />
                New Client
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <Users size={48} className="text-primary mb-3" />
              <h1 className="mb-3">Client Website Manager</h1>
              <p className="text-muted">Manage all your client websites in one place. Create, edit, and track your projects.</p>
            </div>

            {/* Search and Filter Controls */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <Search size={16} />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search clients by name or business..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-group">
                      <span className="input-group-text">
                        <Filter size={16} />
                      </span>
                      <select 
                        className="form-select"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                      >
                        {templateTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="text-muted small">
                      {filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Create New Client */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">
                  <Plus size={20} className="me-2" />
                  Create New Client Website
                </h5>
                <div className="row g-3 align-items-end">
                  <div className="col">
                    <label className="form-label">Client Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Dr. Maria Gonzalez, Restaurant La Palma"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && createNewClient()}
                    />
                  </div>
                  <div className="col-auto">
                    <button 
                      className="btn btn-primary"
                      onClick={createNewClient}
                      disabled={!newClientName.trim()}
                    >
                      Create & Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Loading clients...</p>
              </div>
            )}

            {/* No Clients Message */}
            {!isLoading && filteredClients.length === 0 && clients.length === 0 && (
              <div className="text-center py-5">
                <Users size={64} className="text-muted mb-3" />
                <h4 className="text-muted">No clients yet</h4>
                <p className="text-muted">Create your first client website to get started!</p>
              </div>
            )}

            {/* No Filtered Results */}
            {!isLoading && filteredClients.length === 0 && clients.length > 0 && (
              <div className="text-center py-5">
                <Search size={64} className="text-muted mb-3" />
                <h4 className="text-muted">No matching clients found</h4>
                <p className="text-muted">Try adjusting your search or filter criteria.</p>
              </div>
            )}

            {/* Existing Clients */}
            {!isLoading && filteredClients.length > 0 && (
              <div className="row g-3">
                {filteredClients.map((client) => (
                  <div key={client.id} className="col-md-6 col-lg-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-start justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <span className="fs-4 me-2">
                              {getTemplateIcon(client.templateType)}
                            </span>
                            <div>
                              <h6 className="card-title mb-1">{client.name}</h6>
                              <small className="text-muted text-capitalize">
                                {client.templateType}
                              </small>
                            </div>
                          </div>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => deleteClient(client.id, client.name)}
                            title="Delete client"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {client.businessName && client.businessName !== client.name && (
                          <p className="card-text small text-muted mb-2">
                            Business: {client.businessName}
                          </p>
                        )}

                        <p className="card-text small text-muted mb-3">
                          <Calendar size={14} className="me-1" />
                          {formatDate(client.lastModified)}
                        </p>

                        <div className="d-grid">
                          <Link 
                            href={`/editor/${client.templateType}?client=${client.id}`}
                            className="btn btn-primary btn-sm"
                          >
                            <Edit size={16} className="me-1" />
                            Edit Website
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-5">
              <div className="alert alert-info">
                <strong>Team Collaboration:</strong> Each team member can work on different client websites simultaneously. 
                Share the specific client editor URL with your teammates for collaborative editing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
