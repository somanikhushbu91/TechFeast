import { Component, OnInit, ViewChild } from '@angular/core';
import { Cart } from '../cart/cart';
import { cartDetail } from '../cart/cartDetail';
import { CartDataService } from '../cart/cart-data.service';
import { addToCart } from './checkout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackDataService } from './feedback-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild("closeFeedback") closeFeedback;
  cart: Cart = JSON.parse(localStorage.getItem('cart'));
  arrcartItem: cartDetail[] = [];
  GrandTotal: number = 0;
  table_no: string = "";
  tablearr: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  payment: string[] = ['cash', 'card', 'other'];
  specialInstruction: string;
  payment_type: string = "";
  Gst: number = 0;
  finalAmount: number = 0;

  feedbackFrom: FormGroup;
  constructor(private _cartservice: CartDataService, private _feedbackservice: FeedbackDataService, private _router: Router) { }
  ngOnInit() {
    console.log(this.cart);
    if (this.cart != null) {
      if (this.cart.CartItems.length >= 0) {
        this.arrcartItem = this.cart.CartItems;
      }
      this.GrandTotal = this.cart.GrandTotal;
      this.Gst = (this.GrandTotal * 0.05);
      this.finalAmount = this.GrandTotal + this.Gst;
    }

    this.feedbackFrom = new FormGroup({
      Name: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z ]*'), Validators.minLength(3)]),
      Mobile_no: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10)]),
      feedback: new FormControl(null, [Validators.required])
    })
  }

  onPlaceOrder() {
    let order_date = new Date();
    let order_month = order_date.getMonth() + 1;
    if (order_month>12){
      order_month=(order_month%12);
    }
    let datestr = order_date.getFullYear() + "-" + order_month + "-" + order_date.getDate();
    let orderObj = {
      order_amt: this.finalAmount,
      payment_type: this.payment_type,
      is_paid: "No",
      discount: "0",
      table_no: this.table_no,
      status: "Order",
      date: datestr,
      fk_email_id: "pranav10@gmail.com"
    }

    let splInst = this.specialInstruction;
    let fk_orderid = 0;
    console.log(this.table_no)
    if (this.table_no == "") {
      console.log(this.table_no);
      alert("please select the Table No");
    }
    else if (this.payment_type == "") {
      alert("plese select the Payment Type");
    }
    else {
      this._cartservice.orderAdd(orderObj).subscribe(
        (x: any) => {
          console.log(x);
          fk_orderid = x.insertId;
          console.log(fk_orderid)
          localStorage.setItem('order_id',JSON.stringify(fk_orderid));
        },
        (err) => { }
        , () => {
          let obj = new addToCart(this.arrcartItem, splInst, fk_orderid);
          console.log(obj)
          this._cartservice.orderdetailAdd(obj).subscribe(

            (y: any[]) => {
              console.log(y);
              alert("Data added Successfully");
              if (this.payment_type == "card") {
                console.log("card");
                console.log(this.payment_type);
                this._router.navigate(['/payment',this.table_no,this.payment_type]);
              }
              else {
                localStorage.removeItem("cart");
                this._router.navigate(['/']);
              }
            });
          // localStorage.removeItem("cart");
        }
      );
    }

  }



  // show(){
  //   document.getElementById('checkout-login').style.display = 'block';
  // }

  // hide(){
  //   document.getElementById('checkout-login').style.display ='none';
  // }

  onCustomerData(f) {
    console.log(f.value);
    this._feedbackservice.addFeedBack(f.value).subscribe(
      (data: any[]) => {
        console.log(data);
        this.closeFeedback.nativeElement.click();
      }
    )
  }

}
