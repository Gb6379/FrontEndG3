import { Categoria } from './../model/Categoria';
import { Product } from './../model/Product';
import { ProdutoService } from './../service/produto.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { ProductRequest } from '../model/ProductRequest';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
})
export class ProdutoComponent implements OnInit {
  categoryList: any;
  produto: ProductRequest = { name: '', price: "", amount: "", companyId: -1 };
  categoria: Categoria = {};

  constructor(
    private produtoService: ProdutoService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

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
      header: this.tokenStorage.getToken,
    });
  }
}
