import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnderecoRoutingModule } from './endereco-routing.module';
import { EnderecoFormComponent } from './endereco-form/endereco-form.component';
import { ListEnderecoComponent } from './list-endereco/list-endereco.component';


@NgModule({
  declarations: [
    EnderecoFormComponent,
    ListEnderecoComponent
  ],
  imports: [
    CommonModule,
    EnderecoRoutingModule
  ]
})
export class EnderecoModule { }
