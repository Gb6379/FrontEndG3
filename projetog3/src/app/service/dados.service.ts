import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { HttpClient } from '@angular/common/http';
import { first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private readonly API = '/users'

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Usuario[]>(this.API)
    .pipe(
      first(),
      tap(dados => console.log(dados))
    );
  }

  save(record: Usuario){
    return this.httpClient.post<Usuario>(this.API, record).pipe(first());
  }
}
