import RetailDemo from './RetailDemo';
import RetailEditor from './RetailEditor';
import { retailTemplateMetadata, type RetailTemplateConfig } from './config';

export { RetailDemo, RetailEditor, retailTemplateMetadata };
export type { RetailTemplateConfig };

export const retailTemplateOption = {
  id: 'retail',
  name: 'Retail',
  description: 'Professional templates for retail and e-commerce businesses',
  metadata: retailTemplateMetadata,
  demo: RetailDemo,
  editor: RetailEditor
};