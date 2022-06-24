import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart/cart';
import { cartDetail } from '../cart/cartDetail';

@Component({
  selector: 'app-minicart',
  templateUrl: './minicart.component.html',
  styleUrls: ['./minicart.component.css']
})
export class MinicartComponent implements OnInit {
  _cartservice: any;

  constructor() { }
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


}
