import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Supplier } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-supplier-dialog',
  templateUrl: './supplier-dialog.component.html',
  styleUrls: ['./supplier-dialog.component.scss']
})
export class SupplierDialogComponent implements OnInit {

  supplierForm!: FormGroup;
  actionBtn : string = "Save";
  actionTitle : string = "Add New Supplier"

  constructor(
    private formBuilder: FormBuilder,
    public supplierService: SupplierService,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<SupplierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Supplier) { }

  ngOnInit(): void {
    this.supplierForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: [''],
      state: ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update"
      this.actionTitle = "Update Supplier"
      this.supplierForm.controls['name'].setValue(this.editData.name);
      this.supplierForm.controls['address'].setValue(this.editData.address);
      this.supplierForm.controls['phone'].setValue(this.editData.phone);
      this.supplierForm.controls['state'].setValue(this.editData.state);    
    }
  }

  addSupplier():void{
    if(!this.editData){
      if(this.supplierForm.valid){
        const data = this.supplierForm.value;
        this.supplierService.save(data).subscribe({
          next: (res) => {
            this.toast.success({detail: "Success Message", summary: "Proveedor Registrado Correctamente", duration: 4000});
            this.supplierForm.reset();
            this.dialogRef.close('save');
          },
          error:() => {
            this.toast.error({detail: "Error Message", summary: "Error al Registrar el Proveedor", duration: 4000})
          }
        });
      }
    }else{
      this.updateSupplier();
    }
  }

  updateSupplier():void {
    const data = this.supplierForm.value;
    const dataProduct = new Supplier(this.editData.id_supplier!,data.name, data.description,
    data.url_image, data.state); 
    
    this.supplierService.save(dataProduct).subscribe({
      next: (res) => {
        this.toast.success({detail: "Success Message", summary: "Proveedor Actualizado Correctamente", duration: 4000});
        this.supplierForm.reset();
        this.dialogRef.close('update');
      },
      error:() => {
        this.toast.error({detail: "Error Message", summary: "Error al Actualizar el Proveedor", duration: 4000})
      }
    });
  }

}
