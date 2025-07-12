import TourismDemo from './TourismDemo';
import TourismEditor from './TourismEditor';
import { tourismTemplateMetadata, type TourismTemplateConfig } from './config';

export { TourismDemo, TourismEditor, tourismTemplateMetadata };
export type { TourismTemplateConfig };

export const tourismTemplateOption = {
  id: 'tourism',
  name: 'Tourism',
  description: 'Professional templates for tourism and travel businesses',
  metadata: tourismTemplateMetadata,
  demo: TourismDemo,
  editor: TourismEditor
};