import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroClienteRoutingModule } from './cadastro-cliente-routing.module';
import { CadastroClienteFormComponent } from './cadastro-cliente-form/cadastro-cliente-form.component';
import { ListCadastroClienteComponent } from './list-cadastro-cliente/list-cadastro-cliente.component';


@NgModule({
  declarations: [
    CadastroClienteFormComponent,
    ListCadastroClienteComponent
  ],
  imports: [
    CommonModule,
    CadastroClienteRoutingModule
  ]
})
export class CadastroClienteModule { }
