import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TenantService } from './tenant.service';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor(private tenantService: TenantService) { }

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request object
    let newReq = req.clone();

        newReq = req.clone({
            headers: req.headers.set('X-Tenant-ID', this.tenantService.getTenant())
        });

        console.log('TenantInterceptor', newReq.headers.get('X-Tenant-ID'));

    return next.handle(newReq);
  }
}
