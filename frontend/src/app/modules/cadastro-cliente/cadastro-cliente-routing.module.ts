import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClienteFormComponent } from './cadastro-cliente-form/cadastro-cliente-form.component'; 
import { ListCadastroClienteComponent } from './list-cadastro-cliente/list-cadastro-cliente.component'; 


const routes: Routes = [
  { path: '', component: ListCadastroClienteComponent}, 
  { path: 'new', component: CadastroClienteFormComponent}, 
  { path: ':id/edit', component: CadastroClienteFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class CadastroClienteRoutingModule { }
