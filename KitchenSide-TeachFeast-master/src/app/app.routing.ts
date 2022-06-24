import { Routes, RouterModule } from "@angular/router";
import { KitchenDataComponentComponent } from './kitchen-data-component/kitchen-data-component.component';
import { OrderDataComponent } from './order-data/order-data.component';
import { LoginComponent } from './login/login.component';
import { UseauthguardserviceService } from './useauthguardservice.service';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

const arr: Routes = [
  {path:'',component:LoginComponent},
  {path:'forgetpassmail',component:ForgetpasswordComponent},
  {
    path:'nav',canActivate:[UseauthguardserviceService],component:MainNavComponent,children:[
      {path:'',component:KitchenDataComponentComponent},
      {path:'orderData/:order_id',component:OrderDataComponent},
      {path:'**',component:PagenotfoundComponent}
    ]
  },
  {path:'**',component:PagenotfoundComponent}
  ]


export const arr_routing = RouterModule.forRoot(arr);
