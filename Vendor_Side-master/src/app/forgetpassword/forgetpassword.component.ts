import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VendorDataService } from '../vendor-data/vendor-data.service';
import { Sendemail } from './forgetpass';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  onforgetpassForm: FormGroup;
  subject1: string = "TECHFEAST FORGOT PASSWORD";
  constructor(private _vendor: VendorDataService,private _Send:Router) { }

  ngOnInit(): void {
    this.onforgetpassForm = new FormGroup({
      vendor_email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onForgotPassword() {
    if ((this.onforgetpassForm.get('vendor_email').value) == null) {
      alert('Please Enter Email ID');
    }
    else {
      let a = this.onforgetpassForm.get('vendor_email').value;
      console.log("hello ", a);
      this._vendor.getDataById(a).subscribe(
        (data: any) => {
          console.log(data[0].password);
          this._vendor.sendMail(new Sendemail(this.onforgetpassForm.get('vendor_email').value, this.subject1, " Your password is: " + data[0].password)).subscribe(
            (data: Sendemail) => {
              console.log("mail sent");
              this._Send.navigate(['/']);
            });
        });
    }
  }

}
