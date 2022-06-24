import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from '../userdata.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Userdata } from '../userdata';

@Component({
  selector: 'app-addusercomponent',
  templateUrl: './addusercomponent.component.html',
  styleUrls: ['./addusercomponent.component.css']
})
export class AddusercomponentComponent implements OnInit {

  constructor(private _employee:UserdataService,private _router:Router) { }
  adduserform:FormGroup;
  ngOnInit() {
    this.adduserform=new FormGroup({
      email_id:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.maxLength(15),Validators.minLength(8),Validators.required]),
      name:new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z ]*'),Validators.minLength(3)]),
      mobile_no:new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]),
      dob:new FormControl(null),
      address:new FormControl(null,[Validators.required,Validators.minLength(3)]),
      salary:new FormControl(null,[Validators.required,Validators.maxLength(5),Validators.pattern('[0-9]*')]),
      joining_date:new FormControl(null,[Validators.required]),
      employee_type:new FormControl('Admin')
    });
  }

  onEmployeeAdd(){
    this._employee.addData(this.adduserform.value).subscribe(
      (data:Userdata[])=>{
        alert("Data is added");
        this._router.navigate(['/nav']);
      }
    );
  }

  onBackToPage(){
      this._router.navigate(['/nav']);
  }

}
