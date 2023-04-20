import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Empresa } from '../model/Empresa';
import { TesteEmpresa } from '../model/TesteEmpresa';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {

  restaurantes: any;
  empresa: TesteEmpresa[] = [
    {
      name: 'teste',
      categoria: 'teste'
    },
    {
      name: 'teste2',
      categoria: 'teste2'
    }
  ];
  displayedColuns = ['name','categoria']

  constructor(private apiservice: ApiService){
  }

  ngOnInit() {
    this.getAllRestaurantes();
  }

  getAllRestaurantes() {
    this.apiservice.getAllData().subscribe((res)=>{
      this.restaurantes = res.data;
    });
  }
}
