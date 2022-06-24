import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { arr_routing } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { UserviewmoredialogcomponentComponent } from './user/userviewmoredialogcomponent/userviewmoredialogcomponent.component';
import { AddusercomponentComponent } from './user/addusercomponent/addusercomponent.component';
import { ProductdisplayComponent } from './productdisplay/productdisplay.component';
import { AddproductComponent } from './productdisplay/addproduct/addproduct.component';
import { UpdateuserComponent } from './user/updateuser/updateuser.component';
import { CategoryComponent } from './category/category.component';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { UpdatecategoryComponent } from './category/updatecategory/updatecategory.component';
import { MenuComponent } from './menu/menu.component';
import { AddmenuComponent } from './menu/addmenu/addmenu.component';
import { UpdatemenuComponent } from './menu/updatemenu/updatemenu.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewmoremenuitemComponent } from './menu/viewmoremenuitem/viewmoremenuitem.component';
import { ViewmorecartComponent } from './cart/viewmorecart/viewmorecart.component';
import { OrderComponent } from './order/order.component';
import { CharityComponent } from './charity/charity.component';
import { AddcharityComponent } from './charity/addcharity/addcharity.component';
import { UpdatecharityComponent } from './charity/updatecharity/updatecharity.component';
import { VendorComponent } from './vendor/vendor.component';
import { AddvendorComponent } from './vendor/addvendor/addvendor.component';
import { UpdatevendorComponent } from './vendor/updatevendor/updatevendor.component';
import { StockComponent } from './stock/stock.component';
import { AddstockComponent } from './stock/addstock/addstock.component';
import { OrderToVendorComponent } from './order-to-vendor/order-to-vendor.component';
import { AddOrderVendorComponent } from './order-to-vendor/addOrderVendor/add-order-vendor.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ViewmoreorderComponent } from './order/viewmoreorder/viewmoreorder.component';
import { ViewmoreorderToVendorComponent } from './order-to-vendor/viewmoreorder-to-vendor/viewmoreorder-to-vendor.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { UpdateImageComponent } from './menu/update-image/update-image.component';
import { VendormailComponent } from './order-to-vendor/vendormail/vendormail.component';
import { DialogforlogoutComponent } from './dialogforlogout/dialogforlogout.component';
import { CharitymailComponent } from './charity/charitymail/charitymail.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { FeedbackComponent } from "./feedback/feedback.component";


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    UserComponent,
    UserviewmoredialogcomponentComponent,
    AddusercomponentComponent,
    ProductdisplayComponent,
    AddproductComponent,
    UpdateuserComponent,
    CategoryComponent,
    AddcategoryComponent,
    UpdatecategoryComponent,
    MenuComponent,
    AddmenuComponent,
    UpdatemenuComponent,
    CartComponent,
    LoginComponent,
    SignupComponent,
    ViewmoremenuitemComponent,
    ViewmorecartComponent,
    OrderComponent,
    CharityComponent,
    AddcharityComponent,
    UpdatecharityComponent,
    VendorComponent,
    AddvendorComponent,
    UpdatevendorComponent,
    StockComponent,
    AddstockComponent,
    OrderToVendorComponent,
    AddOrderVendorComponent,
    PagenotfoundComponent,
    ViewmoreorderComponent,
    ViewmoreorderToVendorComponent,
    OrderDetailComponent,
    UpdateImageComponent,
    VendormailComponent,
    ForgetpasswordComponent,
    DialogforlogoutComponent,
    CharitymailComponent,
    AdminHomeComponent,
    ViewProfileComponent,
    FeedbackComponent
  ],
  imports: [
    arr_routing,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatMenuModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  entryComponents:[
    UserviewmoredialogcomponentComponent,
    ViewmoremenuitemComponent,
    ViewmorecartComponent,
    ViewmoreorderToVendorComponent,
    VendormailComponent,
    DialogforlogoutComponent,
    CharitymailComponent,
    ViewProfileComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
