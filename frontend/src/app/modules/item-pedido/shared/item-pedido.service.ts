import { Injectable, Injector } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { ItemPedido } from "app/modules/item-pedido/shared/item-pedido.model";
import { BaseResourceService } from 'app/shared/services/shared.service'; 
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemPedidoService extends BaseResourceService<ItemPedido> {

  protected http: HttpClient 

  constructor(protected override injector: Injector) { 
    var url = environment.backendUrl+"/api/itemPedido"; 

    super(url, injector, ItemPedido.fromJson) 
  } 
}
