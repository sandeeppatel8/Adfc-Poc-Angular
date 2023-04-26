import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Profile } from '../entity/response/profile.model';
import { environment } from '../../environments/environment'

const GRAPH_ENDPOINT = environment.graphUrl;
const GRAPH_ENDPOINT_PIC = environment.graphUrl +'/photo/$value';

@Injectable({
    providedIn: 'root'
})

export class AzureAdService {
    isUserLoggedIn: Subject<boolean> = new Subject<boolean>();
    constructor(private httpClient: HttpClient) { }
    getUserProfile() {
        return this.httpClient.get<Profile>(GRAPH_ENDPOINT);
    }
    getProfilePic() {
        return this.httpClient.get(GRAPH_ENDPOINT_PIC,
            { responseType: 'blob' });
    }
}