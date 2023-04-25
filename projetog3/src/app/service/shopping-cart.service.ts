import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';
import { RequestBuilder } from './request-builder';
import { BaseServiceService } from './base-service.service';
import { ApiConfigurationService } from './api-configuration.service';
import { StrictHttpResponse } from '../model/strict-http-response';
import { Carrinho } from '../model/Carrinho';
import { CarrinhoRequest } from '../model/CarrinhoRequest';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService extends BaseServiceService {
  products: any[] = [];
  static readonly find_path = '/cart';
  static readonly save_path: '/cart/add';
  static readonly update_path: '/cart/update';
  static readonly add_item_path: '/cart/addItem/{product_id}';
  static readonly remove_item_path: '/cart/removeItem/{product_id}';
  static readonly empty_cart_path: '/cart/emptyCart';

  constructor(http: HttpClient, config: ApiConfigurationService) {
    super(config, http);
  }

  findById1(
    params: {
      header: any;
    },
    context?: HttpContext
  ): Observable<Carrinho> {
    return this.findById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Carrinho>) => r.body as Carrinho)
    );
  }

  findById1$Response(
    params: {
      header: any;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Carrinho>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ShoppingCartService.find_path,
      'get'
    );
    if (params) {
      rb.header('Authorization', params.header);
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
          context: context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Carrinho>;
        })
      );
  }

  saveCart(
    params: {
      body: CarrinhoRequest;
      header: any;
    },
    context?: HttpContext
  ): Observable<any> {
    return this.save$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  save$Response(
    params: { body: CarrinhoRequest; header: any },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ShoppingCartService.save_path,
      'post'
    );
    if (params) {
      rb.header('Authorization', params.header);
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
          context: context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<any>;
        })
      );
  }

  updateCart(
    params: {
      header: any;
      body: CarrinhoRequest;
    },
    context?: HttpContext
  ): Observable<any> {
    return this.update$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  update$Response(
    params: { body: CarrinhoRequest; header: any },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ShoppingCartService.update_path,
      'put'
    );
    if (params) {
      rb.body(params.body, 'application/json');
      rb.header('Authorization', params.header);
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
          context: context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<any>;
        })
      );
  }

  addItem(
    params: {
      product_id: number;
      header: any;
    },
    context?: HttpContext
  ): Observable<any> {
    return this.addItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  addItem$Response(
    params: { product_id: number; header: any },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ShoppingCartService.add_item_path,
      'put'
    );
    if (params) {
      rb.path('product_id', params['product_id'], {});
      rb.header('Authorization', params.header);
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
          context: context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<any>;
        })
      );
  }

  removeItemCart(
    params: {
      product_id: number;
      header: any;
    },
    context?: HttpContext
  ): Observable<any> {
    return this.removeItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  removeItem$Response(
    params: { product_id: number; header: any },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ShoppingCartService.remove_item_path,
      'put'
    );
    if (params) {
      rb.path('product_id', params['product_id'], {});
      rb.header('Authorization', params.header);
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
          context: context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<any>;
        })
      );
  }

  cleanCart(
    params: {
      user_id: number;
      header: any;
    },
    context?: HttpContext
  ): Observable<any> {
    return this.cleanCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  cleanCart$Response(
    params: { user_id: number; header: any },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ShoppingCartService.empty_cart_path,
      'delete'
    );
    if (params) {
      rb.path('user_id', params['user_id'], {});
      rb.header('Authorization', params.header);
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
          context: context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<any>;
        })
      );
  }

  saveCart1(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.products));
  }

  addToCart(addedProduct: any) {
    this.products.push(addedProduct);
    this.saveCart1();
  }

  loadCart(): void {
    this.products = JSON.parse(localStorage.getItem('cart_items') as any) || [];
  }

  productInCart(product: any): boolean {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart1();
    }
  }

  clearProducts() {
    localStorage.clear();
  }
}
