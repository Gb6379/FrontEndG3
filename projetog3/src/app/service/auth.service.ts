import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigurationService } from './api-configuration.service';
import { BaseServiceService } from './base-service.service';

const AUTH_API = 'http://localhost:9090/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseServiceService {

  constructor( config: ApiConfigurationService,
    http: HttpClient
  ) {
    super(config, http);
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
