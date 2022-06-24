import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { pro } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  public pro_id:number;
  public pro_name:string;
  public pro_price:number;
  public pro_color:string;
  public pro_mfg:string;
  public pro_soh:number;
  public img:string;
  public selected:number;
  constructor(private _data:ProductService,private _router:Router) { }
  product_arr:pro[]=[];
  ngOnInit() {
    this._data.getAllData().subscribe(
      (data:any[])=>{
        console.log(data);
        this.product_arr=data;
      }
    );
  }
  onAddUser(){
    this._data.addData(new pro(this.pro_id,this.pro_name,this.pro_price,this.pro_color,this.pro_mfg,this.pro_soh,this.img,this.selected)).subscribe(
      (data:any)=>{
        this._router.navigate(['product']);
      }
    );
  }
}
