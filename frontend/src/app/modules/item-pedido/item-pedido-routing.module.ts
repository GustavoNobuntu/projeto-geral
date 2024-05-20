import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemPedidoFormComponent } from './item-pedido-form/item-pedido-form.component'; 
import { ListItemPedidoComponent } from './list-item-pedido/list-item-pedido.component'; 


const routes: Routes = [
  { path: '', component: ListItemPedidoComponent}, 
  { path: 'new', component: ItemPedidoFormComponent}, 
  { path: ':id/edit', component: ItemPedidoFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ItemPedidoRoutingModule { }
