import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  categoryForm!: FormGroup;
  actionBtn : string = "Save";
  actionTitle : string = "Add New Category"

  constructor(
    private formBuilder: FormBuilder,
    public categoryService: CategoryService,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Category) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      state: ['', Validators.required],
      url_image: ['', Validators.required]      
    });

    if(this.editData){
      this.actionBtn = "Update"
      this.actionTitle = "Update Category"
      this.categoryForm.controls['name'].setValue(this.editData.name);
      this.categoryForm.controls['description'].setValue(this.editData.description);
      this.categoryForm.controls['state'].setValue(this.editData.state);
      this.categoryForm.controls['url_image'].setValue(this.editData.url_image);
    }
  }

  addCategory():void{
    if(!this.editData){
      if(this.categoryForm.valid){
        const data = this.categoryForm.value;
        this.categoryService.save(data).subscribe({
          next: (res) => {
            this.toast.success({detail: "Success Message", summary: "Categoria Registrada Correctamente", duration: 4000});
            this.categoryForm.reset();
            this.dialogRef.close('save');
          },
          error:() => {
            this.toast.error({detail: "Error Message", summary: "Error al Registrar la Categoria", duration: 4000})
          }
        });
      }
    }else{
      this.updateCategory();
    }
  }

  updateCategory():void {
    const data = this.categoryForm.value;
    const dataProduct = new Category(this.editData.id_category!,data.name, data.description,
    data.url_image, data.state); 
    
    this.categoryService.save(dataProduct).subscribe({
      next: (res) => {
        this.toast.success({detail: "Success Message", summary: "Categoria Actualizada Correctamente", duration: 4000});
        this.categoryForm.reset();
        this.dialogRef.close('update');
      },
      error:() => {
        this.toast.error({detail: "Error Message", summary: "Error al Actualizar la Categoria", duration: 4000})
      }
    });
  }

}
