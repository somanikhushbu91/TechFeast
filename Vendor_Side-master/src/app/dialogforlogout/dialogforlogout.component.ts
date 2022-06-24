import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogforlogout',
  templateUrl: './dialogforlogout.component.html',
  styleUrls: ['./dialogforlogout.component.css']
})
export class DialogforlogoutComponent implements OnInit {

  constructor(private _router:Router,public _dialogref:MatDialogRef<DialogforlogoutComponent>) { }

  ngOnInit(): void {
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
