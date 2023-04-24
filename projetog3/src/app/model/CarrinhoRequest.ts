import { Product } from './Product';

export interface CarrinhoRequest {
  quantity: number;
  product: Product;
}
