import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryDeleteDialogComponent } from '../dialog/category-dialog/category-delete-dialog.component';
import { CategoryDialogComponent } from '../dialog/category-dialog/category-dialog.component';
import { Category } from '../models/category';
import { Producto } from '../models/producto';
import { AuthService } from '../service/auth.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    
  isAdmin = false;
  displayedColumns: string[] = ['id','url_image', 'name', 'description','state','action'];

  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoryService: CategoryService,    
    public authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
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

  getAllCategories(): void{
    this.categoryService.lista().subscribe({
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
    this.dialog.open(CategoryDialogComponent,{
      width: '30%'
    }).afterClosed().subscribe( 
      val => {
        if(val === 'save'){
          this.getAllCategories();
        }
      }
    )
  }

  editProduct(row:any):void{
    this.dialog.open(CategoryDialogComponent,{
      width: '40%', data: row
    }).afterClosed().subscribe( 
      val => {
        if(val === 'update'){
          this.getAllCategories();
        }
      }
    )
  }

  deleteProduct(id:number):void{
    this.dialog.open(CategoryDeleteDialogComponent,{
      width: '20%', data: id
    }).afterClosed().subscribe(
      val => {
        if(val === 'delete'){
          this.getAllCategories();
        }
      }
    )
  }
}
