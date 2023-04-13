import { Component, OnInit } from '@angular/core';
import { CepServiceService } from '../service/cep-service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DadosService } from '../service/dados.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form: FormGroup;

  constructor(private cepService: CepServiceService, private formBuilder: FormBuilder, private service: DadosService) {
    this.form = this.formBuilder.group({
      name: [null],
      cpf: [null],
      email: [null],
      password: [null],
    })
   }

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

  onSubmit(){
    this.service.save(this.form.value).subscribe(data => console.log(data));
  }

}
