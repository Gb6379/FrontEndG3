import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigurationService } from './api-configuration.service';
import { BaseServiceService } from './base-service.service';
import { Observable, map, filter } from 'rxjs';
import { StrictHttpResponse } from '../model/strict-http-response';
import { RequestBuilder } from './request-builder';
import { Product } from '../model/Product';
import { Categoria } from '../model/Categoria';
import { ProductRequest } from '../model/ProductRequest';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends BaseServiceService {
  static readonly find_all_path = '/products';
  static readonly find_all_category_path = '/category';
  static readonly find_path = '/products/';
  static readonly save_path: '/products/category/';

  constructor(http: HttpClient, config: ApiConfigurationService) {
    super(config, http);
  }

  findById(
    params: {
      id: any;
    },
    context?: HttpContext
  ): Observable<Product> {
    return this.findById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Product>) => r.body as Product)
    );
  }

  findById1$Response(
    params: {
      id: any;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Product>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProdutoService.find_path,
      'get'
    );
    if (params) {
      rb.path('category_id', params['id'], {});
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
          return r as StrictHttpResponse<Product>;
        })
      );
  }

  findAll(context?: HttpContext): Observable<Array<Product>> {
    return this.findAll$Response(context).pipe(
      map((r: StrictHttpResponse<Array<Product>>) => r.body as Array<Product>)
    );
  }

  findAll$Response(
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<Product>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProdutoService.find_all_path,
      'get'
    );

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
          return r as StrictHttpResponse<Array<Product>>;
        })
      );
  }

  saveProductAndCategory(
    params: {
      body: ProductRequest;
      category_id: any;
      header: any;
    },
    context?: HttpContext
  ): Observable<any> {
    return this.save$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  save$Response(//save product and category
    params: { body: ProductRequest; category_id: any; header: any },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProdutoService.save_path + params.category_id,
      'post'
    );
    if (params) {
      rb.header('Authorization', params.header);
      rb.body(params.body, 'application/json');
      rb.path('category_id', params['category_id'], {});
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
          return r as StrictHttpResponse<Product>;
        })
      );
  }

  findAllCategory(
    params?: {
    },
    context?: HttpContext): Observable<Array<Categoria>> {
    console.log("entrei fin all category")
    return this.findAllCategory$Response(params,context).pipe(
      map(
        (r: StrictHttpResponse<Array<Categoria>>) => r.body as Array<Categoria>
      )
    );
  }

  findAllCategory$Response(params?: {
  },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<Categoria>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProdutoService.find_all_category_path,
      'get'
    );

    if (params) {
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
          console.log("R",r)
          return r as StrictHttpResponse<Array<Categoria>>;
        })
      );
  }
}
