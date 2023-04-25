import { Product } from './Product';

export interface CarrinhoItem {
  id?: number;
  quantity?: number;
  product?: Product;
}
