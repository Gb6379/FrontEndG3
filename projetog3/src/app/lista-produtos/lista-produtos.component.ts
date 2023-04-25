import { Component, OnInit } from '@angular/core';
import { Teste } from '../model/Teste';
import { ListaProdutosService } from '../service/lista-produtos.service';
import { Product } from '../model/Product';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { ProductRequest } from '../model/ProductRequest';
import { Empresa } from '../model/Empresa';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  product:Product[] = [];
  empresa:Empresa[] = [];

  errorMsgs: string[] = [];

  teste:Teste [] = [{
    nome: 'Feijoada Brasileira',
    valor: 'R$ 45,00',
    descricao: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit amet'
  }
  ]

  constructor(
    private productService: ListaProdutosService,
    private tokenService: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productService.findById1({"company_id": this.tokenService.getUserId}).subscribe({
      next: (data) => {
        this.product = data;
        console.log('Teste')
        console.log(this.tokenService.getUserId)
      }
    })
  }

  getCompany(){
    this.productService.findCompanyById1({"company_id": this.tokenService.getUserId}).subscribe({
      next: (data) => {
        this.empresa = data;
        console.log('Teste')
        console.log(this.tokenService.getUserId)
      }
    })
  }

}
