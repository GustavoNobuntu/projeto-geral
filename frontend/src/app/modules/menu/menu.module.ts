import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { ListMenuComponent } from './list-menu/list-menu.component';


@NgModule({
  declarations: [
    MenuFormComponent,
    ListMenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
