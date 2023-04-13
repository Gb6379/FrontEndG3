import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../model/Endereco';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private readonly API = 'api/address'

  constructor(private httpClient: HttpClient) { }

    list() {
    return this.httpClient.get<Endereco[]>(this.API)
    .pipe(
      first(),
      tap(endereco => console.log(endereco))
    )
  }
}
