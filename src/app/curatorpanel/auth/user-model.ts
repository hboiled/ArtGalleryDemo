export interface AuthResponseData {
    //kind: string;
    idToken: string;
    //email: string;
    //refreshToken: string;
    expiresIn: string;
    localId: string;
    //registered?: boolean // for sign in
}

export class User {
    constructor(        
        public curatorId: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}