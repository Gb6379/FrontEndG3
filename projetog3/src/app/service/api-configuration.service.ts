import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigurationService {

  rootUrl: string = "http://localhost:9090";

}

export interface ApiConfigurationParams {
  rootUrl?: string;
}