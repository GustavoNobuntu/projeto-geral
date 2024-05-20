import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GarconRoutingModule } from './garcon-routing.module';
import { GarconFormComponent } from './garcon-form/garcon-form.component';
import { ListGarconComponent } from './list-garcon/list-garcon.component';


@NgModule({
  declarations: [
    GarconFormComponent,
    ListGarconComponent
  ],
  imports: [
    CommonModule,
    GarconRoutingModule
  ]
})
export class GarconModule { }
