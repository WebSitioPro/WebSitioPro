
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Plus, Edit, Users } from 'lucide-react';

interface ClientInfo {
  id: string;
  name: string;
  lastModified: string;
}

export default function ClientSelectorPage() {
  const [clients, setClients] = useState<ClientInfo[]>([]);
  const [newClientName, setNewClientName] = useState('');

  useEffect(() => {
    // Load existing clients from API
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const response = await fetch('/api/config');
      if (response.ok) {
        const configs = await response.json();
        // Convert configs to client info format
        setClients([
          { id: 'default', name: 'Default Template', lastModified: 'Always available' },
          // Add more clients based on API response
        ]);
      }
    } catch (error) {
      console.error('Failed to load clients:', error);
    }
  };

  const createNewClient = () => {
    if (newClientName.trim()) {
      const clientId = newClientName.toLowerCase().replace(/\s+/g, '-');
      // Navigate to editor for new client
      window.location.href = `/editor/${clientId}`;
    }
  };

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
            <div className="col">
              <Link href="/" className="btn btn-outline-primary">
                Back to Main Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <Users size={48} className="text-primary mb-3" />
              <h1 className="mb-3">Client Website Manager</h1>
              <p className="text-muted">Select a client to edit their website, or create a new client project.</p>
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

            {/* Existing Clients */}
            <div className="row g-3">
              {clients.map((client) => (
                <div key={client.id} className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="card-title">{client.name}</h6>
                      <p className="card-text text-muted small">
                        Last modified: {client.lastModified}
                      </p>
                      <Link 
                        href={`/editor/${client.id}`}
                        className="btn btn-outline-primary w-100"
                      >
                        <Edit size={16} className="me-2" />
                        Edit Website
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
              <div className="alert alert-info">
                <strong>Team Collaboration:</strong> Each team member can work on different client websites simultaneously. 
                Share the specific client editor URL (e.g., <code>/editor/client-name</code>) with your teammate.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
