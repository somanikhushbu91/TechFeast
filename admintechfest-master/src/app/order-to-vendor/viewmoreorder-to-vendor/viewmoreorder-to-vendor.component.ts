import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { orderToVendor } from '../orderToVendor';

@Component({
  selector: 'app-viewmoreorder-to-vendor',
  templateUrl: './viewmoreorder-to-vendor.component.html',
  styleUrls: ['./viewmoreorder-to-vendor.component.css']
})
export class ViewmoreorderToVendorComponent implements OnInit {


  order_name:string;
  qty:number;
  date:Date;
  special_instruction:string;
  amount:number;
  price:number;
  is_delivered:string;
  vendor_name:string;
  constructor(public diaplogref:MatDialogRef<ViewmoreorderToVendorComponent>,
    @Inject(MAT_DIALOG_DATA)public data:orderToVendor) { }

  ngOnInit() {
    this.order_name=this.data.order_name;
    this.qty=this.data.qty;
    this.date=this.data.date;
    this.special_instruction=this.data.special_instruction;
    this.amount=this.data.amount;
    this.price=this.data.price;
    this.is_delivered=this.data.is_delivered;
    this.vendor_name=this.data.vendor_name;
  }

}
