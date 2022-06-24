import { Component, OnInit } from '@angular/core';
import { VendorDataService } from '../vendor-data/vendor-data.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  constructor(private _vendor:VendorDataService) { }

  vendor_email:string;
  name:string;
  mobile_no:string;

  ngOnInit(): void {
    this.vendor_email=localStorage.getItem('vendor_email');
    this._vendor.getDataById(this.vendor_email).subscribe(
      (data:any[])=>{
        console.log(data);
        this.name=data[0].vendor_name;
        this.mobile_no=data[0].mobile_no;
      }
    );
  }

}
