import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpcionalFormComponent } from './opcional-form/opcional-form.component'; 
import { ListOpcionalComponent } from './list-opcional/list-opcional.component'; 


const routes: Routes = [
  { path: '', component: ListOpcionalComponent}, 
  { path: 'new', component: OpcionalFormComponent}, 
  { path: ':id/edit', component: OpcionalFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class OpcionalRoutingModule { }
