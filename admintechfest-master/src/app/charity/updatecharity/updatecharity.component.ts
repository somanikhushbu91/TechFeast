import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharityService } from '../charitydata.service';
import { charity } from '../charity';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-updatecharity',
  templateUrl: './updatecharity.component.html',
  styleUrls: ['./updatecharity.component.css']
})
export class UpdatecharityComponent implements OnInit {

  constructor(private _act_router:ActivatedRoute,private _router:Router,private _charity:CharityService) { }

  charity_id:number;
  updatecharityform:FormGroup;

  ngOnInit() {
    this.charity_id=this._act_router.snapshot.params["charity_id"];
    this.updatecharityform=new FormGroup({
      charity_id:new FormControl(null),
      charity_name:new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z ]*'),Validators.minLength(3)]),
      location:new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z ]*'),Validators.minLength(3)]),
      contact_info:new FormControl(null,[Validators.maxLength(10),Validators.pattern('[0-9]*')]),
      email_id:new FormControl(null,[Validators.required,Validators.email])
    });

    this._charity.getDataById(this.charity_id).subscribe(
      (data:charity[])=>{
        console.log(data);
        this.formDataBind(data[0]);
       }
      );
  }

    formDataBind(item:charity){
      this.updatecharityform.patchValue({
        charity_id:item.charity_id,
        charity_name:item.charity_name,
        location:item.location,
        contact_info:item.contact_info,
        email_id:item.email_id
      });
    }

  oncharityUpdate()
  {
      this._charity.updateData(this.updatecharityform.value).subscribe(
        (data:charity[])=>{
          console.log(data);
          alert("record updated");
          this._router.navigate(['/nav/charity']);

        }
      );
 }

 onBackToPage(){
  this._router.navigate(['/nav/charity']);
}
}
