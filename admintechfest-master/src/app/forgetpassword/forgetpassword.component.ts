import { Component, OnInit } from '@angular/core';
import { ForgetpassmailService } from './forgetpassmail.service';
import { Userdata } from '../user/userdata';
import { Sendemail } from '../admin-home/sendemailHome';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  constructor(public _mail:ForgetpassmailService,public _send:Router) { }
  EmpID:string="";
  EmpPASSWORD:string;
  onforgetpassForm:FormGroup;
  subject1:string = "TECHFEAST FORGOT PASSWORD";
  ngOnInit() {
    this.onforgetpassForm=new FormGroup({
      email_id:new FormControl(null,[Validators.required,Validators.email]),
    });
  }

  onForgotPassword() {
if((this.onforgetpassForm.get('email_id').value)==null)
{
  alert('Please Enter Email ID');
}
else{
      let a = this.onforgetpassForm.get('email_id').value;
    console.log("hello ",a);
    this._mail.getDataById(a).subscribe((data:Userdata[]) => {
      console.log(data[0].password);
      this._mail.sendMail(new Sendemail(this.onforgetpassForm.get('email_id').value,this.subject1 ," Your password is: " + data[0].password )).subscribe((data:Sendemail) => {
        console.log("mail sent");
        this._send.navigate(['/']);
      });
    });
  }
  }
  // onForgotPassword(){
  //   this._ser.ForgotPassword(this.EmpID).subscribe(
  //     (data:Userdata[])=>{
  //       if(data.length>0)
  //       {
  //         this.EmpPASSWORD = data[0].password;

  //         this._ser.generatemail(new Sendemail(this.EmpID,this.subject1,"your password is: "+ this.EmpPASSWORD)).subscribe(
  //           (data:Sendemail)=>{
  //           }
  //         )
  //         alert('password will send on your account');
  //         this._send.navigate(['/nav']);
  //       }
  //       else
  //       {
  //         alert('Email Id is not correct')
  //       }
  //     }
  //   )
  // }
}
