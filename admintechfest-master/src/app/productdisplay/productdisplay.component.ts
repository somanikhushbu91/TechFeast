import { Component, OnInit } from '@angular/core';
import { pro } from './product';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productdisplay',
  templateUrl: './productdisplay.component.html',
  styleUrls: ['./productdisplay.component.css']
})
export class ProductdisplayComponent implements OnInit {

  constructor(private data:ProductService,private _router:Router) { }
  prodata:pro[]=[];
  ngOnInit() {
    this.data.getAllData().subscribe(
      (data)=>{
        this.prodata=data;
      }
    );
  }
  addData()
  {
    this._router.navigate(["addproduct"]);
  }
}
