import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth-service';

@Injectable()
export class DataInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.authService.user.value;
        const isLoggedIn = user && user.token;        
        const isGetRequest= request.method.toLowerCase() === "get";        

        //TODO: only trigger on post/put reqs
        if (isLoggedIn && !isGetRequest ) {
            // loop through request body and truncate all surrounding whitespace            
            request = request.clone({});
            for (let key in request.body) {
                if (typeof request.body[key] === 'string') {
                    request.body[key] = request.body[key].trim();                    
                }                
            }

            //console.log(request.body);
        }

        return next.handle(request);
    }
}