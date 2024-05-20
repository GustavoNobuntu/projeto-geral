import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnderecoFormComponent } from './endereco-form/endereco-form.component'; 
import { ListEnderecoComponent } from './list-endereco/list-endereco.component'; 


const routes: Routes = [
  { path: '', component: ListEnderecoComponent}, 
  { path: 'new', component: EnderecoFormComponent}, 
  { path: ':id/edit', component: EnderecoFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class EnderecoRoutingModule { }
