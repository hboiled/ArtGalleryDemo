import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

import { AuthService } from './auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.authService.user.value;
        const isLoggedIn = user && user.token;        
        const isGetRequest= request.method.toLowerCase() === "get";        

        if (isLoggedIn && !isGetRequest ) {
            // set bearer header on requests that aren't get
            // so all CUD operations are restricted
            console.log("going thru auth interceptor");
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }

        return next.handle(request);
    }
}