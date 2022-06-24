import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../cart/cart';
import { cartDetail } from '../cart/cartDetail';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedbackDataService } from '../checkout/feedback-data.service';
import { NotificationService } from './notification.service';
import { PaymentDataService } from './payment-data.service';

declare let paypal: any;

@Component({
  selector: 'app-paymentpage',
  templateUrl: './paymentpage.component.html',
  styleUrls: ['./paymentpage.component.css']
})
export class PaymentpageComponent implements OnInit {

  @ViewChild("paypal") paypalele: ElementRef;

  cart: Cart = JSON.parse(localStorage.getItem('cart'));
  arrcartItem: cartDetail[] = [];
  table_no: string = "";
  payment_type: string = "";
  finalAmount: number = 1;
  GrandTotal: number = 0;
  Gst: number = 0;
  disableBtn: boolean = false;


  constructor(private notificationService: NotificationService,private _act_router: ActivatedRoute,private _feedbackservice: FeedbackDataService,private _payment:PaymentDataService) { }
  feedbackFrom: FormGroup;

  ngOnInit(): void {
    this.table_no = this._act_router.snapshot.params["table_no"];
    this.payment_type = this._act_router.snapshot.params["payment_type"];
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

  product = {
    price: this.finalAmount,
    description: "Thank You For Coming At Esplandido",
    img: "assests/menu/logo/1.png",
  };

  padiFor = false;
  ngAfterViewInit() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  //currency_code: "USD",
                  value: this.finalAmount,
                },
              },
            ],
            application_context:{
              shipping_preference:'NO_SHIPPING'
            }
          });
        },
        onApprove: async (data, actions) => {
          let order_id=localStorage.getItem('order_id');
          console.log(order_id);
          this._payment.updateStatus(order_id).subscribe(
            (data:any)=>{
              console.log(data);
              alert("payment Done successfully");
          });
          const order = await actions.order.capture();
          this.padiFor = true;
          this.disableBtn=false;
          console.log(order);
        },
        onError: (err) => {
          this.notificationService.success('Something went wrong! Payment Declined.');
          console.log(err);
        },
      })
      .render(this.paypalele.nativeElement);
  }


  onCustomerData(f) {
    console.log(f.value);
    this._feedbackservice.addFeedBack(f.value).subscribe(
      (data: any[]) => {
        console.log(data);
      }
    )
  }


}
