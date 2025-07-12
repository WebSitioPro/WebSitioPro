import ServicesDemo from './ServicesDemo';
import ServicesEditor from './ServicesEditor';
import { servicesTemplateMetadata, type ServicesTemplateConfig } from './config';

export { ServicesDemo, ServicesEditor, servicesTemplateMetadata };
export type { ServicesTemplateConfig };

export const servicesTemplateOption = {
  id: 'services',
  name: 'Services',
  description: 'Professional templates for service-based businesses',
  metadata: servicesTemplateMetadata,
  demo: ServicesDemo,
  editor: ServicesEditor
};