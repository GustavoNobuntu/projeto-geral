import { Injectable, Injector } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdersTaxStatus } from "app/modules/orders-tax-status/shared/orders-tax-status.model";
import { BaseResourceService } from 'app/shared/services/shared.service'; 
import { environment } from 'environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class OrdersTaxStatusService extends BaseResourceService<OrdersTaxStatus> {

  protected http: HttpClient 

  constructor(protected override injector: Injector) { 
    var url = environment.backendUrl+"/api/ordersTaxStatus"; 

    super(url, injector, OrdersTaxStatus.fromJson) 
  } 
}
