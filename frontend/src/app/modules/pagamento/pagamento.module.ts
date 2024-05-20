import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentoRoutingModule } from './pagamento-routing.module';
import { PagamentoFormComponent } from './pagamento-form/pagamento-form.component';
import { ListPagamentoComponent } from './list-pagamento/list-pagamento.component';


@NgModule({
  declarations: [
    PagamentoFormComponent,
    ListPagamentoComponent
  ],
  imports: [
    CommonModule,
    PagamentoRoutingModule
  ]
})
export class PagamentoModule { }
