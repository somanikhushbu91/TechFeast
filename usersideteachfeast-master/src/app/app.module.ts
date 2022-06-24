import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuitemComponent } from './menuitem/menuitem.component';
import { CartComponent } from './cart/cart.component';
import { arr_routing } from './app.routing';
import { ListviewComponent } from './menuitem/listview/listview.component';
import { MinicartComponent } from './minicart/minicart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { QuickviewComponent } from './menuitem/quickview/quickview.component';
import {MatDividerModule} from '@angular/material/divider';
import { AboutusComponent } from './aboutus/aboutus.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { HomepageComponent } from './homepage/homepage.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { PaymentpageComponent } from './paymentpage/paymentpage.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { DeephomepagesliderComponent } from './deephomepageslider/deephomepageslider.component';
import { MatCardModule } from '@angular/material/card';
import { ChatboatComponent } from './chatboat/chatboat.component';
import { ChatboatDataService } from './chatboat/chatboat-data.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuitemComponent,
    CartComponent,
    ListviewComponent,
    MinicartComponent,
    CheckoutComponent,
    QuickviewComponent,
    AboutusComponent,
    HomepageComponent,
    PaymentpageComponent,
    DeephomepagesliderComponent,
    ChatboatComponent,
  ],
  imports: [
    arr_routing,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatDialogModule,
    YouTubePlayerModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  entryComponents:[
    MinicartComponent,
    QuickviewComponent,
    NoopAnimationsModule,
    MatDividerModule,
    ChatboatComponent
  ],
  providers: [ChatboatDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
