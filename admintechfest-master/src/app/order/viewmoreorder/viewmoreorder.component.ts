import { Component, OnInit} from '@angular/core';
import { orderdata } from '../order';
import { OrderDataService } from '../order-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewmoreorder',
  templateUrl: './viewmoreorder.component.html',
  styleUrls: ['./viewmoreorder.component.css']
})
export class ViewmoreorderComponent implements OnInit {
order_id:number;
order_total:number;
order_multiple:orderdata[]=[];
  constructor(private _orderMultiple:OrderDataService,private _activated_routes:ActivatedRoute) { }


  ngOnInit() {
    this.order_id=this._activated_routes.snapshot.params['order_id'];
    this._orderMultiple.getMultipleData(this.order_id).subscribe(
      (data:orderdata[])=>{
        console.log(data);
        this.order_multiple=data;
      }
    );
  }

}
