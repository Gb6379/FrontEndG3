import { Component, OnInit } from '@angular/core';
import { CepServiceService } from '../service/cep-service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DadosService } from '../service/dados.service';
import { RegisterRequestRestaurante } from '../model/register-request-restaurante';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Endereco } from '../model/Endereco';

@Component({
  selector: 'app-cadastro-restaurante',
  templateUrl: './cadastro-restaurante.component.html',
  styleUrls: ['./cadastro-restaurante.component.css']
})
export class CadastroRestauranteComponent implements OnInit {

  endereco: Endereco[] = [{}];
  registerRequest: RegisterRequestRestaurante = {name: '', cnpj: '',phone: '', email:'', password: ''};
  errorMsgs: string[] = [];

  form: FormGroup;

  constructor(
    private cepService: CepServiceService, 
    private formBuilder: FormBuilder, 
    private service: DadosService,

    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService
    ) 
    {
    this.form = this.formBuilder.group({
      name: [null],
      cnpj: [null],
      email: [null],
      password: [null],
    })
   }

  ngOnInit(): void {
  }


  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsgs = [];
    this.authService.registerResta({
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

  consultaCep(valor: any, form: any){
    this.cepService.buscar(valor).subscribe({
      next: (data) => {
        this.endereco.push(data);//need a fix. Endpoint returns a json object, therefor the object initializer need to receive a json
      }
    });
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
