import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../model/Endereco';
import { Observable, filter, first, map, tap } from 'rxjs';
import { ApiConfigurationService } from './api-configuration.service';
import { BaseServiceService } from './base-service.service';
import { StrictHttpResponse } from '../model/strict-http-response';
import { RequestBuilder } from './request-builder';
import { EnderecoRequest } from '../model/EnderecoRequest';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService extends BaseServiceService {
  private readonly API = 'api/address';

  constructor(http: HttpClient, config: ApiConfigurationService) {
    super(config, http);
  }

  static readonly save_address_path = 'address/user/{user_id}';

  save$AddresResponse(
    params: { body: EnderecoRequest },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Endereco>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      EnderecoService.save_address_path,
      'post'
    );
    if (params) {
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
          return r as StrictHttpResponse<Endereco>;
        })
      );
  }

  saveAddress(
    params: {
      body: EnderecoRequest;
    },
    context?: HttpContext
  ): Observable<Endereco> {
    return this.save$AddresResponse(params, context).pipe(
      map((r: StrictHttpResponse<Endereco>) => r.body as Endereco)
    );
  }

  static readonly get_address_path = '/address/getAdresses/';

  findAll$Response(
    params: {
      user_id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<Endereco>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      EnderecoService.get_address_path + params.user_id,
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
          return r as StrictHttpResponse<Array<Endereco>>;
        })
      );
  }

  findAll(
    params: {
      user_id: number;
    },
    context?: HttpContext
  ): Observable<Array<Endereco>> {
    return this.findAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Endereco>>) => r.body as Array<Endereco>)
    );
  }

  static readonly delete_address_path = '/address/';

  delete$Response(
    params: {
      address_id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      EnderecoService.delete_address_path + params.address_id,
      'delete'
    );
    if (params) {
      rb.path('address_id', params['address_id'], {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
          context: context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  delete(
    params: {
      address_id: number;
    },
    context?: HttpContext
  ): Observable<void> {
    return this.delete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  static readonly findbyid_address_path = '/address/'

  findById1$Response(
    params: {
      address_id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Endereco>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      EnderecoService.findbyid_address_path + params.address_id,
      'get'
    );
    if (params) {
      rb.path('address_id', params['address_id'], {});
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
          return r as StrictHttpResponse<Endereco>;
        })
      );
  }

  findById1(
    params: {
      address_id: number;
    },
    context?: HttpContext
  ): Observable<Endereco> {
    return this.findById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Endereco>) => r.body as Endereco)
    );
  }

  list() {
    return this.http.get<Endereco[]>(this.API).pipe(
      first(),
      tap((endereco) => console.log(endereco))
    );
  }
}
