import { OnInit, Component } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addvendor',
  templateUrl: './addvendor.component.html',
  styleUrls: ['./addvendor.component.css']
})
export class AddvendorComponent implements OnInit {

  constructor(private _vendor:VendorService,private _router:Router) { }
  addvendorform:FormGroup;
//selectedFile:File=null;
selected:string;
  ngOnInit() {
    this.addvendorform=new FormGroup({
      vendor_id:new FormControl(null),
      vendor_name:new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z ]*'),Validators.minLength(3)]),
      vendor_email:new FormControl(null,[Validators.required,Validators.email]),
      mobile_no:new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]),
      password:new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(15)])
    })
  }
  onVendorAdd()
  {
    this._vendor.addData(this.addvendorform.value).subscribe(
      (data:any[])=>{
        alert("Data properly added");
        this._router.navigate(['/nav/vendor']);
      }
    );
 }

 onBackToPage(){
  this._router.navigate(['/nav/vendor']);
  }
//  onChange(f){
//   this.selectedFile=<File>f.target.files[0];
// }
}
