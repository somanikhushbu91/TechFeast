import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { stockData } from '../stock';
import { VendorService } from 'src/app/vendor/vendor.service';

@Component({
  selector: 'app-addstock',
  templateUrl: './addstock.component.html',
  styleUrls: ['./addstock.component.css']
})
export class AddstockComponent implements OnInit {

  constructor( private _stockdata:StockService,private _router:Router,private _vendor:VendorService) { }
addStockForm:FormGroup;
vendorNameArr:[]=[];

ngOnInit() {
  this.addStockForm=new FormGroup({
    title:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.pattern('[A-Za-z ]*')]),
    stockQty:new FormControl(null,[Validators.required,Validators.maxLength(6),Validators.pattern('[0-9]*')]),
    price:new FormControl(null,[Validators.required,Validators.maxLength(5),Validators.pattern('[0-9]*')]),
    date:new FormControl(null,[Validators.required]),
    fk_vendor_id:new FormControl(null)
  });
  this._vendor.getAllData().subscribe(
    (data:any)=>{
      this.vendorNameArr=data;
      console.log(this.vendorNameArr)
    }
  );
}
onAddRecord(){
  this._stockdata.addData(this.addStockForm.value).subscribe(
    (data:stockData[])=>{
      console.log(data);
      alert("Data is added");
      this._router.navigate(['/nav/stock']);
    }
  );
}

onBackToPage(){
  this._router.navigate(['/nav/stock']);
}
}
