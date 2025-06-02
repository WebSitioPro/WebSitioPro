
import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Save, Plus, Trash2, Image, DollarSign, Eye, EyeOff, Settings } from 'lucide-react';

interface MenuItem {
  id: string;
  category: string;
  name: { es: string; en: string };
  description: { es: string; en: string };
  price: number;
  image?: string;
  available: boolean;
  featured?: boolean;
}

interface MenuCategory {
  id: string;
  name: { es: string; en: string };
  order: number;
}

export default function RestaurantEditor() {
  const params = useParams();
  const clientId = params.clientId || 'default';
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([
    { id: '1', name: { es: 'Tacos', en: 'Tacos' }, order: 1 },
    { id: '2', name: { es: 'Bebidas', en: 'Drinks' }, order: 2 },
    { id: '3', name: { es: 'Postres', en: 'Desserts' }, order: 3 }
  ]);
  
  const [restaurantData, setRestaurantData] = useState({
    businessName: '',
    isAppsite: true,
    appThemeColor: '#00A859',
    orderingEnabled: true,
    paymentMethods: ['whatsapp', 'oxxo'] as Array<'whatsapp' | 'oxxo' | 'transfer'>,
    deliveryAreas: [{ name: 'Centro', fee: 0 }, { name: 'Zona Norte', fee: 30 }],
    whatsappNumber: '',
    email: '',
    address: { es: '', en: '' }
  });

  // Load existing data
  useEffect(() => {
    const loadRestaurantConfig = async () => {
      try {
        const response = await fetch(`/api/config/${clientId}`);
        if (response.ok) {
          const config = await response.json();
          if (config.menuItems) setMenuItems(config.menuItems);
          if (config.menuCategories) setMenuCategories(config.menuCategories);
          setRestaurantData(prev => ({ ...prev, ...config }));
        }
      } catch (error) {
        console.log('Using default config for new restaurant:', clientId);
      }
    };
    
    loadRestaurantConfig();
  }, [clientId]);

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      category: menuCategories[0]?.id || '1',
      name: { es: '', en: '' },
      description: { es: '', en: '' },
      price: 0,
      available: true,
      featured: false
    };
    setMenuItems([...menuItems, newItem]);
  };

  const updateMenuItem = (id: string, field: string, value: any, language?: 'es' | 'en') => {
    setMenuItems(items => 
      items.map(item => {
        if (item.id === id) {
          if (language && (field === 'name' || field === 'description')) {
            return {
              ...item,
              [field]: { ...item[field as keyof MenuItem], [language]: value }
            };
          } else {
            return { ...item, [field]: value };
          }
        }
        return item;
      })
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(items => items.filter(item => item.id !== id));
  };

  const addCategory = () => {
    const newCategory: MenuCategory = {
      id: Date.now().toString(),
      name: { es: 'Nueva Categoría', en: 'New Category' },
      order: menuCategories.length + 1
    };
    setMenuCategories([...menuCategories, newCategory]);
  };

  const updateCategory = (id: string, field: string, value: any, language?: 'es' | 'en') => {
    setMenuCategories(categories => 
      categories.map(category => {
        if (category.id === id) {
          if (language && field === 'name') {
            return {
              ...category,
              [field]: { ...category[field], [language]: value }
            };
          } else {
            return { ...category, [field]: value };
          }
        }
        return category;
      })
    );
  };

  const saveData = async () => {
    try {
      const configData = {
        ...restaurantData,
        menuItems,
        menuCategories,
        templateType: 'restaurants'
      };

      const response = await fetch(`/api/config/${clientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configData)
      });
      
      if (response.ok) {
        alert('¡Configuración guardada exitosamente!');
      } else {
        alert('Error al guardar configuración');
      }
    } catch (error) {
      alert('Error al guardar configuración');
    }
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-fluid">
          <div className="row align-items-center py-3">
            <div className="col-auto">
              <Link className="fw-bold text-decoration-none fs-4" href="/" style={{ color: restaurantData.appThemeColor }}>
                Appsite Editor - {restaurantData.businessName || `Restaurant ${clientId}`}
              </Link>
            </div>
            <div className="col">
              <div className="d-flex gap-3">
                <Link href="/templates/restaurants" className="btn btn-outline-primary">
                  Vista Previa
                </Link>
                <Link href="/editor/tools" className="btn btn-outline-secondary">
                  Editor Avanzado
                </Link>
              </div>
            </div>
            <div className="col-auto">
              <button className="btn btn-success" onClick={saveData}>
                <Save size={16} className="me-1" />
                Guardar
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="bg-white rounded shadow-sm p-3 sticky-top" style={{ top: '20px' }}>
              <h5 className="mb-3">Editor de Appsite</h5>
              <nav className="nav flex-column">
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'menu' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('menu')}
                >
                  <Settings size={16} className="me-2" />
                  Menú
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'categories' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('categories')}
                >
                  <Settings size={16} className="me-2" />
                  Categorías
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'settings' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings size={16} className="me-2" />
                  Configuración
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'ordering' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('ordering')}
                >
                  <DollarSign size={16} className="me-2" />
                  Pedidos
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="bg-white rounded shadow-sm p-4">
              
              {/* Menu Items Tab */}
              {activeTab === 'menu' && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4>Elementos del Menú</h4>
                    <button className="btn btn-primary" onClick={addMenuItem}>
                      <Plus size={16} className="me-1" />
                      Agregar Platillo
                    </button>
                  </div>
                  
                  {menuItems.map((item, index) => (
                    <div key={item.id} className="border rounded p-3 mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6>Platillo {index + 1}</h6>
                        <div className="d-flex gap-2">
                          <button 
                            className={`btn btn-sm ${item.available ? 'btn-success' : 'btn-secondary'}`}
                            onClick={() => updateMenuItem(item.id, 'available', !item.available)}
                          >
                            {item.available ? <Eye size={14} /> : <EyeOff size={14} />}
                          </button>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteMenuItem(item.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label className="form-label">Categoría</label>
                          <select 
                            className="form-control"
                            value={item.category}
                            onChange={(e) => updateMenuItem(item.id, 'category', e.target.value)}
                          >
                            {menuCategories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.name.es}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Precio (MXN)</label>
                          <input 
                            type="number" 
                            className="form-control"
                            value={item.price}
                            onChange={(e) => updateMenuItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Imagen URL</label>
                          <input 
                            type="url" 
                            className="form-control"
                            value={item.image || ''}
                            onChange={(e) => updateMenuItem(item.id, 'image', e.target.value)}
                            placeholder="https://i.ibb.co/..."
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Nombre (Español)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={item.name.es}
                            onChange={(e) => updateMenuItem(item.id, 'name', e.target.value, 'es')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Nombre (Inglés)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={item.name.en}
                            onChange={(e) => updateMenuItem(item.id, 'name', e.target.value, 'en')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Descripción (Español)</label>
                          <textarea 
                            className="form-control"
                            rows={3}
                            value={item.description.es}
                            onChange={(e) => updateMenuItem(item.id, 'description', e.target.value, 'es')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Descripción (Inglés)</label>
                          <textarea 
                            className="form-control"
                            rows={3}
                            value={item.description.en}
                            onChange={(e) => updateMenuItem(item.id, 'description', e.target.value, 'en')}
                          />
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input 
                              className="form-check-input"
                              type="checkbox"
                              checked={item.featured || false}
                              onChange={(e) => updateMenuItem(item.id, 'featured', e.target.checked)}
                            />
                            <label className="form-check-label">
                              Platillo Destacado
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Categories Tab */}
              {activeTab === 'categories' && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4>Categorías del Menú</h4>
                    <button className="btn btn-primary" onClick={addCategory}>
                      <Plus size={16} className="me-1" />
                      Agregar Categoría
                    </button>
                  </div>
                  
                  {menuCategories.map((category, index) => (
                    <div key={category.id} className="border rounded p-3 mb-3">
                      <h6>Categoría {index + 1}</h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Nombre (Español)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={category.name.es}
                            onChange={(e) => updateCategory(category.id, 'name', e.target.value, 'es')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Nombre (Inglés)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={category.name.en}
                            onChange={(e) => updateCategory(category.id, 'name', e.target.value, 'en')}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h4 className="mb-4">Configuración del Appsite</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nombre del Negocio</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={restaurantData.businessName}
                        onChange={(e) => setRestaurantData(prev => ({ ...prev, businessName: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Color del Tema</label>
                      <input 
                        type="color" 
                        className="form-control form-control-color"
                        value={restaurantData.appThemeColor}
                        onChange={(e) => setRestaurantData(prev => ({ ...prev, appThemeColor: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">WhatsApp (solo números)</label>
                      <input 
                        type="tel" 
                        className="form-control"
                        value={restaurantData.whatsappNumber}
                        onChange={(e) => setRestaurantData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                        placeholder="529831234567"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control"
                        value={restaurantData.email}
                        onChange={(e) => setRestaurantData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Ordering Tab */}
              {activeTab === 'ordering' && (
                <div>
                  <h4 className="mb-4">Configuración de Pedidos</h4>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-check">
                        <input 
                          className="form-check-input"
                          type="checkbox"
                          checked={restaurantData.orderingEnabled}
                          onChange={(e) => setRestaurantData(prev => ({ ...prev, orderingEnabled: e.target.checked }))}
                        />
                        <label className="form-check-label">
                          Habilitar pedidos en línea
                        </label>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <h6>Métodos de Pago</h6>
                      <div className="form-check">
                        <input 
                          className="form-check-input"
                          type="checkbox"
                          checked={restaurantData.paymentMethods.includes('whatsapp')}
                          onChange={(e) => {
                            const methods = e.target.checked 
                              ? [...restaurantData.paymentMethods, 'whatsapp' as const]
                              : restaurantData.paymentMethods.filter(m => m !== 'whatsapp');
                            setRestaurantData(prev => ({ ...prev, paymentMethods: methods }));
                          }}
                        />
                        <label className="form-check-label">WhatsApp (Efectivo/Transferencia)</label>
                      </div>
                      <div className="form-check">
                        <input 
                          className="form-check-input"
                          type="checkbox"
                          checked={restaurantData.paymentMethods.includes('oxxo')}
                          onChange={(e) => {
                            const methods = e.target.checked 
                              ? [...restaurantData.paymentMethods, 'oxxo' as const]
                              : restaurantData.paymentMethods.filter(m => m !== 'oxxo');
                            setRestaurantData(prev => ({ ...prev, paymentMethods: methods }));
                          }}
                        />
                        <label className="form-check-label">OXXO Pay</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <h6>Zonas de Entrega</h6>
                      {restaurantData.deliveryAreas.map((area, index) => (
                        <div key={index} className="row g-2 mb-2">
                          <div className="col-8">
                            <input 
                              type="text" 
                              className="form-control"
                              value={area.name}
                              onChange={(e) => {
                                const newAreas = [...restaurantData.deliveryAreas];
                                newAreas[index].name = e.target.value;
                                setRestaurantData(prev => ({ ...prev, deliveryAreas: newAreas }));
                              }}
                              placeholder="Nombre de la zona"
                            />
                          </div>
                          <div className="col-4">
                            <input 
                              type="number" 
                              className="form-control"
                              value={area.fee}
                              onChange={(e) => {
                                const newAreas = [...restaurantData.deliveryAreas];
                                newAreas[index].fee = parseFloat(e.target.value) || 0;
                                setRestaurantData(prev => ({ ...prev, deliveryAreas: newAreas }));
                              }}
                              placeholder="Costo"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
