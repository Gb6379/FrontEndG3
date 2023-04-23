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


  constructor(
    private cepService: CepServiceService,
    private formBuilder: FormBuilder,
    private service: DadosService,

    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService


    ) {

   }

  login() {
    this.router.navigate(['login']);
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
}
