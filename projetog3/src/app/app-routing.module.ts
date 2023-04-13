import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Restaurantes', component: RestaurantesComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Admin', component: AdminComponent },
  { path: 'Cadastro', component: CadastroComponent },
  { path: 'ShoppingCart', component: ShoppingCartComponent },
  { path: 'Success', component: SuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
