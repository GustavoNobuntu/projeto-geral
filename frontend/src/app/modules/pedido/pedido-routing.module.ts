import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoFormComponent } from './pedido-form/pedido-form.component'; 
import { ListPedidoComponent } from './list-pedido/list-pedido.component'; 


const routes: Routes = [
  { path: '', component: ListPedidoComponent}, 
  { path: 'new', component: PedidoFormComponent}, 
  { path: ':id/edit', component: PedidoFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PedidoRoutingModule { }
