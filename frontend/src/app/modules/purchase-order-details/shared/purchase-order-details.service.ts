import { Injectable, Injector } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseOrderDetails } from "app/modules/purchase-order-details/shared/purchase-order-details.model";
import { BaseResourceService } from 'app/shared/services/shared.service'; 
import { environment } from 'environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderDetailsService extends BaseResourceService<PurchaseOrderDetails> {

  protected http: HttpClient 

  constructor(protected override injector: Injector) { 
    var url = environment.backendUrl+"/api/purchaseOrderDetails"; 

    super(url, injector, PurchaseOrderDetails.fromJson) 
  } 
}
