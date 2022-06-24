import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cartData } from '../cart';

@Component({
  selector: 'app-viewmorecart',
  templateUrl: './viewmorecart.component.html',
  styleUrls: ['./viewmorecart.component.css']
})
export class ViewmorecartComponent implements OnInit {
  public qty:number;
  public date:Date;
  public table_no:number;
  public special_instruction:string;
  public status:string;
  public name:string;
  public price:number;

  constructor(public diaplogref:MatDialogRef<ViewmorecartComponent>,
    @Inject(MAT_DIALOG_DATA)public data:cartData) { }

  ngOnInit() {
    this.name=this.data.name;
    this.price=this.data.price;
    this.qty=this.data.qty;
    this.date=this.data.date;
    this.table_no=this.data.table_no;
    this.special_instruction=this.data.special_instruction;
    this.status=this.data.status;
  }

}
