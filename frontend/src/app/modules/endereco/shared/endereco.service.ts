import { Injectable, Injector } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Endereco } from "app/modules/endereco/shared/endereco.model";
import { BaseResourceService } from 'app/shared/services/shared.service'; 
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService extends BaseResourceService<Endereco> {

  protected http: HttpClient 

  constructor(protected override injector: Injector) { 
    var url = environment.backendUrl+"/api/endereco"; 

    super(url, injector, Endereco.fromJson) 
  } 
}
