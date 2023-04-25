import { Component, OnInit } from '@angular/core';
import { TesteEmpresa } from '../model/TesteEmpresa';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { ApiConfigurationService } from '../service/api-configuration.service';
import { Empresa } from '../model/Empresa';
import { EmpresaServiceService } from '../service/empresa-service.service';
/*import { ApiService } from '../service/api.service'; */

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {

  restaurantes: Empresa [] = [];
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
    private activatedRoute: ActivatedRoute,
    private empresaService: EmpresaServiceService
  ){
  }

  ngOnInit() {
    this.getAllRestaurantes();
  }

  getAllRestaurantes() {
    this.empresaService.findAll().subscribe({
      next: (data) => {
        console.log('Teste');
      }
    })
  }
}
