import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoPagamentoFormComponent } from './tipo-pagamento-form/tipo-pagamento-form.component'; 
import { ListTipoPagamentoComponent } from './list-tipo-pagamento/list-tipo-pagamento.component'; 


const routes: Routes = [
  { path: '', component: ListTipoPagamentoComponent}, 
  { path: 'new', component: TipoPagamentoFormComponent}, 
  { path: ':id/edit', component: TipoPagamentoFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class TipoPagamentoRoutingModule { }
