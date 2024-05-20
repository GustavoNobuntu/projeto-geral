import { Injectable, Injector } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Pagamento } from "app/modules/pagamento/shared/pagamento.model";
import { BaseResourceService } from 'app/shared/services/shared.service'; 
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService extends BaseResourceService<Pagamento> {

  protected http: HttpClient 

  constructor(protected override injector: Injector) { 
    var url = environment.backendUrl+"/api/pagamento"; 

    super(url, injector, Pagamento.fromJson) 
  } 
}
