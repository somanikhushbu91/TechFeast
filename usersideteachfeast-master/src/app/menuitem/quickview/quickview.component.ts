import { Component, OnInit, Inject } from '@angular/core';
import { menuData } from '../menuitem';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.css']
})
export class QuickviewComponent implements OnInit {
  name:string;
  discription:string;
  price:number;
  is_jain:string;
  is_available:string;
  ingredients:string;
  cat_name:string;
  pic:string;
  constructor(public dialogref:MatDialogRef<QuickviewComponent>,
    @Inject(MAT_DIALOG_DATA)public data:menuData) { }

  ngOnInit() {
    this.name=this.data.name;
    this.discription=this.data.discription;
    this.price=this.data.price;
    this.is_jain=this.data.is_jain;
    this.is_available=this.data.is_available;
    this.ingredients=this.data.ingredients;
    this.cat_name=this.data.cat_name;
    this.pic=this.data.pic;
    console.log(this.pic);
  }
}
