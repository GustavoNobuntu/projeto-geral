import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartaoClienteFormComponent } from './cartao-cliente-form/cartao-cliente-form.component'; 
import { ListCartaoClienteComponent } from './list-cartao-cliente/list-cartao-cliente.component'; 


const routes: Routes = [
  { path: '', component: ListCartaoClienteComponent}, 
  { path: 'new', component: CartaoClienteFormComponent}, 
  { path: ':id/edit', component: CartaoClienteFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class CartaoClienteRoutingModule { }
