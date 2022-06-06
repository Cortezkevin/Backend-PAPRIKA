import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierDeleteDialogComponent } from '../dialog/supplier-dialog/supplier-delete-dialog.component';
import { SupplierDialogComponent } from '../dialog/supplier-dialog/supplier-dialog.component';
import { Supplier } from '../models/supplier';
import { AuthService } from '../service/auth.service';
import { SupplierService } from '../service/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  isAdmin = false;
  displayedColumns: string[] = ['id', 'name', 'address','phone','state','action'];

  dataSource!: MatTableDataSource<Supplier>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private supplierService: SupplierService,    
    public authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllSuppliers();
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

  getAllSuppliers(): void{
    this.supplierService.lista().subscribe({
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
    this.dialog.open(SupplierDialogComponent,{
      width: '30%'
    }).afterClosed().subscribe( 
      val => {
        if(val === 'save'){
          this.getAllSuppliers();
        }
      }
    )
  }

  editSupplier(row:any):void{
    this.dialog.open(SupplierDialogComponent,{
      width: '40%', data: row
    }).afterClosed().subscribe( 
      val => {
        if(val === 'update'){
          this.getAllSuppliers();
        }
      }
    )
  }

  deleteSupplier(id:number):void{
    this.dialog.open(SupplierDeleteDialogComponent,{
      width: '15%', data: id
    }).afterClosed().subscribe(
      val => {
        if(val === 'delete'){
          this.getAllSuppliers();
        }
      }
    )
  }
}
