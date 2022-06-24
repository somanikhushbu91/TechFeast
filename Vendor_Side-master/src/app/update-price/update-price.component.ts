import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VendorDataService } from '../vendor-data/vendor-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-price',
  templateUrl: './update-price.component.html',
  styleUrls: ['./update-price.component.css']
})
export class UpdatePriceComponent implements OnInit {

  amount: number;
  price: number;

  constructor(public diaplogref: MatDialogRef<UpdatePriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _vendor:VendorDataService,private _router:Router) { }

  updatepriceform: FormGroup;

  ngOnInit(): void {
    console.log(this.data);
    this.updatepriceform = new FormGroup({
      price: new FormControl(this.data.price, [Validators.required,Validators.pattern('[0-9]*')]),
      amount: new FormControl(this.data.amount, [Validators.required,Validators.pattern('[0-9]*')]),
    })
    console.log(this.amount, this.price);
  }

  onEmployeeUpdate(f){
    console.log(f);
    let obj={
      price:f.value.price,
      amount:f.value.amount
    }
    console.log(obj);
    this._vendor.updateData(this.data.ven_order_id,obj).subscribe(
      (data:any)=>{
        console.log(data);
        this._router.navigate(['/nav']);
      }
    );
  }
  onBackToPage(){
    this._router.navigate(['/nav']);
  }

}
