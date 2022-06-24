import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { vendorData } from '../vendor';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-updatevendor',
  templateUrl: './updatevendor.component.html',
  styleUrls: ['./updatevendor.component.css']
})
export class UpdatevendorComponent implements OnInit {

  constructor(private _act_router:ActivatedRoute,private _router:Router,private _vendor:VendorService) { }
  vendor_id:number;
  updatevendorform:FormGroup;

  ngOnInit() {
    this.vendor_id=this._act_router.snapshot.params["vendor_id"];
    this.updatevendorform=new FormGroup({
      vendor_id:new FormControl(null),
      vendor_name:new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z ]*'),Validators.minLength(3)]),
      vendor_email:new FormControl(null,[Validators.required,Validators.email]),
      mobile_no:new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]),
      password:new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(15)])
    });

    this._vendor.getDataById(this.vendor_id).subscribe(
      (data:vendorData[])=>{
        this.formDataBind(data[0]);
      }
    );
  }

  formDataBind(item:vendorData){
    this.updatevendorform.patchValue({
      vendor_id:item.vendor_id,
      vendor_name:item.vendor_name,
      vendor_email:item.vendor_email,
      mobile_no:item.mobile_no,
      password:item.password
    });
  }


  onVendorUpdate(){
  this._vendor.updateData(this.updatevendorform.value).subscribe(
    (data:vendorData[])=>{
      alert("record is updated successfully")
      this._router.navigate(['/nav/vendor']);
    }
  );
}

onBackToPage(){
  this._router.navigate(['/nav/vendor']);
  }
}
