import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from '../userdata.service';
import { Userdata } from '../userdata';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  constructor(private _act_router:ActivatedRoute,private _user:UserdataService,private _router:Router) { }
  email_id:string;
  updateuserform:FormGroup;

  ngOnInit() {
    this.email_id=this._act_router.snapshot.params["email_id"];

    this.updateuserform=new FormGroup({
      email_id:new FormControl(null),
      password: new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(15)]),
      name:new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z ]*'),Validators.minLength(3)]),
      mobile_no:new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]),
      dob:new FormControl(null),
      address:new FormControl(null,[Validators.required,Validators.minLength(3)]),
      salary:new FormControl(null,[Validators.required,Validators.maxLength(5),Validators.pattern('[0-9]*')]),
      joining_date:new FormControl(null),
      employee_type:new FormControl(null)
    })

    this._user.getuserByid(this.email_id).subscribe(
      (data:Userdata[])=>{
        console.log(data);
       this.formDataBind(data[0]);
      }
    );
  }

  formDataBind(item:Userdata){
    this.updateuserform.patchValue({
      email_id:item.email_id,
      password:item.password,
      name:item.name,
      mobile_no:item.mobile_no,
      dob:item.dob,
      address:item.address,
      salary:item.salary,
      joining_date:item.joining_date,
      employee_type:item.employee_type
    });
  }

  onEmployeeUpdate()
  {
    this._user.updateData(this.updateuserform.value).subscribe(
      (data:any[])=>{
        console.log(data);
        this._router.navigate(['/nav']);
      }
    );
  }

  onBackToPage(){
    this._router.navigate(['/nav']);
}
}
