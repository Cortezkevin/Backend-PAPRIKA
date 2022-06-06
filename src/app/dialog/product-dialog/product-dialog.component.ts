import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Producto } from 'src/app/models/producto';
import { CategoryService } from 'src/app/service/category.service';
import { ProductoService } from 'src/app/service/producto.service';
import { SupplierService } from 'src/app/service/supplier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  categories: string[] = [];
  suppliers: string[] = [];
  productForm!: FormGroup;

  actionBtn: string = "Save";

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductoService,
    public categoryService: CategoryService,
    public supplierService: SupplierService,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Producto) { }

  ngOnInit(): void {

    //this.formatDate("10/12/12T1146ASDSA");
    if (this.categories.length == 0) {
      this.setCategories();
      console.log(this.categories);
    } if (this.suppliers.length == 0) {
      this.setSuppliers();
    }

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      mark: ['', Validators.required],
      description: ['', Validators.required],
      expiration_date: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      state: ['', Validators.required],
      url_image: ['', Validators.required],
      category: ['', Validators.required],
      supplier: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = "Update"
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['mark'].setValue(this.editData.mark);
      this.productForm.controls['description'].setValue(this.editData.description);
      this.productForm.controls['expiration_date'].setValue(this.editData.expiration_date);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['stock'].setValue(this.editData.stock);
      this.productForm.controls['state'].setValue(this.editData.state);
      this.productForm.controls['url_image'].setValue(this.editData.url_image);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['supplier'].setValue(this.editData.supplier);
    }
  }

  setCategories(): void {
    //let listCategories: string[] = [];
    this.categoryService.lista().subscribe(
      data => {
        data.forEach(
          category => this.categories.push(category.name)
        )
      },
      err => {
        console.log("Error al traer la data de categorias")
      }
    )
  }

  setSuppliers(): void {
    this.supplierService.lista().subscribe(
      data => {
        data.forEach(
          supplier => this.suppliers.push(supplier.name)
        )
      },
      err => {
        console.log("Error al traer la data de proveedores")
      }
    )
  }

  addProduct(): void {
    if (!this.editData) {
      if (this.productForm.valid) {
        const data = this.productForm.value;
        this.productService.save(data).subscribe({
          next: (res) => {
            this.toast.success({ detail: "Success Message", summary: "Producto Registrado Correctamente", duration: 4000 });
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            this.toast.error({ detail: "Error Message", summary: "Error al Registrar el Producto", duration: 4000 })
          }
        });
      } else {
        this.toast.warning({ detail: "Warning Message", summary: "La información ingresada no es válida", duration: 4000 });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct(): void {
    if (this.productForm.valid) {
      const data = this.productForm.value;
      const dataProduct = new Producto(this.editData.id_product, data.category, data.supplier, data.name, data.mark, data.description,
        data.url_image, data.expiration_date, data.price, data.stock, data.state);

      this.productService.save(dataProduct).subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success Message", summary: "Producto Actualizado Correctamente", duration: 4000 });
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error al Actualizar el Producto", duration: 4000 })
        }
      });
    }else{
      this.toast.warning({ detail: "Warning Message", summary: "La información ingresada no es válida", duration: 4000 });
    }
  }

  /*formatDate(date:string): string | undefined{
    let result = date.split("T").shift();
    console.log("DATA DATE: ",result)
    return result;
  }*/
}
