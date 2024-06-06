import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'app/shared/services/shared.service';
import { environment } from 'environments/environment';
import { Tenant } from './tenant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService extends BaseResourceService<any> {
  url = environment.backendUrl+"/api/tenant"; 
  constructor(protected override injector: Injector) { 
    var url = environment.backendUrl+"/api/tenant"; 

    super(url, injector, Tenant.fromJson) 
  } 

  setTenant(tenant: string): void {
    sessionStorage.setItem('tenant', tenant);
  }

  getTenant(): string {
    return sessionStorage.getItem('tenant');
  }

  getTenantsEnabled(): string[] {
    let user = JSON.parse(sessionStorage.getItem('user'));
    return user.tenants;
  }

  getAllTenants(tenants: any[]): Observable<string[]> {
    let tren = this.http.post<string[]>(this.url + '/multiple', tenants);
    return tren;
  }
}
