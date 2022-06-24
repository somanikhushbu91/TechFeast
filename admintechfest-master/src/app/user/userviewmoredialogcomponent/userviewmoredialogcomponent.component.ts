import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Userdata } from '../userdata';


@Component({
  selector: 'app-userviewmoredialogcomponent',
  templateUrl: './userviewmoredialogcomponent.component.html',
  styleUrls: ['./userviewmoredialogcomponent.component.css']
})
export class UserviewmoredialogcomponentComponent implements OnInit {
  email_id:String;
  password:String;
  name:String;
  mobile_no:number;
  dob:Date;
  address:String;
  salary:number;
  joining_date:Date;
  employee_type:string;
  constructor(public diaplogref:MatDialogRef<UserviewmoredialogcomponentComponent>,
    @Inject(MAT_DIALOG_DATA)public data:Userdata) { }

  ngOnInit() {
    this.email_id=this.data.email_id;
    this.name=this.data.name;
    this.mobile_no=this.data.mobile_no;
    this.dob=this.data.dob;
    this.address=this.data.address;
    this.salary=this.data.salary;
    this.joining_date=this.data.joining_date;
    this.employee_type=this.data.employee_type;
  }

}

