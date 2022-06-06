import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginUser } from '../models/login-user';
import { AuthService } from '../service/auth.service';
import { PhotoService } from '../service/photo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];

  username:string = "";
  password:string = "";

  constructor(
    private authService: AuthService,
    private toast: NgToastService,
    private router: Router,
    public photoService:PhotoService,
  ) { }

  ngOnInit(): void {      
    if(this.authService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.authService.getAuthorities();
      this.router.navigate(['/index']);
    }
  }

  onLogin(){    
    const loginData = new LoginUser(this.username, this.password);
    /*this.authService.loginUser(loginData).subscribe(
      data=> {        
          this.toast.success({detail: "Success Message", summary: "Inicio Sesión Correctamente", duration: 4000});

          this.isLogged = true;
          this.isLoginFail = false;

          this.tokenService.setToken(data.token);
          this.tokenService.setUsername(data.username);
          this.tokenService.setAuthorities(data.authorities);

          this.roles = data.authorities;
          this.router.navigate(['/index']);
      },
      error=> {
          this.toast.error({detail: "Error Message", summary: "Error al Iniciar Sesión", duration: 4000})
          this.isLogged = false;
          this.isLoginFail = true;
      }
    );*/
    this.authService.login(loginData).subscribe(
      res => {
        if(res){
          console.log("DATA LOGIN ASDASDSA",res);
          this.getPhoto(res.username);
          this.toast.success({detail: "Success Message", summary: "Inicio Sesión Correctamente", duration: 4000});
          this.router.navigate(['/index']);
        }else{
          this.toast.error({detail: "Error Message", summary: "Error al Iniciar Sesión", duration: 4000})
        }
      }
    );
    console.log("USENAME: ", this.username);
  }


  getPhoto(user:string):void{
    this.photoService.getPhotoByUser(user).subscribe(
      res => {
        if(res){
          console.log("DATA PHOTO SUCCESS")
        }else{
          console.log("ERROR DATA PHOTO")
        }
      }      
    );
  }
}
