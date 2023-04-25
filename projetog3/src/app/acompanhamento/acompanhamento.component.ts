import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { Order } from '../model/Order';
import { AcompanhamentoService } from '../service/acompanhamento.service';
import { Endereco } from '../model/Endereco';
import { EnderecoService } from '../service/endereco.service';

@Component({
  selector: 'app-acompanhamento',
  templateUrl: './acompanhamento.component.html',
  styleUrls: ['./acompanhamento.component.css']
})
export class AcompanhamentoComponent implements OnInit {

  order: Order[] =[];
  address: Endereco[]=[];

  constructor( private orderService: AcompanhamentoService,
    private tokenService: TokenStorageService,
    private enderecoService: EnderecoService,
    private router: Router) { }

    
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.findById1({"user_id": this.tokenService.getUserId}).subscribe({
      next: (data) => {
        this.order = data;
        console.log('Teste')
        console.log(this.tokenService.getUserId)
      }
    })
  }

  private fetchAdressesById(): void{
    this.enderecoService.findAll({"user_id": this.tokenService.getUserId}).subscribe({
      next: (data) => {
        this.address = data;
      }
    })
  }

}
