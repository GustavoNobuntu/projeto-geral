import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuFormComponent } from './menu-form/menu-form.component'; 
import { ListMenuComponent } from './list-menu/list-menu.component'; 


const routes: Routes = [
  { path: '', component: ListMenuComponent}, 
  { path: 'new', component: MenuFormComponent}, 
  { path: ':id/edit', component: MenuFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class MenuRoutingModule { }
