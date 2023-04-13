import { Component, OnInit } from '@angular/core';
import { DadosService } from '../service/dados.service';
import { Usuario } from '../model/usuario';
import { Endereco } from '../model/Endereco';
import { EnderecoService } from '../service/endereco.service';

@Component({
  selector: 'app-informacao-usuario',
  templateUrl: './informacao-usuario.component.html',
  styleUrls: ['./informacao-usuario.component.css']
})
export class InformacaoUsuarioComponent implements OnInit {

  dadosUsuario: Usuario[] = [];
  dadosEndereco: Endereco[] = [];


  constructor(private dadosService: DadosService, private enderecoService: EnderecoService) {
    //this.dadosService = new DadosService();

    this.dadosService.list().subscribe(dados => this.dadosUsuario = dados);
    this.enderecoService.list().subscribe(endereco => this.dadosEndereco = endereco);
   }

  ngOnInit(): void {
  }

}
