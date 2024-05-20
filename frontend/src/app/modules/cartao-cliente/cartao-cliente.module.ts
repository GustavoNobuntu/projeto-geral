import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartaoClienteRoutingModule } from './cartao-cliente-routing.module';
import { CartaoClienteFormComponent } from './cartao-cliente-form/cartao-cliente-form.component';
import { ListCartaoClienteComponent } from './list-cartao-cliente/list-cartao-cliente.component';


@NgModule({
  declarations: [
    CartaoClienteFormComponent,
    ListCartaoClienteComponent
  ],
  imports: [
    CommonModule,
    CartaoClienteRoutingModule
  ]
})
export class CartaoClienteModule { }
