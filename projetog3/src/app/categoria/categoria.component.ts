import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnderecoService } from '../service/endereco.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor(private router: Router,
    private enderecoService: EnderecoService,
    private tokenService: TokenStorageService
) { }

  ngOnInit(): void {
  }

}
