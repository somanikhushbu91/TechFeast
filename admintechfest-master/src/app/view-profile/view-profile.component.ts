import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../user/userdata.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  constructor(private _userData:UserdataService) { }
  email_id:string;
  name:string;
  mobile_no:string;
  dob:any;
  joining_date:any;
  employee_type:string;
  address:string;

  ngOnInit(): void {
    this.email_id=localStorage.getItem('email_id');
    this._userData.getuserByid(this.email_id).subscribe(
      (data:any[])=>{
        console.log(data);
        this.name=data[0].name;
        this.address=data[0].address;
        this.mobile_no=data[0].mobile_no;
        this.dob=data[0].dob;
        this.joining_date=data[0].joining_date;
        this.employee_type=data[0].employee_type;
      }
    );
  }

}
