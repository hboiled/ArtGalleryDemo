import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { Router } from '@angular/router';
import { User, AuthResponseData } from "./user-model";

import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {

    // TODO make private and a getter
    user = new BehaviorSubject<User>(null);
    private tokenExprTimeout: any;
    //private signInEndpoint: string = "https://localhost:5001/api/user/login";

    constructor(private http: HttpClient,
        private router: Router) { }

    signIn(curatorId: string, password: string) {
        return this.http.post<AuthResponseData>(
            environment.signInEndpoint,
            {
                CuratorId: curatorId,
                Password: password
            }
        ).pipe(
            tap(responseData => {
                console.log(responseData);
                console.log(responseData.token);
                this.handleAuth(
                    responseData.curatorId,
                    responseData.token,
                    responseData.expiration // api is set to +7 days to expire                    
                    )                    
            })
        )
    }

    private handleAuth(Id: string, token: string, expiresIn: string) {
        
        const initialExprDateVal = new Date(expiresIn).getTime();
        const dateNow = Date.now();        

        const expriryInMilliseconds = Math.abs(
            initialExprDateVal - dateNow
        );        
        
        const exprDate = new Date(new Date().getTime() + expriryInMilliseconds);
        //console.log(exprDate);
        const loggedInUser = new User(Id, token, exprDate);        
        this.user.next(loggedInUser);      
        
        //console.log(JSON.stringify(loggedInUser));
        this.autoLogout(expriryInMilliseconds) 
        localStorage.setItem('userData', JSON.stringify(loggedInUser));
    }

    autoLogin() {
        // since userData was saved as string, have to convert it back to json
        const userData: {            
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));        

        if (!userData) {
            console.log("no user data, auto login failed")
            return;
        }

        const loadedUser = new User(
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        )

        if (loadedUser.token) {
            
            this.user.next(loadedUser);
            const exprDurationNow =
                new Date(userData._tokenExpirationDate).getTime() -
                new Date().getTime();
            console.log(`${exprDurationNow} milliseconds left until auto logout`) // time in milliseconds remaining token   
            this.autoLogout(exprDurationNow);
        }
    }

    autoLogout(exprDur: number) {
        // time in milliseconds

        console.log(`Set to auto logout in ${exprDur} milliseconds`);

        this.tokenExprTimeout = setTimeout(() => {
            console.log("logging out")
            this.logout();
        }, exprDur);
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExprTimeout) {
            clearTimeout(this.tokenExprTimeout);
        }
        this.tokenExprTimeout = null;
    }

}