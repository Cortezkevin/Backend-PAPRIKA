import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductoService } from 'src/app/service/producto.service';
import { ProductDeleteDialogComponent } from '../product-dialog/product-delete-dialog.component';

@Component({
  selector: 'app-category-delete-dialog',
  templateUrl: './category-delete-dialog.component.html',
  styleUrls: ['./category-delete-dialog.component.scss']
})
export class CategoryDeleteDialogComponent implements OnInit {

  username: string = "";

  constructor(
    public authService: AuthService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CategoryDeleteDialogComponent>,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public id: number) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteCategory(): void {

    if (this.id) {
      this.categoryService.delete(this.id).subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success Message", summary: "Categoria Eliminada Correctamente", duration: 4000 });
          this.dialogRef.close('delete');
        },
        error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error al Eliminar la Categoria", duration: 4000 })
        }
      });
    }
  }
}
