import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-empresa',
  templateUrl: './login-empresa.component.html',
  styleUrls: ['./login-empresa.component.css']
})
export class LoginEmpresaComponent implements OnInit {

  constructor(private router: Router) { }

  ChangeHome(): void {
    this.router.navigateByUrl('');
  }

  ChangeAdmin(): void {
    this.router.navigateByUrl('Admin');
  }

  ngOnInit(): void {
  }

}
