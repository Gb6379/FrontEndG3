import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ApiConfigurationParams, ApiConfigurationService } from '../api-configuration.service';
import { HttpClient } from '@angular/common/http';
import { EnderecoService } from '../endereco.service';
import { EmpresaServiceService } from '../empresa-service.service';
import { ShoppingCartService } from '../shopping-cart.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    //put services in here
    AuthService,
    ApiConfigurationService,
    EnderecoService,
    ApiConfigurationService,
    EmpresaServiceService,
    ShoppingCartService
  ],
})
export class ApiModuleModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModuleModule> {
    return {
      ngModule: ApiModuleModule,
      providers: [
        {
          provide: ApiConfigurationService,
          useValue: params
        }
      ]
    }
 }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModuleModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
