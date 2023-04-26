import { Injectable } from "@angular/core";
const USER_KEY = 'auth-user';

@Injectable({ providedIn: 'root' })
export class StorageService {
    constructor() { }

    clean(): void {
        window.sessionStorage.clear();
    }

    cleanLocalStorage():void{
        window.localStorage.clear();
    }

    public saveUser(user: any): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public setItem(key: any, value: any): void {
        window.localStorage.setItem(key, value);
    }

    public getItem(key: any): void {
        window.localStorage.getItem(key)
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }
        return {};
    }

    public isLoggedIn(): boolean {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return true;
        }
        return false;
    }

}
