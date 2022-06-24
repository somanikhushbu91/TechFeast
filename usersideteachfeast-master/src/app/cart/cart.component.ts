import { Component, OnInit } from '@angular/core';
import { cartDetail } from './cartDetail';
import { Cart } from './cart';
import { CartDataService } from './cart-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _cartservice:CartDataService,private _router:Router) { }
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

  onQuantityincr(item:cartDetail,txtQty:string, index:number){
    console.log(txtQty);
    let x=parseInt(txtQty);
    x+=1;
    txtQty=x+"";
    this.onQtyChange(item,txtQty,index);
  }

  onQuantitydecr(item:cartDetail,txtQty:string, index:number){
    console.log(txtQty);
    let x=parseInt(txtQty);
    if (x>1){
      x-=1;
      txtQty=x+"";
      this.onQtyChange(item,txtQty,index);
    }
  }


  onQtyChange(item:cartDetail,txtQty:string, index:number){
    item.Quantity = +txtQty;
    console.log(txtQty);
    item.SubTotal = this._cartservice.doSubTotal(item.menuItem.price,item.Quantity);

    this.cart.CartItems[index]=item;
    this.cart.GrandTotal=this._cartservice.doGrandTotal(this.cart.CartItems);
    this.GrandTotal = this.cart.GrandTotal;
    localStorage.setItem('cart',JSON.stringify(this.cart));
  }

  onProceedTOCheckOut(){
    console.log(this.cart);
    // let orderObj={
    //   order_amt:this.cart.GrandTotal,
    //   payment_type:"cash",
    //   is_paid:"yes",
    //   discount:"10",
    //   table_no:"1",
    //   status:"order",
    //   date:"05-12-2010",
    //   fk_email_id:"tirthak41299@gmail.com"
    // }

    // let order_detail_obj={
    //   fk_menu_id:this.cart.CartItems[0].menuItem.menu_id,
    //   qty:this.cart.CartItems[0].Quantity,
    //   special_instruction:'Urgent',
    //   fk_order_id:2
    // }
    // this._cartservice.orderAdd(orderObj).subscribe(
    //   (x:any[])=>{
    //     alert("Data Added");
    //     this._cartservice.orderdetailAdd(order_detail_obj).subscribe(
    //       (y:any[])=>{
    //         alert("Data added Successfully");
    //       }
    //     );
    //   }
    // );
    if (this.arrcartItem.length==0){
      alert("please add the item in the cart");
      this._router.navigate(['/shop']);
    }
    else{
      this._router.navigate(['/checkout']);
    }
  }
}
