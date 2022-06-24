import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { charity } from '../charity';
import { FormGroup, FormControl } from '@angular/forms';
import { CharitymailDataService } from './charitymail-data.service';
import { charitymaildata } from './charitymail';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-charitymail',
  templateUrl: './charitymail.component.html',
  styleUrls: ['./charitymail.component.css']
})
export class CharitymailComponent implements OnInit {
  email_id:string;
  mailcharityForm:FormGroup;

  //constructor(private _mail:CharitymailDataService,public data:charity,private _router:Router){}
  constructor(public diaplogref:MatDialogRef<CharitymailComponent>,private _mail:CharitymailDataService,
   @Inject(MAT_DIALOG_DATA)public data:charity,private _router:Router) { }

  ngOnInit() {


    console.log(this.data);
    this.mailcharityForm=new FormGroup({
      //email_id:new FormControl(null),
      email_id:new FormControl(this.data.email_id),
      subject:new FormControl(null),
      message:new FormControl(null)
    });
  }

  onMailcharity(f){
    console.log(f.value);
      this._mail.generatemail(f.value).subscribe(
        (data:charitymaildata[])=>{
          alert("mail is send successfully");
          this._router.navigate(['/nav']);
        }
      )
  }


}
