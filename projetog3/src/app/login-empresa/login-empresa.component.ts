import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
import { AuthenticationRequest } from '../model/authentication-request';

@Component({
  selector: 'app-login-empresa',
  templateUrl: './login-empresa.component.html',
  styleUrls: ['./login-empresa.component.css']
})
export class LoginEmpresaComponent implements OnInit {

   authRequest: AuthenticationRequest =  {
    email: '',
    password: ''
  };
  errorMsg = '';

  constructor( private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService) { }

  ChangeHome(): void {
    this.router.navigateByUrl('');
  }

  ChangeAdmin(): void {
    this.router.navigateByUrl('Admin');
  }

  ngOnInit(): void {
  }

  login() {
    this.errorMsg = '';
    this.authService.loginC(
      {
        body: this.authRequest
      }
    ).subscribe({
      next: (response) => {
        this.tokenService.saveResponse(response);
        this.router.navigate(['Admin']);
      },
      error: (err) => {
        console.log(err);
        this.errorMsg = err.error.errorMsg;
      }
    });
  }

}
