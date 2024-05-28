import { Injectable, Injector } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryTransactions } from "app/modules/inventory-transactions/shared/inventory-transactions.model";
import { BaseResourceService } from 'app/shared/services/shared.service'; 
import { environment } from 'environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class InventoryTransactionsService extends BaseResourceService<InventoryTransactions> {

  protected http: HttpClient 

  constructor(protected override injector: Injector) { 
    var url = environment.backendUrl+"/api/inventoryTransaction"; 

    super(url, injector, InventoryTransactions.fromJson) 
  } 
}
