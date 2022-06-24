import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { UseauthguardserviceService } from './userauthguardservice.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { VendorDataComponent } from './vendor-data/vendor-data.component';
import { UpdatePriceComponent } from './update-price/update-price.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

const arr: Routes = [
  {path:'',component:LoginComponent},
  {path:'forgetpassmail',component:ForgetpasswordComponent},
  {
    path:'nav',canActivate:[UseauthguardserviceService],component:MainNavComponent,children:[
      {path:'',component:VendorDataComponent},
      {path:'updatePrice',component:UpdatePriceComponent},
      {path:'**',component:PagenotfoundComponent}
    ]
  },
  {path:'**',component:PagenotfoundComponent}
]

export const arr_routing = RouterModule.forRoot(arr);
