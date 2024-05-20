import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarconFormComponent } from './garcon-form/garcon-form.component'; 
import { ListGarconComponent } from './list-garcon/list-garcon.component'; 


const routes: Routes = [
  { path: '', component: ListGarconComponent}, 
  { path: 'new', component: GarconFormComponent}, 
  { path: ':id/edit', component: GarconFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class GarconRoutingModule { }
