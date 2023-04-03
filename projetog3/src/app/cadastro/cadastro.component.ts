import { Component, OnInit } from '@angular/core';
import { CepServiceService } from './cep-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private cepService: CepServiceService) { }

  ngOnInit(): void {
  }

  consultaCep(valor: any, form: any){
    this.cepService.buscar(valor).subscribe((dados)=> this.populaForm(dados,form));
  }

  populaForm(dados:any, form: FormControl){
    form.setValue({
      cep: dados.cep,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      uf: dados.uf
    })
  }

}
