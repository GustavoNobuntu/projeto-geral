import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoFormComponent } from './produto-form/produto-form.component'; 
import { ListProdutoComponent } from './list-produto/list-produto.component'; 


const routes: Routes = [
  { path: '', component: ListProdutoComponent}, 
  { path: 'new', component: ProdutoFormComponent}, 
  { path: ':id/edit', component: ProdutoFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ProdutoRoutingModule { }
