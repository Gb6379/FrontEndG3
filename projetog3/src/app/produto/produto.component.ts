import { Categoria } from './../model/Categoria';
import { Product } from './../model/Product';
import { ProdutoService } from './../service/produto.service';
import { Component, OnInit } from '@angular/core';
import { ProductRequest } from '../model/ProductRequest';
import { ListaProdutosService } from '../service/lista-produtos.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
})
export class ProdutoComponent implements OnInit {
  categoryList: any;

  categoria: Categoria[] = [];

<<<<<<< HEAD
  product:Product[] = [];
=======
  cities: any[];

  selectedCityCode: string;

  product: Product[] = [];
>>>>>>> 5139705597f61415e05ad7b98437dd1480b6c686

  productRequest: ProductRequest = {
    name: '',
    price: '',
    amount: '',
    companyId: -1,
    categoryId: -1,
  };
  errorMsgs: string[] = [];
  private productId?: number;

  constructor(
    private productService: ListaProdutosService,
    private produtoService: ProdutoService,
    private tokenService: TokenStorageService,
    private router: Router
  ) {
   
 
  }

  ngOnInit(): void {
    this.getCategories();
  }

  async getCategories() {
    this.produtoService.findAllCategory({}).subscribe({
      next: (res) => {
        console.log(res);
        this.categoryList = res;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log('Request Completed');
      },
    });
  }

  salvarProduto(categoryList: any) {
    this.productRequest.categoryId = categoryList[0].id[0];
    this.productRequest.companyId = this.tokenService.getUserId;
    console.log("request produto", categoryList[0].id)
    this.produtoService.saveProductAndCategory({body: this.productRequest}).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['Lista-produtos']);
      },
      error: (err) => {
        this.errorMsgs = err.error.validationErrors;
      }
    });
  }

  save() {
    this.productRequest.companyId = this.tokenService.getUserId;
    this.productService.saveProduct({ body: this.productRequest }).subscribe({
      next: () => {
        this.router.navigate(['Lista-produtos']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
