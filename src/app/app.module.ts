import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './menu/header.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './auth/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgToastModule } from 'ng-angular-popup';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './index/index.component';
import { ProductDialogComponent } from './dialog/product-dialog/product-dialog.component';
import { interceptorProvider } from './interceptors/prod-interceptor.service';
import { ProductDeleteDialogComponent } from './dialog/product-dialog/product-delete-dialog.component';
import { SidenavComponent } from './menu/sidenav.component';
import { CategoryComponent } from './category/category.component';
import { SupplierComponent } from './supplier/supplier.component';
import { CategoryDialogComponent } from './dialog/category-dialog/category-dialog.component';
import { CategoryDeleteDialogComponent } from './dialog/category-dialog/category-delete-dialog.component'; 
import { SupplierDialogComponent } from './dialog/supplier-dialog/supplier-dialog.component';
import { SupplierDeleteDialogComponent } from './dialog/supplier-dialog/supplier-delete-dialog.component';
import { UserComponent } from './user/user.component';
import { UserDialogComponent } from './dialog/user-dialog/user-dialog.component';
import { UserDeleteDialogComponent } from './dialog/user-dialog/user-delete-dialog.component';
import { ChangePasswordComponent } from './auth/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    LoginComponent,
    IndexComponent,
    ProductDialogComponent,
    ProductDeleteDialogComponent,
    SidenavComponent,
    CategoryComponent,
    SupplierComponent,
    CategoryDialogComponent,
    CategoryDeleteDialogComponent,
    SupplierDialogComponent,
    SupplierDeleteDialogComponent,
    UserComponent,
    UserDialogComponent,
    UserDeleteDialogComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgToastModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
