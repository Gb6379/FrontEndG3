import { ShoppingCartService } from './../service/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  constructor(
    private router: Router,
    private ShoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {}

  goBackToHome() {
    this.ShoppingCartService.clearProducts();
    this.router.navigate(['/']);
  }
}
