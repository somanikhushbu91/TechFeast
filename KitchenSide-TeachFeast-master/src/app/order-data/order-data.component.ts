import { Component, OnInit } from '@angular/core';
import { KitchenDataServiceService } from '../kitchen-datacomponent/kitchen-data-service.service';
import { orderdata } from './order-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.css']
})
export class OrderDataComponent implements OnInit {

  order_id:number;
  order_total:number;
  order_multiple:orderdata[]=[];
  constructor(private _orderMultiple:KitchenDataServiceService,private _activated_routes:ActivatedRoute) { }

  ngOnInit(): void {
    this.order_id=this._activated_routes.snapshot.params["order_id"];
    console.log(this.order_id);
    this._orderMultiple.getMultipleData(this.order_id).subscribe(
      (data:orderdata[])=>{
        console.log(data);
        this.order_multiple=data;
      }
    )
  }

}
