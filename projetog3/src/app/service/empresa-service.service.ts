import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { ApiConfigurationService } from './api-configuration.service';
import { Observable, filter, map } from 'rxjs';
import { StrictHttpResponse } from '../model/strict-http-response';
import { Empresa } from '../model/Empresa';
import { RequestBuilder } from './request-builder';

@Injectable({
  providedIn: 'root'
})
export class EmpresaServiceService extends BaseServiceService {

  private readonly API = 'http://localhost:9090/api/company'

  constructor(
    http: HttpClient,
    config: ApiConfigurationService
  ) {
    super(config,http)
  }

  static readonly endpointEmpresa = '/company'

  findall$response(context?: HttpContext): Observable<StrictHttpResponse<Array<Empresa>>>{
    const rb = new RequestBuilder(this.rootUrl, EmpresaServiceService.endpointEmpresa, 'get');

    return this.http.request(
      rb.build({
        responseType: 'json',
        accept: 'application/json',
        context: context
      })).pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<Empresa>>
        })
      );
  }

  findAll(context?: HttpContext): Observable<Array<Empresa>> {
    return this.findall$response(context).pipe(
      map((r: StrictHttpResponse<Array<Empresa>>) => r.body as Array<Empresa>)
    );
  }
}
