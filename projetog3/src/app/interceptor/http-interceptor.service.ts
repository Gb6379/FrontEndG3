import { Injectable } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenStorageService,
    //private loaderService: LoaderService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   // this.loaderService.show();
    const token = this.tokenService.getToken;
    if (token) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          //'Access-Control-Allow-Origin':'*'/

        })
      });
      return this.handleRequest(authReq, next);
    }

    return this.handleRequest(req, next);
  }

  private handleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(tap((event) => {
            if (event instanceof HttpResponse) {
             // this.loaderService.hide();
            }
          },
          (err: any) => {
            //this.loaderService.hide();

          })
      );
  }
}
