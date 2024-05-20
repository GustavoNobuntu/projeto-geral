import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaDeVisitaRoutingModule } from './sala-de-visita-routing.module';
import { SalaComponent } from './sala/sala.component';


@NgModule({
  declarations: [
    SalaComponent
  ],
  imports: [
    CommonModule,
    SalaDeVisitaRoutingModule
  ]
})
export class SalaDeVisitaModule { }
