import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CozinhaRoutingModule } from './cozinha-routing.module';
import { CozinhaFormComponent } from './cozinha-form/cozinha-form.component';
import { ListCozinhaComponent } from './list-cozinha/list-cozinha.component';


@NgModule({
  declarations: [
    CozinhaFormComponent,
    ListCozinhaComponent
  ],
  imports: [
    CommonModule,
    CozinhaRoutingModule
  ]
})
export class CozinhaModule { }
