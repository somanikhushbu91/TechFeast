import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart/cart';
import { cartDetail } from '../cart/cartDetail';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChatboatComponent } from '../chatboat/chatboat.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  _cartservice: any;

  constructor(private _router:Router, private _dialog: MatDialog) { }
  GrandTotal:number=0;
  arrcartItem:cartDetail[]=[];
  cart:Cart=JSON.parse(localStorage.getItem('cart'));
  ngOnInit() {
    console.log(this.cart);
    if (this.cart!=null){
      if(this.cart.CartItems.length>=0){
        this.arrcartItem=this.cart.CartItems;
      }
      this.GrandTotal=this.cart.GrandTotal;
    }
  }

  onRemoveFromCart(selectedProductId,index){
    console.log(selectedProductId);
    this.GrandTotal=this._cartservice.onRemoveFromCart(selectedProductId);
    this.arrcartItem.splice(index,1);
  }

  onClick(){
    this._router.navigate(["/cart"]);
  }
  onAboutus()
  {
    this._router.navigate(['/aboutus']);
  }
  onShopPage(){
    this._router.navigate(['/shop'])
  }
  onBot(){
    this._dialog.open(ChatboatComponent);
  }
}
