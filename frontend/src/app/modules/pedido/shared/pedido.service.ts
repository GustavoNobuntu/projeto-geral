import { Injectable, Injector } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Pedido } from "app/modules/pedido/shared/pedido.model";
import { BaseResourceService } from 'app/shared/services/shared.service'; 
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends BaseResourceService<Pedido> {

  protected http: HttpClient 

  constructor(protected override injector: Injector) { 
    var url = environment.backendUrl+"/api/pedido"; 

    super(url, injector, Pedido.fromJson) 
  } 
}
