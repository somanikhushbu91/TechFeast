import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProductdisplayComponent } from './productdisplay/productdisplay.component';
import { AddproductComponent } from './productdisplay/addproduct/addproduct.component';
import { AddusercomponentComponent } from './user/addusercomponent/addusercomponent.component';
import { UpdateuserComponent } from './user/updateuser/updateuser.component';
import { CategoryComponent } from './category/category.component';
import { AddcategoryComponent } from "./category/addcategory/addcategory.component";
import { UpdatecategoryComponent } from "./category/updatecategory/updatecategory.component";
import { MenuComponent } from "./menu/menu.component";
import { AddmenuComponent } from "./menu/addmenu/addmenu.component";
import { UpdatemenuComponent } from './menu/updatemenu/updatemenu.component';
import { UpdateImageComponent } from "./menu/update-image/update-image.component";
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrderComponent } from './order/order.component';
import { CharityComponent } from './charity/charity.component';
import { AddcharityComponent } from './charity/addcharity/addcharity.component';
import { UpdatecharityComponent } from './charity/updatecharity/updatecharity.component';
// import { CharitymailComponent } from './charity/charitymail/charitymail.component';
import { VendorComponent } from './vendor/vendor.component';
import { AddvendorComponent } from './vendor/addvendor/addvendor.component';
import { UpdatevendorComponent } from './vendor/updatevendor/updatevendor.component';
import { StockComponent } from './stock/stock.component';
import { AddstockComponent } from './stock/addstock/addstock.component';
import { OrderToVendorComponent } from "./order-to-vendor/order-to-vendor.component";
import { AddOrderVendorComponent } from './order-to-vendor/addOrderVendor/add-order-vendor.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { UserauthguardService } from './userauthguard.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ViewmoreorderComponent } from './order/viewmoreorder/viewmoreorder.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { FeedbackComponent } from "./feedback/feedback.component";

const arr: Routes = [
  { path: '', component: LoginComponent },
  { path: 'forgetpassmail', component: ForgetpasswordComponent },
  {
    path: 'nav', canActivate: [UserauthguardService], component: MainNavComponent, children: [
      { path: 'home', component: AdminHomeComponent },
      { path: '', component: UserComponent },

      { path: 'adduser', component: AddusercomponentComponent },
      { path: 'updateuser/:email_id', component: UpdateuserComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'addcategory', component: AddcategoryComponent },
      { path: 'updatecategory/:cat_id', component: UpdatecategoryComponent },
      { path: 'product', component: ProductdisplayComponent },
      { path: 'addproduct', component: AddproductComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'addmenu', component: AddmenuComponent },
      { path: 'updatemenu/:menu_id', component: UpdatemenuComponent },
      { path: 'updatemenuimage/:menu_id', component: UpdateImageComponent },
      { path: 'cart', component: CartComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'order', component: OrderComponent },
      { path: 'charity', component: CharityComponent },
      { path: 'addcharity', component: AddcharityComponent },
      // {path:'charitymail/:charity_id',component:CharitymailComponent},
      { path: 'updatecharity/:charity_id', component: UpdatecharityComponent },
      { path: 'vendor', component: VendorComponent },
      { path: 'addvendor', component: AddvendorComponent },
      { path: 'updatevendor/:vendor_id', component: UpdatevendorComponent },
      { path: 'stock', component: StockComponent },
      { path: 'addstock', component: AddstockComponent },
      { path: 'ordertovendor', component: OrderToVendorComponent },
      { path: 'orderviewmore/:order_id', component: ViewmoreorderComponent },
      { path: 'addOrderVendor', component: AddOrderVendorComponent },
      { path: 'order_detail', component: OrderDetailComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: '**', component: PagenotfoundComponent }
    ]
  },
  { path: '**', component: PagenotfoundComponent }
]

export const arr_routing = RouterModule.forRoot(arr);
