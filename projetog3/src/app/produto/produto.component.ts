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
 
  categoria: Categoria[] =[];

  cities: any[];

  selectedCityCode: string;

  product:Product[] = [];

  productRequest: ProductRequest = {name: "", price: "", amount: "", companyId:-1, categoryId: -1}
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
  //this.categoryList= [{name: 'Bebidas', code: 'Bebidas'}]
 
  }

  ngOnInit(): void {
    this.getCategories()
  }

 async getCategories(){
    this.produtoService.findAllCategory({}).subscribe({
      next: (res) => {
        console.log(res);
        this.categoryList = res;
       // this.categoryList.push(this.categoria.categoryName);
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
      body: this.productRequest,
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
