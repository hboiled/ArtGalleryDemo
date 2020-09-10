import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : boolean | Promise<boolean> | Observable<boolean | UrlTree> | UrlTree {
            
            // placeholder to always return false
            const placeholderValidator = false;

            if (placeholderValidator) {
                return true;
            } else {
                return this.router.createUrlTree(['/auth']);
            }

            
    }

}