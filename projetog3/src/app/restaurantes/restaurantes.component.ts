import { Component, OnInit } from '@angular/core';
import { TesteEmpresa } from '../model/TesteEmpresa';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
//import { ApiService } from '../service/api.service';

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

  constructor(
    private router: Router,
    //private restauranteService: RestauranteService,
    private tokenService: TokenStorageService,
    private activatedRoute: ActivatedRoute
  ){
  }

  ngOnInit() {
    //this.getAllRestaurantes();
  }



/*getAllRestaurantes() {
  this.apiservice.getAllData().subscribe((res)=>{
    this.restaurantes = res.data;
  });
}*/


}
