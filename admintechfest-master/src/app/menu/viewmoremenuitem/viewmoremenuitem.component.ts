import { Component, OnInit, Inject } from '@angular/core';
import { menuData } from '../menu';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewmoremenuitem',
  templateUrl: './viewmoremenuitem.component.html',
  styleUrls: ['./viewmoremenuitem.component.css']
})
export class ViewmoremenuitemComponent implements OnInit {
  name:string;
  discription:string;
  price:number;
  is_jain:string;
  is_available:string;
  ingredients:string;
  cat_name:string;
  constructor(public diaplogref:MatDialogRef<ViewmoremenuitemComponent>,
    @Inject(MAT_DIALOG_DATA)public data:menuData,private _router:Router) { }

  ngOnInit() {
    this.name=this.data.name;
    this.discription=this.data.discription;
    this.price=this.data.price;
    this.is_jain=this.data.is_jain;
    this.is_available=this.data.is_available;
    this.ingredients=this.data.ingredients;
    this.cat_name=this.data.cat_name;
  }



}
