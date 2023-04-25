import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class WeatherService {

    baseurl = environment.baseUrl;
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }) };

    constructor(private httpClient: HttpClient) { 
        
    }

    AuthonticateUser(): Observable<any> {
        return this.httpClient.get<any>(this.baseurl + 'WeatherForecast');
    }
}