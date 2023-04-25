import { Component, OnInit } from '@angular/core';
import { Teste } from '../model/Teste';
import { ListaProdutosService } from '../service/lista-produtos.service';
import { Product } from '../model/Product';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  product:Product[] = [];

  teste:Teste [] = [{
    nome: 'Feijoada Brasileira',
    valor: 'R$ 45,00',
    descricao: 'Lorem ipsum dolor sit amet'
  },
  {
    nome: 'Feijoada Brasileira',
    valor: 'R$ 45,00',
    descricao: 'Lorem ipsum dolor sit amet'
  }
  ]

  constructor(
    private productService: ListaProdutosService,
    private tokesService: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productService.findById1({"company_id": this.tokesService.getUserId}).subscribe({
      next: (data) => {
        this.product = data
      }
    })
  }

}
