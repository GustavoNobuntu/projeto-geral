import { Injectable, Injector } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Opcional } from "app/modules/opcional/shared/opcional.model";
import { BaseResourceService } from 'app/shared/services/shared.service'; 
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpcionalService extends BaseResourceService<Opcional> {

  protected http: HttpClient 

  constructor(protected override injector: Injector) { 
    var url = environment.backendUrl+"/api/opcional"; 

    super(url, injector, Opcional.fromJson) 
  } 
}
