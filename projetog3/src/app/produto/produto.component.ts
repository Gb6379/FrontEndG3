import { Categoria } from './../model/Categoria';
import { Product } from './../model/Product';
import { ProdutoService } from './../service/produto.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
})
export class ProdutoComponent implements OnInit {
  categoryList: any;
  produto: Product = { name: '', price: 0, amount: 0 };
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
    this.produtoService.saveProduct({
      body: this.produto,
      category_id: categoryId,
      header: this.tokenStorage.getToken,
    });
  }
}
