import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { SignupDataService } from './signup-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _signup:SignupDataService,private _router:Router) { }
  signupform:FormGroup;
  ngOnInit() {
    this.signupform=new FormGroup({
      email_id:new FormControl(null,[Validators.required,Validators.email]),

      password_group:new FormGroup({
        password:new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
        confirm_password:new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      },[this.passwordMatch.bind(this)]),

      name:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.pattern('[A-Za-z]*')]),
      mobile_no:new FormControl(null,[Validators.minLength(10),Validators.maxLength(10)]),
      dob:new FormControl(null),
      address:new FormControl(null),
      salary:new FormControl('5000'),
      joining_date:new FormControl(null),
      employee_type:new FormControl('Kitchen chef')
    });
  }

  onEmployeesignup(){
    console.log(this.signupform.value);
    let empobj={
      email_id:this.signupform.value.email_id,
      password:this.signupform.value.password_group.password,
      name:this.signupform.value.name,
      mobile_no:this.signupform.value.mobile_no,
      dob:this.signupform.value.dob,
      address:this.signupform.value.address,
      salary:this.signupform.value.salary,
      joining_date:this.signupform.value.joining_date,
      employee_type:this.signupform.value.employee_type
    }
    this._signup.signupData(empobj).subscribe(
      (data:any[])=>{
        console.log(data);
        alert('signuped');
        this._router.navigate(['']);
      }
    );
  }

  passwordMatch(c: AbstractControl): { [s: string]: boolean } {
    const pass = c.get('password').value;
    const cpass = c.get('confirm_password').value;
    if (pass != cpass) {
      return { 'sarkhanathi': true };
    }
    return null;
  }

}
