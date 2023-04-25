import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { ApiConfigurationService } from './api-configuration.service';
import { Observable, filter, map } from 'rxjs';
import { Product } from '../model/Product';
import { StrictHttpResponse } from '../model/strict-http-response';
import { ListaProdutosService } from './lista-produtos.service';
import { RequestBuilder } from './request-builder';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class AcompanhamentoService extends BaseServiceService{

  constructor(
    http: HttpClient,
    config: ApiConfigurationService
  ) {
    super(config,http)
  }

  static readonly findorderby_user_path = '/order/user/';

  findById1$Response(
    params: {
      user_id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<Order>>> {
    const rb = new RequestBuilder
    (
      this.rootUrl,
      ListaProdutosService.findbyid_product_path + params.user_id,
      'get'
    );
    if (params) {
      rb.path('user_id', params['user_id'], {});
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
          return r as StrictHttpResponse<Array<Order>>;
        })
      );
  }

  findById1(
    params: {
      user_id: number;
    },
    context?: HttpContext
  ): Observable<Array<Order>> {
    return this.findById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Order>>) => r.body as Array<Order>)
    );
  }


}
