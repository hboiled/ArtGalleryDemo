import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "./auth-service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : boolean | Promise<boolean> | Observable<boolean | UrlTree> | UrlTree {
            const user = this.authService.user.value;
            // placeholder to always return false
            //const placeholderValidator = false;
            
            if (user !== null) {
                console.log("user is valid");
                return true;
            } else {
                console.log("no user detected");
                return this.router.createUrlTree(['/auth']);
            }

            
    }

}