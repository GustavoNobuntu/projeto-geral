import { Injectable, Injector } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { CartaoConsumo } from "app/modules/cartao-consumo/shared/cartao-consumo.model";
import { BaseResourceService } from 'app/shared/services/shared.service'; 
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartaoConsumoService extends BaseResourceService<CartaoConsumo> {

  protected http: HttpClient 

  constructor(protected override injector: Injector) { 
    var url = environment.backendUrl+"/api/cartaoConsumo"; 

    super(url, injector, CartaoConsumo.fromJson) 
  } 
}
