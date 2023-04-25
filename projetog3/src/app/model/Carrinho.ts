import { CarrinhoItem } from './CarrinhoItem';

export interface Carrinho {
  cartItems?: CarrinhoItem[];
  totalCost?: number;
}
