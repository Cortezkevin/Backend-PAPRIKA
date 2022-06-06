import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { ProductDeleteDialogComponent } from '../dialog/product-dialog/product-delete-dialog.component';
import { ProductDialogComponent } from '../dialog/product-dialog/product-dialog.component';
import { Producto } from '../models/producto';
import { AuthService } from '../service/auth.service';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isAdmin = false;
    
  displayedColumns: string[] = ['id','url_image', 'name', 'mark', 'description','category','supplier','expiration_date','price','stock','state','action'];

  dataSource!: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private toast: NgToastService,
    private authService: AuthService,
    private productService: ProductoService) { }

  ngOnInit(): void {
    this.getAllProducts();

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

  openDialog():void {
    this.dialog.open(ProductDialogComponent,{
      width: '40%'
    }).afterClosed().subscribe( 
      val => {
        if(val === 'save'){
          this.getAllProducts();
        }
      }
    )
  }

  getAllProducts():void{
    this.productService.lista().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {

      }
    });
  }

  editProduct(row: any): void{
    this.dialog.open(ProductDialogComponent,{
      width: '40%', data: row
    }).afterClosed().subscribe(
      val => {
        if(val === 'update'){
          this.getAllProducts();
        }
      }
    )
  }

  deleteProduct(id:number):void{
    this.dialog.open(ProductDeleteDialogComponent,{
      width: '20%', data: id
    }).afterClosed().subscribe(
      val => {
        if(val === 'delete'){
          this.getAllProducts();
        }
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
