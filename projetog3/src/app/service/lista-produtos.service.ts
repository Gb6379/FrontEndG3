import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { ApiConfigurationService } from './api-configuration.service';
import { Observable, filter, map } from 'rxjs';
import { StrictHttpResponse } from '../model/strict-http-response';
import { Product } from '../model/Product';
import { RequestBuilder } from './request-builder';

@Injectable({
  providedIn: 'root'
})
export class ListaProdutosService extends BaseServiceService {

  private readonly API = 'http://localhost:9090/api/company'

  constructor(
    http: HttpClient,
    config: ApiConfigurationService
  ) {
    super(config,http)
  }

  static readonly findbyid_product_path = '/company/products/';

  findById1$Response(
    params: {
      company_id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Product>> {
    const rb = new RequestBuilder
    (
      this.rootUrl,
      ListaProdutosService.findbyid_product_path + params.company_id,
      'get'
    );
    if (params) {
      rb.path('company_id', params['company_id'], {});
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

  findById1(
    params: {
      company_id: number;
    },
    context?: HttpContext
  ): Observable<Product> {
    return this.findById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Product>) => r.body as Product)
    );
  }
}
