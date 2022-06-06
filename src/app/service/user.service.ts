import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    userURL = "https://app-tienda-paprika.herokuapp.com/api/v1/user";
    constructor(
        private httpClient: HttpClient
    ) {}

    public getAllUsers(): Observable<User[]>{
        return this.httpClient.get<User[]>(this.userURL);
    }
}