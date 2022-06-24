import { Component, OnInit } from '@angular/core';
import { CharityService } from '../charitydata.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-addcharity',
  templateUrl: './addcharity.component.html',
  styleUrls: ['./addcharity.component.css']
})
export class AddcharityComponent implements OnInit {

  constructor(private _charity:CharityService,private _router:Router) { }
  addcharityform:FormGroup
  ngOnInit() {
    this.addcharityform=new FormGroup({
      charoty_id:new FormControl(null),
      charity_name:new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z ]*'),Validators.minLength(3)]),
      location:new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z ]*'),Validators.minLength(3)]),
      contact_info:new FormControl(null,[Validators.maxLength(10),Validators.pattern('[0-9]*')]),
      email_id:new FormControl(null,[Validators.required,Validators.email])
    })
  }
  onCharityAdd()
  {

    this._charity.addData(this.addcharityform.value).subscribe(
      (data:any[])=>{
        console.log(data);
        alert("Data properly added");
        this._router.navigate(['/nav/charity']);

      }
    );

  }

  onBackToPage(){
    this._router.navigate(['/nav/charity']);
  }
}
