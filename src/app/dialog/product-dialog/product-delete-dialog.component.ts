import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.scss']
})
export class ProductDeleteDialogComponent implements OnInit {

  username:string = "";

  constructor(
    public authService: AuthService,
    private productoService: ProductoService,
    private dialogRef: MatDialogRef<ProductDeleteDialogComponent>,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteProduct(): void{
    if(this.id){
      this.productoService.delete(this.id).subscribe({
        next: (res) =>{
          this.toast.success({detail: "Success Message", summary: "Producto Eliminado Correctamente", duration: 4000}); 
          this.dialogRef.close('delete');
        },
        error: () =>{
          this.toast.error({detail: "Error Message", summary: "Error al Eliminar el Producto", duration: 4000})
        } 
      });
    }
  }
}
