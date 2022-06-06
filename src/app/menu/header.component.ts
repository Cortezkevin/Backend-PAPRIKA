import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username !: string;
  isLogged = false;
  showFiller = false;
  
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(
    private authService: AuthService) { }
  
  ngOnInit(): void {
    this.getUsername();
    if(this.authService.getToken()){
      this.isLogged = true;
    }
  }

  getUsername(): void{
    this.username = this.authService.getUsername();
  }

  onLogout(): void {
    this.authService.logout();    
  }

  onToggleSidenav(): void{
    this.toggleSidenav.emit();
}
}
