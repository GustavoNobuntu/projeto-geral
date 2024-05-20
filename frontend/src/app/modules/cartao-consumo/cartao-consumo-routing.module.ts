import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartaoConsumoFormComponent } from './cartao-consumo-form/cartao-consumo-form.component'; 
import { ListCartaoConsumoComponent } from './list-cartao-consumo/list-cartao-consumo.component'; 


const routes: Routes = [
  { path: '', component: ListCartaoConsumoComponent}, 
  { path: 'new', component: CartaoConsumoFormComponent}, 
  { path: ':id/edit', component: CartaoConsumoFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class CartaoConsumoRoutingModule { }
