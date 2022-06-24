import { Injectable } from '@angular/core';
import { cartDetail } from './cartDetail';
import { Cart } from './cart';
import { HttpClient } from '@angular/common/http';
import { addToCart } from '../checkout/checkout';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {

  constructor(private _http:HttpClient) { }
  url:string="http://localhost:3000/order/";
  url1:string="http://localhost:3000/orderdetails";

  onRemoveFromCart(SelectedProductID): number {
    if (localStorage.getItem('cart') != null) {
      let cart: Cart = JSON.parse(localStorage.getItem('cart')) as Cart;
      let index: number = -1;

      if (cart.CartItems.length >= 0) {
        // getting index of product
        index = cart.CartItems.map(function(x) {
          return x.menuItem.menu_id;
        }).indexOf(SelectedProductID);

        if (index != -1) {
          cart.CartItems.splice(index, 1);
          cart.GrandTotal = this.doGrandTotal(cart.CartItems);
          localStorage.setItem('cart', JSON.stringify(cart));
          return cart.GrandTotal;
        }
      }
    }
    return 0;
  }


  doSubTotal(Price, Quantity): number {
    return Price * Quantity;
  }

  doGrandTotal(cartItems: cartDetail[]): number {
    let GrandTotal: number = 0;
    if (cartItems != null) {
      if (cartItems.length >= 0) {
        for(let i = 0; i < cartItems.length; i++) {
          GrandTotal += cartItems[i].SubTotal;
        }
      }
    }
    return GrandTotal;
  }

  orderAdd(item){
    console.log(item);
    return this._http.post(this.url,item);
  }

  orderdetailAdd(item: addToCart){
    console.log(item);
    return this._http.post(this.url1,item);
  }
}

