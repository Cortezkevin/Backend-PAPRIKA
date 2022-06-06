import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  email:string = "";

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast:NgToastService
  ) { }

  ngOnInit(): void {
  }

  volver():void{
    this.router.navigate(['/login']);
  }
  onChange():void{
    if(this.isEmail(this.email)){
      this.authService.changePassword(this.email).subscribe({
        next: (res) => {          
          this.toast.info({detail: "Info Message", summary: res.mensaje, duration: 3000});
          this.router.navigate(['/login'])
        },
        error: (err) => {
          console.log(err.mensaje);
          this.toast.error({detail: "Error Message", summary: err.error.mensaje, duration: 3000});
        }
      });      
    }else{
      this.toast.error({detail: "Error Message", summary: "El email ingresado no es valido", duration: 3000});
    }
  }

  isEmail(email:string):boolean{
    const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let res = regex.test(email);
    return res;
  }
}
