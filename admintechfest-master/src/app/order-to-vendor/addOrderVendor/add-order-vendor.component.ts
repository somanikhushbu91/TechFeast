import { Component, OnInit } from '@angular/core';
import { OrderToVendorService } from '../order-to-vendor.service';
import { Router } from '@angular/router';
import { orderToVendor } from '../orderToVendor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VendorService } from 'src/app/vendor/vendor.service';

@Component({
  selector: 'app-add-order-vendor',
  templateUrl: './add-order-vendor.component.html',
  styleUrls: ['./add-order-vendor.component.css']
})
export class AddOrderVendorComponent implements OnInit {

  constructor(private _ordervendor:OrderToVendorService,private _router:Router,private _vendor:VendorService) { }
  addOrderVendorForm:FormGroup;
  vendorNameArr:[]=[];
  isdeliveredArr:string[]=[
    'Delivered','Not Delivered'];

  ngOnInit() {
    this.addOrderVendorForm=new FormGroup({
      order_name:new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z ]*'),Validators.minLength(3)]),
      qty:new FormControl(null,[Validators.required,Validators.maxLength(6),Validators.pattern('[0-9]*gm')]),
      date:new FormControl(null,[Validators.required]),
      special_instruction:new FormControl(null,[Validators.required,Validators.minLength(3)]),
      fk_vendor_id:new FormControl(null),
      amount:new FormControl(null,[Validators.required,Validators.maxLength(5),Validators.pattern('[0-9]*')]),
      price:new FormControl(null,[Validators.required,Validators.maxLength(4),Validators.pattern('[0-9]*')]),
      is_delivered:new FormControl(null)
    });
    this._vendor.getAllData().subscribe(
      (data:any)=>{
        console.log(data)
        this.vendorNameArr=data;
      }
    );
  }
  onAddRecord(){
    this._ordervendor.addData(this.addOrderVendorForm.value).subscribe(
      (data:orderToVendor[])=>{
        console.log(data);
        alert("Data is added");
        this._router.navigate(['/nav/ordertovendor']);
      }
    );
  }

  onBackToPage(){
    this._router.navigate(['/nav/ordertovendor']);
  }
}
