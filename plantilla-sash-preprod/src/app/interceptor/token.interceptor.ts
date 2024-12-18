import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AuthServiceService } from '../authentication/services/auth-service.service';
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    // constructor(private loginService: AuthServiceService, private routes: Router) { }

    // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //     const token = localStorage.getItem('token');
    //     let clonedRequest = request;
    //     if (token) {
    //         clonedRequest = request.clone({
    //             headers: request.headers.set('Authorization', `Bearer ${token}`)
    //         });
    //     }
    //     return next.handle(request).do((event: HttpEvent<any>) => {
    //     }, (err: any) => {
    //         if (err.status === 401) {
    //             this.loginService.isLogoutUnathorizated();
    //             console.log('error 401')
    //             // return this.routes.navigate(['/']);
    //         }
    //         if (err.status === 403) {
    //             this.loginService.isLogoutUnathorizated();
    //             console.log('error 403')
    //             // return this.routes.navigate(['/']);
    //         }
    //     });
        
    // }
    constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    let headers 
    if(token!=null){
      headers = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
    }else{
      headers = request.clone({
        headers: request.headers.set('Authorization', ``)
      });
    }
    return next.handle(headers);
  }
}
