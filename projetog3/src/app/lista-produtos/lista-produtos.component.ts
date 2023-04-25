import { CarrinhoRequest } from './../model/CarrinhoRequest';
import { Component, OnInit } from '@angular/core';
import { Teste } from '../model/Teste';
import { ListaProdutosService } from '../service/lista-produtos.service';
import { Product } from '../model/Product';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { ProductRequest } from '../model/ProductRequest';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { Empresa } from '../model/Empresa';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css'],
})
export class ListaProdutosComponent implements OnInit {
  product: Product[] = [];
  empresa: Empresa[] = [];
  newCart: CarrinhoRequest = { product: {}, quantity: 1 };
  errorMsgs: string[] = [];

  teste: Teste[] = [
    {
      nome: 'Feijoada Brasileira',
      valor: 'R$ 45,00',
      descricao: 'Lorem ipsum dolor sit amet',
    },
    {
      nome: 'Feijoada Brasileira',
      valor: 'R$ 45,00',
      descricao: 'Lorem ipsum dolor sit amet',
    },
  ];

  constructor(
    private productService: ListaProdutosService,
    private tokenService: TokenStorageService,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCompany();
  }

  getProducts() {
    this.productService
      .findById1({ company_id: this.tokenService.getUserId })
      .subscribe({
        next: (data) => {
          this.product = data;
          console.log(this.product);
          console.log(this.tokenService.getUserId);
        },
      });
  }

  getCompany() {
    this.productService
      .findCompanyById1({ company_id: this.tokenService.getUserId })
      .subscribe({
        next: (data) => {
          this.empresa = data;
          console.log('Teste');
          console.log(this.tokenService.getUserId);
        },
      });
  }

  addItemToCart(product: Product) {
    console.log(product);
    if (
      this.shoppingCartService.findById1({
        header: this.tokenService.getToken,
      }) != null
    ) {
      this.addProduct(product);
    } else {
      this.createCart(product);
    }
  }

  createCart(product: Product) {
    this.newCart.product = product;
    this.shoppingCartService.saveCart({
      body: this.newCart,
      header: this.tokenService.getToken,
    });
  }

  addProduct(product: Product) {
    this.shoppingCartService.addItem({
      product_id: product.id!,
      header: this.tokenService.getToken,
    });
  }
}
