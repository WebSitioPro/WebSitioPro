import RestaurantsDemo from './RestaurantsDemo';
import RestaurantsEditor from './RestaurantsEditor';
import { restaurantsTemplateMetadata, type RestaurantsTemplateConfig } from './config';

export { RestaurantsDemo, RestaurantsEditor, restaurantsTemplateMetadata };
export type { RestaurantsTemplateConfig };

export const restaurantsTemplateOption = {
  id: 'restaurants',
  name: 'Restaurants',
  description: 'Professional templates for restaurants and food businesses',
  metadata: restaurantsTemplateMetadata,
  demo: RestaurantsDemo,
  editor: RestaurantsEditor
};