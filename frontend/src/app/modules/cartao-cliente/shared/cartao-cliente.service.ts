import { Injectable, Injector } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { CartaoCliente } from "app/modules/cartao-cliente/shared/cartao-cliente.model";
import { BaseResourceService } from 'app/shared/services/shared.service'; 
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartaoClienteService extends BaseResourceService<CartaoCliente> {

  protected http: HttpClient 

  constructor(protected override injector: Injector) { 
    var url = environment.backendUrl+"/api/cartaoCliente"; 

    super(url, injector, CartaoCliente.fromJson) 
  } 
}
