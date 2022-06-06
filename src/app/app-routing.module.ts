import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './auth/change-password.component';
import { LoginComponent } from './auth/login.component';
import { CategoryComponent } from './category/category.component';
import { ProdGuardService } from './guards/prod-guard.service';
import { IndexComponent } from './index/index.component';
import { ProductComponent } from './product/product.component';
import { SupplierComponent } from './supplier/supplier.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'index', component: IndexComponent},
  {path: 'login', component: LoginComponent, canActivate:[ProdGuardService], redirectTo: ''},
  {path: 'changePassword', component: ChangePasswordComponent},
  {path: 'user', component: UserComponent},
  {path: 'product', component: ProductComponent},  
  {path: 'category', component: CategoryComponent},
  {path: 'supplier', component: SupplierComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
