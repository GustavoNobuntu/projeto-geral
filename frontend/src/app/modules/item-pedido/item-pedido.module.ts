import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemPedidoRoutingModule } from './item-pedido-routing.module';
import { ItemPedidoFormComponent } from './item-pedido-form/item-pedido-form.component';
import { ListItemPedidoComponent } from './list-item-pedido/list-item-pedido.component';


@NgModule({
  declarations: [
    ItemPedidoFormComponent,
    ListItemPedidoComponent
  ],
  imports: [
    CommonModule,
    ItemPedidoRoutingModule
  ]
})
export class ItemPedidoModule { }
