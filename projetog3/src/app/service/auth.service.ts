import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpResponse} from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { ApiConfigurationService } from './api-configuration.service';
import { BaseServiceService } from './base-service.service';
import { RegisterRequest } from '../model/register-request';
import { StrictHttpResponse } from '../model/strict-http-response';
import { AuthenticationResponse } from '../model/authentication-response';
import { RequestBuilder } from './request-builder';

const AUTH_API = 'http://localhost:9090/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseServiceService {

  constructor( 
    config: ApiConfigurationService,
    http: HttpClient
  ) {
    super(config, http);
  }

  static readonly api_path = 'http://localhost:9090/auth/';


   /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
    register$Response(params: {
      body: RegisterRequest
    },
    context?: HttpContext
  
  ): Observable<StrictHttpResponse<AuthenticationResponse>> {
  
      const rb = new RequestBuilder(this.rootUrl, AuthService.api_path, 'post');
      if (params) {
        rb.body(params.body, 'application/json');
      }
  
      return this.http.request(rb.build({
        responseType: 'json',
        accept: 'application/json',
        context: context
      })).pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<AuthenticationResponse>;
        })
      );
    }

  loginUser(username: string, password: string) : Observable<any> {
    return this.http.post(AUTH_API + '/user/authenticate', {
      username,
      password
    }, httpOptions);
  }

  loginCompany(username: string, password: string) : Observable<any> {
    return this.http.post(AUTH_API + '/company/authenticate', {
      username,
      password
    }, httpOptions);
  }

  register(
    username: string, 
    password: string, 
    lastname: string, 
    cpf: string,
    email: string) : Observable<any> {
      return this.http.post(AUTH_API + 'register', {
        username,
        lastname,
        cpf,
        email,
        password
      }, httpOptions);
  }
}
