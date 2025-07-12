/**
 * Professionals Template Module
 * Exports the main components and configuration for the Professionals template
 */

export { default as ProfessionalsDemo } from './ProfessionalsDemo';
export { default as ProfessionalsEditor } from './ProfessionalsEditor';
export { professionalsTemplateConfig, type ProfessionalsTemplateConfig } from './config';

// Template Option for TemplateEditor
export const professionalsTemplateOption = {
  id: 'professionals',
  name: 'Professionals',
  description: {
    es: 'Plantilla profesional para doctores, dentistas y otros profesionales de la salud',
    en: 'Professional template for doctors, dentists and other healthcare professionals'
  },
  image: 'https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Professionals',
  category: 'Healthcare',
  demoRoute: '/professionals-demo',
  editorRoute: '/editor/professionals',
  templateType: 'professionals' as const
};