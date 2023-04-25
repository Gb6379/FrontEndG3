import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigurationService } from './api-configuration.service';
import { BaseServiceService } from './base-service.service';
import { Observable, map, filter } from 'rxjs';
import { StrictHttpResponse } from '../model/strict-http-response';
import { RequestBuilder } from './request-builder';
import { Product } from '../model/Product';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends BaseServiceService {
  static readonly find_all_path = '/products';
  static readonly find_all_category_path = '/category';
  static readonly find_path = '/products/{id}';
  static readonly save_path: '/products/category/{category_id}';

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

  saveProduct(
    params: {
      body: Product;
      category_id: any;
      header: any;
    },
    context?: HttpContext
  ): Observable<any> {
    return this.save$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  save$Response(
    params: { body: Product; category_id: any; header: any },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProdutoService.save_path,
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
          return r as StrictHttpResponse<any>;
        })
      );
  }

  findAllCategory(context?: HttpContext): Observable<Array<Categoria>> {
    return this.findAllCategory$Response(context).pipe(
      map(
        (r: StrictHttpResponse<Array<Categoria>>) => r.body as Array<Categoria>
      )
    );
  }

  findAllCategory$Response(
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<Categoria>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProdutoService.find_all_category_path,
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
          return r as StrictHttpResponse<Array<Categoria>>;
        })
      );
  }
}
