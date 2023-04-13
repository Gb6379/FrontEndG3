import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  productList!: any[];
  products: any[] = [];
  subTotal!: any;

  constructor(
    private shopping_cart: ShoppingCartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.shopping_cart.getAllProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.productList = res;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log('Request Completed');
      },
    });

    this.shopping_cart.loadCart();
    this.products = this.shopping_cart.getProduct();
  }

  //Add product to Cart
  addToCart(product: any) {
    if (!this.shopping_cart.productInCart(product)) {
      product.quantity = 1;
      this.shopping_cart.addToCart(product);
      this.products = [...this.shopping_cart.getProduct()];
      this.subTotal = product.price;
    }
  }

  //Change sub total amount
  // changeSubTotal(product: any, index: any) {
  //   const qty = product.quantity;
  //   const amt = product.price;

  //   this.subTotal = amt * qty;

  //   this.product_service.saveCart();
  // }

  //Remove a Product from Cart
  removeFromCart(product: any) {
    this.shopping_cart.removeProduct(product);
    this.products = this.shopping_cart.getProduct();
  }

  //Calculate Total

  get total() {
    return this.products?.reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.quantity * product.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  checkout() {
    localStorage.setItem('cart_total', JSON.stringify(this.total));
    this.router.navigate(['/payment']);
  }
}
