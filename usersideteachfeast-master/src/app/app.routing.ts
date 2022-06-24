import { Routes,RouterModule } from "@angular/router";
import { MenuitemComponent } from './menuitem/menuitem.component';
import { CartComponent } from './cart/cart.component';
import { ListviewComponent } from './menuitem/listview/listview.component';
import { MinicartComponent } from './minicart/minicart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { QuickviewComponent } from './menuitem/quickview/quickview.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PaymentpageComponent } from './paymentpage/paymentpage.component';
import { ChatboatComponent } from "./chatboat/chatboat.component";
// import { VideoComponent } from './aboutus/video/video.component';


const arr:Routes = [
  {path:'shop',component:MenuitemComponent},
  {path:'listview',component:ListviewComponent},
  {path:'cart',component:CartComponent},
  {path:'minicart',component:MinicartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'quickview',component:QuickviewComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'cart',component:CartComponent},
  {path:'payment/:table_no/:payment_type',component:PaymentpageComponent},
  {path:'',component:HomepageComponent},
  // {path:'chatboat',component:ChatboatComponent}
  // {path:'video',component:VideoComponent}
]

export const arr_routing = RouterModule.forRoot(arr);
