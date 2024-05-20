import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpcionalRoutingModule } from './opcional-routing.module';
import { OpcionalFormComponent } from './opcional-form/opcional-form.component';
import { ListOpcionalComponent } from './list-opcional/list-opcional.component';


@NgModule({
  declarations: [
    OpcionalFormComponent,
    ListOpcionalComponent
  ],
  imports: [
    CommonModule,
    OpcionalRoutingModule
  ]
})
export class OpcionalModule { }
