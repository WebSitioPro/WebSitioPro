/**
 * Configuration Isolation System
 * Prevents template modules from affecting the main homepage
 */

export interface ConfigIsolationRules {
  readonly protectedConfigs: string[];
  readonly templateDemoPrefix: string;
  readonly clientConfigPrefix: string;
  readonly homepageConfigName: string;
}

// Configuration isolation rules
export const ISOLATION_RULES: ConfigIsolationRules = {
  protectedConfigs: ['WebSitioPro Homepage', 'Homepage Configuration'],
  templateDemoPrefix: 'demo',
  clientConfigPrefix: 'client',
  homepageConfigName: 'WebSitioPro Homepage'
};

/**
 * Validates if a configuration ID is safe to modify
 */
export function validateConfigAccess(requestedId: string, operation: 'read' | 'write', isHomepageEditor: boolean = false): {
  isValid: boolean;
  resolvedId: string;
  configName: string;
  error?: string;
} {
  // Handle homepage/editor-demo mapping
  if (requestedId === 'homepage' || requestedId === 'editor-demo') {
    // Allow writes from the actual homepage editor
    if (isHomepageEditor && operation === 'write') {
      return {
        isValid: true,
        resolvedId: requestedId,
        configName: ISOLATION_RULES.homepageConfigName
      };
    }
    
    return {
      isValid: operation === 'read', // Only allow read operations from templates
      resolvedId: requestedId,
      configName: ISOLATION_RULES.homepageConfigName,
      error: operation === 'write' ? 'Templates cannot modify homepage configuration' : undefined
    };
  }

  // Handle template demo configurations
  if (requestedId.includes('-demo')) {
    const configName = `${requestedId} Configuration`;
    return {
      isValid: true,
      resolvedId: requestedId,
      configName
    };
  }

  // Handle numeric client IDs
  if (!isNaN(parseInt(requestedId))) {
    return {
      isValid: true,
      resolvedId: requestedId,
      configName: `Client ${requestedId} Configuration`
    };
  }

  // Handle legacy 'default' - redirect to proper demo config
  if (requestedId === 'default') {
    return {
      isValid: false,
      resolvedId: 'homepage',
      configName: ISOLATION_RULES.homepageConfigName,
      error: 'Legacy default config deprecated. Use specific demo config instead.'
    };
  }

  return {
    isValid: false,
    resolvedId: requestedId,
    configName: 'Unknown Configuration',
    error: 'Invalid configuration ID format'
  };
}

/**
 * Creates a safe demo configuration for templates
 */
export function createSafeDemoConfig(templateType: string): any {
  const baseConfig = {
    templateType,
    businessName: `${templateType.charAt(0).toUpperCase() + templateType.slice(1)} Demo`,
    phone: '+52 983 123 4567',
    email: `demo@${templateType}.com`,
    primaryColor: '#C8102E',
    secondaryColor: '#00A859',
    backgroundColor: '#FFFFFF',
    defaultLanguage: 'es',
    heroImage: `https://via.placeholder.com/800x400/C8102E/FFFFFF?text=${templateType}+Demo`,
    profileImage: null,
    showWhyWebsiteButton: false,
    showDomainButton: false,
    showChatbot: false
  };

  // Add template-specific demo content
  switch (templateType) {
    case 'professionals':
      return {
        ...baseConfig,
        doctorName: 'Dr. Demo Professional',
        specialty: { es: 'Especialista Demo', en: 'Demo Specialist' },
        services: [
          {
            title: { es: 'Servicio Demo', en: 'Demo Service' },
            description: { es: 'Descripción del servicio demo', en: 'Demo service description' },
            icon: 'star'
          }
        ]
      };
    case 'restaurants':
      return {
        ...baseConfig,
        menuPages: [
          {
            url: 'https://via.placeholder.com/400x300/C8102E/FFFFFF?text=Menu+Demo',
            title: { es: 'Menú Demo', en: 'Demo Menu' }
          }
        ]
      };
    case 'tourism':
      return {
        ...baseConfig,
        tours: [
          {
            title: { es: 'Tour Demo', en: 'Demo Tour' },
            description: { es: 'Descripción del tour demo', en: 'Demo tour description' },
            price: '$999 MXN'
          }
        ]
      };
    case 'retail':
      return {
        ...baseConfig,
        products: [
          {
            title: { es: 'Producto Demo', en: 'Demo Product' },
            description: { es: 'Descripción del producto demo', en: 'Demo product description' },
            price: '$99 MXN'
          }
        ]
      };
    case 'services':
      return {
        ...baseConfig,
        serviceAreas: [
          {
            title: { es: 'Área de Servicio Demo', en: 'Demo Service Area' },
            description: { es: 'Descripción del área de servicio demo', en: 'Demo service area description' }
          }
        ]
      };
    default:
      return baseConfig;
  }
}

/**
 * Filters configurations to exclude protected ones from client listings
 */
export function filterClientConfigs(configs: any[]): any[] {
  return configs.filter(config => 
    !ISOLATION_RULES.protectedConfigs.includes(config.name) &&
    !config.name?.includes('demo') &&
    !config.name?.includes('Demo') &&
    config.id !== 'homepage' &&
    config.id !== 1 // Filter out homepage by ID as well
  );
}

/**
 * Logs configuration access for debugging
 */
export function logConfigAccess(operation: string, configId: string, success: boolean, error?: string) {
  const timestamp = new Date().toISOString();
  console.log(`[CONFIG-ISOLATION] ${timestamp} - ${operation} ${configId} - ${success ? 'SUCCESS' : 'FAILED'} ${error ? `(${error})` : ''}`);
}