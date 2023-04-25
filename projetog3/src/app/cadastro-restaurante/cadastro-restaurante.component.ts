import { Component, OnInit } from '@angular/core';
import { CepServiceService } from '../service/cep-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  formulario!: FormGroup;

  constructor(
    private cepService: CepServiceService,
    private formBuilder: FormBuilder,
    private service: DadosService,

    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService
    )
    {

   }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
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
        this.router.navigate(['Endereco'])
      },
      error: (err) => {
        this.errorMsgs = err.error.validationErrors;
      }
    });
  }
}
