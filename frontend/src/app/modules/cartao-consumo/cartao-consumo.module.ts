import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartaoConsumoRoutingModule } from './cartao-consumo-routing.module';
import { CartaoConsumoFormComponent } from './cartao-consumo-form/cartao-consumo-form.component';
import { ListCartaoConsumoComponent } from './list-cartao-consumo/list-cartao-consumo.component';


@NgModule({
  declarations: [
    CartaoConsumoFormComponent,
    ListCartaoConsumoComponent
  ],
  imports: [
    CommonModule,
    CartaoConsumoRoutingModule
  ]
})
export class CartaoConsumoModule { }
