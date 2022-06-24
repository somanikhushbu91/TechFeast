import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { orderToVendor } from '../orderToVendor';
import { FormGroup, FormControl } from '@angular/forms';
import { VendormailService } from './vendormail.service';
import { maildata } from './vendormail';

@Component({
  selector: 'app-vendormail',
  templateUrl: './vendormail.component.html',
  styleUrls: ['./vendormail.component.css']
})
export class VendormailComponent implements OnInit {
  mailVendorForm:FormGroup;

  constructor(public diaplogref:MatDialogRef<VendormailComponent>,private _mail:VendormailService,
    @Inject(MAT_DIALOG_DATA)public data:orderToVendor ) { }

  ngOnInit() {
  console.log(this.data);
  this.mailVendorForm=new FormGroup({
    email_id:new FormControl(this.data.vendor_email),
    subject:new FormControl(null),
    message:new FormControl(this.data.order_name +":- "+this.data.qty+"kg")
  });
  }

  onMailVendor(f){

    console.log(f.value);
    this._mail.generatemail(f.value).subscribe(
      (data:maildata[])=>{
        alert("mail is sended successfully");
      }
    )
  }
}
