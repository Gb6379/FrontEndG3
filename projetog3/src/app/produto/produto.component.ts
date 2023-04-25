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
  produto: ProductRequest = { name: '', price: "", amount: "", companyId: -1 };
  categoria: Categoria = {};

  cities: any[];

  selectedCityCode: string;

  product:Product[] = [];

  productRequest: ProductRequest = {name: "", price: "", amount: "", companyId:-1}
  errorMsgs: string[] = [];
  private productId?: number;

  constructor(
     private productService: ListaProdutosService,
     private produtoService : ProdutoService,
    private tokenService: TokenStorageService,
    private router: Router
  ) {
    this.cities = [
      {name: 'Bebidas', code: 'Bebidas'},
      {name: 'Refeições', code: 'Refeicoess'},
  ];
  this.selectedCityCode = ""
  }

  ngOnInit(): void {
    this.produtoService.findAllCategory().subscribe({
      next: (res: any) => {
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

  salvarProduto(categoryId: number) {
    this.produtoService.saveProductAndCategory({
      body: this.produto,
      category_id: categoryId,
      header: this.tokenService.getToken,
    });
  }

   save() {
    this.productRequest.companyId = this.tokenService.getUserId;
    this.productService.saveProduct({body: this.productRequest})
      .subscribe({
        next: () => {
          this.router.navigate(['Lista-produtos']);
        },
        error: (err) => {
          this.errorMsgs = err.error.validationErrors;
        }
      });
  }

}
