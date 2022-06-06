import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgToastService } from 'ng-angular-popup';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUser } from '../models/login-user';
import { NewUser } from '../models/new-user';
import { ResponseMessage } from '../models/response-message';

const helper = new JwtHelperService();
const TOKEN_KEY = "AuthToken";
const USERNAME_KEY = "AuthUsername";
const AUTHORITIES_KEY = "AuthAuthorities";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  roles: Array<string> = [];

  //authURL = "http://localhost:3000/auth" //local-service
  authURL = "https://app-tienda-paprika.herokuapp.com/auth" //nube_service

  private loggedIn = new BehaviorSubject<boolean>(false);
  private usernameSession = new BehaviorSubject<string>("unknown");
  
  constructor(
    private toast: NgToastService,
    private httpClient: HttpClient,
    private router: Router) { 
      this.chekToken();
    }

  get isLogged():Observable<boolean>{
   return this.loggedIn.asObservable();
  }

  get isUsername():Observable<string>{
    return this.usernameSession.asObservable();
  }

  public newUser(newuser:NewUser): Observable<ResponseMessage>{
    return this.httpClient.post<ResponseMessage>(`${this.authURL}/newUser`, newuser);
  }

  public loginUser(loginuser:LoginUser): Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(`${this.authURL}/login`, loginuser);
  }

  public login(loginUser:LoginUser): Observable<JwtDTO | void>{
    return this.httpClient.post<JwtDTO>(`${this.authURL}/login`, loginUser)
    .pipe(
      map((res: JwtDTO) => { 
        this.setToken(res.token);
        this.setUsername(res.username);
        this.setAuthorities(res.authorities);

        this.loggedIn.next(true);
        this.usernameSession.next(this.getUsername());

        return res;
      }),
      catchError((err) => this.handlerError(err))
      );
  }
  //https://app-tienda-paprika.herokuapp.com/auth/changePassword/cortezkevinq@gmail.com
  public changePassword(email:string):Observable<ResponseMessage>{
    return this.httpClient.post<ResponseMessage>(`${this.authURL}/changePassword/${email}`,null);
  }

  public logout():void{
    localStorage.clear();
    this.loggedIn.next(false);
    this.usernameSession.next("unknown");
    this.router.navigate(['/login']);
  }

  private handlerError(err:any): Observable<never>{
    this.toast.error({detail: "Error Message", summary: "Usuario o Password Incorrectos", duration: 4000});
    let errorMessage = "Ocurrio un error";
    if(err){
      errorMessage = `Error: code ${err.message}`;
    }
    return throwError(errorMessage);
  }

  //TOKEN 

  public chekToken():void{
    const token = localStorage.getItem(TOKEN_KEY);
    const isExpired = helper.isTokenExpired(token!);

    console.log("TOKEN ESPIRED?: ", isExpired);

    if(isExpired){
      this.toast.info({detail: "Info", summary: "Session is Expired", duration: 3000});
      this.logout();
    }else{
      this.loggedIn.next(true)
    }
    //isExpired ? this.logout; this.toast.info({detail: ""}) : this.loggedIn.next(true);
  }
  public setToken(token:string):void{
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string{
    return localStorage.getItem(TOKEN_KEY)!;
  }

  public setUsername(username:string):void{
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string{
    return localStorage.getItem(USERNAME_KEY)!;
  }

  public setAuthorities(authorities:string[]):void{
    window.localStorage.removeItem(AUTHORITIES_KEY);
    window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities():string[]{
    this.roles = [];
    
    if(localStorage.getItem(AUTHORITIES_KEY)){
      JSON.parse(localStorage.getItem(AUTHORITIES_KEY)!).forEach(
        (authority: { authority: string; }) => this.roles.push(authority.authority)
      );
    }

    return this.roles;
  }
}
