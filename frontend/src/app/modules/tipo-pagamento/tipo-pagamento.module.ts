import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoPagamentoRoutingModule } from './tipo-pagamento-routing.module';
import { TipoPagamentoFormComponent } from './tipo-pagamento-form/tipo-pagamento-form.component';
import { ListTipoPagamentoComponent } from './list-tipo-pagamento/list-tipo-pagamento.component';


@NgModule({
  declarations: [
    TipoPagamentoFormComponent,
    ListTipoPagamentoComponent
  ],
  imports: [
    CommonModule,
    TipoPagamentoRoutingModule
  ]
})
export class TipoPagamentoModule { }
