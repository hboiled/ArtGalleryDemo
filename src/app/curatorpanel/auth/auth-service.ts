import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { Router } from '@angular/router';
import { User, AuthResponseData } from "./user-model";

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExprTimeout: any;
    private signInEndpoint: string = "https://localhost:5001/api/user/login";

    constructor(private http: HttpClient,
        private router: Router) { }

    signIn(curatorId: string, password: string) {
        return this.http.post<AuthResponseData>(
            this.signInEndpoint,
            {
                CuratorId: curatorId,
                Password: password
            }
        ).pipe(
            tap(responseData => {
                console.log(responseData);
                this.handleAuth(
                    responseData.localId,
                    responseData.idToken,
                    +responseData.expiresIn
                    )
            })
        )
    }

    private handleAuth(Id: string, token: string, expiresIn: number) {
        // resData expiresIn is in milliseconds so x 1000
        const exprDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const logedInUser = new User(Id, token, exprDate);        
        this.user.next(logedInUser);      
        console.log(+exprDate * 1000)  
        //this.autoLogout(expiresIn * 1000) // milliseconds conversion
        localStorage.setItem('userData', JSON.stringify(logedInUser));
    }

    logout() {
        //this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExprTimeout) {
            clearTimeout(this.tokenExprTimeout);
        }
        this.tokenExprTimeout = null;
    }

}