import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CozinhaFormComponent } from './cozinha-form/cozinha-form.component'; 
import { ListCozinhaComponent } from './list-cozinha/list-cozinha.component'; 


const routes: Routes = [
  { path: '', component: ListCozinhaComponent}, 
  { path: 'new', component: CozinhaFormComponent}, 
  { path: ':id/edit', component: CozinhaFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class CozinhaRoutingModule { }
