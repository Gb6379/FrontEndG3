import { Product } from './Product';

export interface Categoria {
  id?: number;
  categoryName?: String;
  description?: String;
  imageUrl?: string;
  product?: Product[];
}
