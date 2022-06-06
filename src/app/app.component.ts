import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { PhotoService } from './service/photo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit{
  title = 'app-backend-paprika';

  photoData = "";
  username = "";

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isLogged = false;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    public authService: AuthService,
    public photoService: PhotoService
     ) {}

  ngOnInit(): void {
    this.getPhoto();
    this.username = this.authService.getUsername();
  }

  ngAfterViewInit() {
    if(this.authService.getToken()){
      this.isLogged = true;
    }

    this.observer
      .observe(['(max-width: 800px)'])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    /*this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });*/
  }

  onLogout(): void {
    this.authService.logout();  
    this.isLogged = false;  
  }

  getPhoto(){
    this.photoService.getPhotoByUser(this.authService.getUsername()).subscribe(
      res => {
        if(res){          
          this.photoData = res.file;
        }
      }
    );
  }
}
