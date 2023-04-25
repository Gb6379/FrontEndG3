import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SuccessComponent } from './success/success.component';
import { InformacaoUsuarioComponent } from './informacao-usuario/informacao-usuario.component';
import { ProdutoComponent } from './produto/produto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CadastroRestauranteComponent } from './cadastro-restaurante/cadastro-restaurante.component';
import { LoginEmpresaComponent } from './login-empresa/login-empresa.component';
import { PaymentComponent } from './payment/payment.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { EnderecoListComponent } from './endereco-list/endereco-list.component';
import { AcompanhamentoComponent } from './acompanhamento/acompanhamento.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Restaurantes', component: RestaurantesComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Admin', component: AdminComponent },
  { path: 'Cadastro-Usuario', component: CadastroComponent },
  { path: 'ShoppingCart', component: ShoppingCartComponent },
  { path: 'Success', component: SuccessComponent },
  { path: 'Dados', component: InformacaoUsuarioComponent },
  { path: 'Produto', component: ProdutoComponent },
  { path: 'Categoria', component: CategoriaComponent },
  { path: 'Cadastro-Restaurante', component: CadastroRestauranteComponent },
  { path: 'Login-restaurante', component: LoginEmpresaComponent },
  { path: 'Payment', component: PaymentComponent },
  { path: 'Endereco', component: EnderecoComponent },
  { path: 'EnderecoList', component: EnderecoListComponent },
  { path: 'Acompanhamento', component: AcompanhamentoComponent },
  { path: 'Lista-produtos', component: ListaProdutosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
