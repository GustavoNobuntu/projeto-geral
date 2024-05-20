import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagamentoFormComponent } from './pagamento-form/pagamento-form.component'; 
import { ListPagamentoComponent } from './list-pagamento/list-pagamento.component'; 


const routes: Routes = [
  { path: '', component: ListPagamentoComponent}, 
  { path: 'new', component: PagamentoFormComponent}, 
  { path: ':id/edit', component: PagamentoFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PagamentoRoutingModule { }
