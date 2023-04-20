import { Component, OnInit } from '@angular/core';
import { CepServiceService } from '../service/cep-service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DadosService } from '../service/dados.service';
import { RegisterRequest } from '../model/register-request';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  registerRequest: RegisterRequest = {firstname: '', lastname: '',cpf: '',phone: '', email:'', password: ''};
  errorMsgs: string[] = [];

  //form: FormGroup;

  constructor(
    private cepService: CepServiceService, 
    private formBuilder: FormBuilder, 
    private service: DadosService,

    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService

    
    ) {
    /*this.form = this.formBuilder.group({
      name: [null],
      cpf: [null],
      email: [null],
      password: [null],
    })*/
   }

  login() {
    this.router.navigate(['login']);
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

  register() {
    this.errorMsgs = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: (res) => { 
        this.tokenService.saveResponse(res);
        this.router.navigate(['Login'])
      },
      error: (err) => {
        this.errorMsgs = err.error.validationErrors;
      }
    });
  }

 /* onSubmit(){
    this.service.save(this.form.value).subscribe(data => console.log(data));
  }*/

}
