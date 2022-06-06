import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-supplier-delete-dialog',
  templateUrl: './supplier-delete-dialog.component.html',
  styleUrls: ['./supplier-delete-dialog.component.scss']
})
export class SupplierDeleteDialogComponent implements OnInit {

  username: string = "";

  constructor(
    public authService: AuthService,
    private supplierService: SupplierService,
    private dialogRef: MatDialogRef<SupplierDeleteDialogComponent>,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public id: number) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteCategory(): void {

    if (this.id) {
      this.supplierService.delete(this.id).subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success Message", summary: "Proveedor Eliminado Correctamente", duration: 4000 });
          this.dialogRef.close('delete');
        },
        error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error al Eliminar el Proveedor", duration: 4000 })
        }
      });
    }
  }
}
