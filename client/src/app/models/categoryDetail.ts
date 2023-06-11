import { Category } from './category';

export interface CategoryDetail {
  id: number;
  name: string;
  parentId?: number;
  subCategories: Category[];
}
