import { Injectable } from '@angular/core';
import { ApiConfigurationService } from './api-configuration.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BaseServiceService {

  constructor(
    protected config: ApiConfigurationService,
    protected http : HttpClient
    ) { 
   
  }


  private _rootUrl: string = '';
  /**
   * Returns the root url for all operations in this service. If not set directly in this
   * service, will fallback to `ApiConfiguration.rootUrl`.
   */

  get rootUrl(): string {
    return this._rootUrl || this.config.rootUrl;
  }

  /**
   * Sets the root URL for API operations in this service.
   */
  set rootUrl(rootUrl: string) {
    this._rootUrl = rootUrl;
  }

}
