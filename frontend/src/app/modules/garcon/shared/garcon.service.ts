import { Injectable, Injector } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Garcon } from "app/modules/garcon/shared/garcon.model";
import { BaseResourceService } from 'app/shared/services/shared.service'; 
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GarconService extends BaseResourceService<Garcon> {

  protected http: HttpClient 

  constructor(protected override injector: Injector) { 
    var url = environment.backendUrl+"/api/garcon"; 

    super(url, injector, Garcon.fromJson) 
  } 
}
