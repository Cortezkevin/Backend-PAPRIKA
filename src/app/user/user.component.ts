import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserDeleteDialogComponent } from '../dialog/user-dialog/user-delete-dialog.component';
import { UserDialogComponent } from '../dialog/user-dialog/user-dialog.component';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isAdmin = false;
  displayedColumns: string[] = ['id','name', 'username', 'email','password','roles','action'];

  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,    
    public authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    if(this.authService.getToken()){
      this.authService.getAuthorities().forEach(
        val => {
          if(val === 'ROLE_ADMIN'){
            this.isAdmin = true;
          }
        }
      );
    }
  }

  getAllUsers(): void{
    this.userService.getAllUsers().subscribe({
      next:(res) => {                
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=> {

      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog():void{
    this.dialog.open(UserDialogComponent,{
      width: '30%'
    }).afterClosed().subscribe( 
      val => {
        if(val === 'save'){
          this.getAllUsers();
        }
      }
    )
  }

  editProduct(row:any):void{
    this.dialog.open(UserDialogComponent,{
      width: '40%', data: row
    }).afterClosed().subscribe( 
      val => {
        if(val === 'update'){
          this.getAllUsers();
        }
      }
    )
  }

  deleteProduct(id:number):void{
    this.dialog.open(UserDeleteDialogComponent,{
      width: '20%', data: id
    }).afterClosed().subscribe(
      val => {
        if(val === 'delete'){
          this.getAllUsers();
        }
      }
    )
  }

}
