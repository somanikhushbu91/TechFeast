import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogforlogout-component',
  templateUrl: './dialogforlogout-component.component.html',
  styleUrls: ['./dialogforlogout-component.component.css']
})
export class DialogforlogoutComponentComponent implements OnInit {

  constructor(private _router:Router,public _dialogref:MatDialogRef<DialogforlogoutComponentComponent>) { }

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
