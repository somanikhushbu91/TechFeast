import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { arr_routing } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from "@angular/material/card";
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { KitchenDataComponentComponent } from './kitchen-data-component/kitchen-data-component.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from '@angular/material/menu';
import { OrderDataComponent } from './order-data/order-data.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DialogforlogoutComponentComponent } from './dialogforlogout-component/dialogforlogout-component.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    KitchenDataComponentComponent,
    MainNavComponent,
    OrderDataComponent,
    LoginComponent,
    PagenotfoundComponent,
    DialogforlogoutComponentComponent,
    ForgetpasswordComponent,
    ViewProfileComponent
  ],
  imports: [
    arr_routing,
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatMenuModule
  ],
  entryComponents:[
    DialogforlogoutComponentComponent,
    ViewProfileComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
