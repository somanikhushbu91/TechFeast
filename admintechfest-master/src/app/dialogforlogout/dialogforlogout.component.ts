import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogforlogout',
  templateUrl: './dialogforlogout.component.html',
  styleUrls: ['./dialogforlogout.component.css']
})
export class DialogforlogoutComponent implements OnInit {

  constructor(private _router:Router,public _dialogref:MatDialogRef<DialogforlogoutComponent>) { }

  ngOnInit() {
  }

  backToLogin(){
    localStorage.clear();
    this._router.navigate(['/']);
    this._dialogref.close();
  }
  notToLogin(){
    this._dialogref.close();
  }

}
