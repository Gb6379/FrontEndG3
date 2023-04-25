import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SuccessComponent } from './success/success.component';
import { CardModule } from 'primeng/card';
import { InformacaoUsuarioComponent } from './informacao-usuario/informacao-usuario.component';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutoComponent } from './produto/produto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { CadastroRestauranteComponent } from './cadastro-restaurante/cadastro-restaurante.component';
import { LoginEmpresaComponent } from './login-empresa/login-empresa.component';
import { PaymentComponent } from './payment/payment.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { DropdownModule } from 'primeng/dropdown';
import { EnderecoComponent } from './endereco/endereco.component';
import { EnderecoListComponent } from './endereco-list/endereco-list.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { AcompanhamentoComponent } from './acompanhamento/acompanhamento.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { HttpInterceptorService } from './interceptor/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RestaurantesComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    CadastroComponent,
    ShoppingCartComponent,
    SuccessComponent,
    InformacaoUsuarioComponent,
    ProdutoComponent,
    CategoriaComponent,
    CadastroRestauranteComponent,
    LoginEmpresaComponent,
    PaymentComponent,
    EnderecoComponent,
    EnderecoListComponent,
    AcompanhamentoComponent,
    ListaProdutosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    CardModule,
    TableModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    AccordionModule,
    NgxPayPalModule,
    DropdownModule,
    MessageModule,
    MessagesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    HttpClient
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
