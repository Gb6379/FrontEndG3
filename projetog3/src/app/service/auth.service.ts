import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpResponse} from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { ApiConfigurationService } from './api-configuration.service';
import { BaseServiceService } from './base-service.service';
import { RegisterRequest } from '../model/register-request';
import { StrictHttpResponse } from '../model/strict-http-response';
import { AuthenticationResponse } from '../model/authentication-response';
import { RequestBuilder } from './request-builder';
import { AuthenticationRequest } from '../model/authentication-request';
import { RegisterRequestRestaurante } from '../model/register-request-restaurante';

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

  static readonly register_path = '/auth/register';
  static readonly login_user_path = '/auth/user/authenticate'
  static readonly login_company_path = '/auth/company/authenticate'


   /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
    register$Response(params: {body: RegisterRequest}, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
  
      const rb = new RequestBuilder(this.rootUrl, AuthService.register_path, 'post');
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

  
    register(params: {
      body : RegisterRequest
    },
    context?: HttpContext
  
  ): Observable<AuthenticationResponse> {
      console.log("register")
      console.log(params.body)
      return this.register$Response(params,context).pipe(
        map((r: StrictHttpResponse<AuthenticationResponse>) => r.body as AuthenticationResponse)
      );
    }

    register$ResponseResta(params: {body: RegisterRequestRestaurante}, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
  
      const rb = new RequestBuilder(this.rootUrl, AuthService.register_path, 'post');
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

    registerResta(params: {
      body : RegisterRequestRestaurante
    },
    context?: HttpContext
  
  ): Observable<AuthenticationResponse> {
      console.log("register")
      console.log(params.body)
      return this.register$ResponseResta(params,context).pipe(
        map((r: StrictHttpResponse<AuthenticationResponse>) => r.body as AuthenticationResponse)
      );
    }
  

    login$response(params: {body: AuthenticationRequest}, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>>{
      const rb = new RequestBuilder(this.rootUrl, AuthService.login_user_path, 'post');
      if(params){
        rb.body(params.body, 'application/json');
      }
      return this.http.request(rb.build({responseType: 'json', accept: 'application/json', context: context}))
      .pipe(filter((r: any) => r instanceof HttpResponse), map((r : HttpResponse<any>) => {
        return r as StrictHttpResponse<AuthenticationResponse>;
      }))

    }

    login$responseC(params: {body: AuthenticationRequest}, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>>{
      const rb = new RequestBuilder(this.rootUrl, AuthService.login_company_path, 'post');
      if(params){
        rb.body(params.body, 'application/json');
      }
      return this.http.request(rb.build({responseType: 'json', accept: 'application/json', context: context}))
      .pipe(filter((r: any) => r instanceof HttpResponse), map((r : HttpResponse<any>) => {
        return r as StrictHttpResponse<AuthenticationResponse>;
      }))

    }

    loginUser(params: {body: AuthenticationRequest},context?: HttpContext): Observable<AuthenticationResponse> {

      return this.login$response(params,context).pipe(
        map((r: StrictHttpResponse<AuthenticationResponse>) => r.body as AuthenticationResponse)
      );

      
    }

    loginC(params: {body: AuthenticationRequest},context?: HttpContext): Observable<AuthenticationResponse> {
      return this.login$responseC(params,context).pipe(
        map((r: StrictHttpResponse<AuthenticationResponse>) => r.body as AuthenticationResponse)
      );
    }
  


  registerUser(params: {body: AuthenticationRequest}, context?: HttpContext) : Observable<AuthenticationResponse> {
    return this.http.post(this.rootUrl + AuthService.register_path, {
      params
    }, httpOptions);
  }

}
