import { Component, OnInit } from '@angular/core';
import { KitchenDataServiceService } from '../kitchen-datacomponent/kitchen-data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDataComponent } from '../order-data/order-data.component'
import { Router } from '@angular/router';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-kitchen-data-component',
  templateUrl: './kitchen-data-component.component.html',
  styleUrls: ['./kitchen-data-component.component.css']
})
export class KitchenDataComponentComponent implements OnInit {

  constructor(private _kitchen: KitchenDataServiceService, private _dialog: MatDialog, private _router: Router) { }
  orderData: any[] = [];
  menuIds: any[] = [];
  IndredientData: any[] = [];
  del_arr:number[]=[];
  private postsSubscription: AnonymousSubscription;
  private timerSubscription: AnonymousSubscription;

  ngOnInit(): void {
    // this.refreshData();
    this._kitchen.getAllData().subscribe(
      (data: any) => {
        console.log(data);
        this.orderData = data;
        console.log(this.orderData);
      });
      setTimeout(() => {
        this.ngOnInit();
      }, 60000);
  }

  //   private subscribeToData(): void {
  //   this.timerSubscription = Observable.timer(5000)
  //     .subscribe(() => this.refreshData());
  // }

  // private refreshData():void{
  //   //  this._kitchen.getAllData().subscribe(
  //   //   (data: any) => {
  //   //     console.log(data);
  //   //     this.orderData = data;
  //   //     console.log(this.orderData);

  //   //   },
  //     function (error) {
  //       console.log(error);
  //     },
  //     function () {
  //       console.log("complete");
  //     }
  //   );
  // }

  onProcessing(item) {
    console.log(item);
    if (item.status == "Order") {
      item.status = "Processing";
      this._kitchen.updateData(item.order_id, item).subscribe(
        (data: any[]) => {
          this._kitchen.getMultipleMenuId(item.order_id).subscribe(
            (data: any[]) => {
              console.log(data);
              this.menuIds = data;
              console.log(this.menuIds.length);
              for (let i = 0; i < this.menuIds.length; i++) {
                console.log(this.menuIds[i].fk_menu_id);
                this._kitchen.getIngredientsDataForMenuID(this.menuIds[i].fk_menu_id).subscribe(
                  (data: any[]) => {
                    console.log(data);
                    this.IndredientData=data
                    for (let j = 0; j < this.IndredientData.length; j++) {
                      console.log(this.menuIds[i].qty * this.IndredientData[j].itemqty);
                      let tmpqty = this.IndredientData[j].stockQty - (this.menuIds[i].qty * this.IndredientData[j].itemqty);
                      //this.IndredientData[j].stockQty=tmpqty;
                      console.log(tmpqty);
                      setTimeout(function () {

                      }, 5000);
                      this._kitchen.updateStock(this.IndredientData[j].stock_id,tmpqty,this.IndredientData[j]).subscribe(
                          (data:any[])=>{
                            setTimeout(function () {

                            }, 5000);
                            // this.IndredientData=data;
                             console.log(this.IndredientData);
                             tmpqty=0;
                           }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      );
    }
  }

  onPrepared(item) {
    if (item.status == "Processing") {
      item.status = "Prepared"
      this._kitchen.updateData(item.order_id, item).subscribe(
        (data: any[]) => {
          console.log(data);
        }
      );
    }
    else {
      alert("Order is not yet go for processing");
    }
  }

  onOrderData(item) {
    this._router.navigate(["/nav/orderData", item.order_id])
  }

  onCancleOrder(item){
    console.log(item);
    this._kitchen.getMultipleData(item.order_id).subscribe(
      (data:any[])=>{
        console.log(data);
        for (let i = 0; i<data.length ; i++) {
          this.del_arr.push(data[i].order_details_id);
        }
        console.log(this.del_arr);
        this._kitchen.deleteAll(this.del_arr).subscribe(
          (data:any)=>{
            console.log(data);
            this._kitchen.deleteData(item.order_id).subscribe(
              (data:any[])=>{
                console.log(data);
                this.orderData.splice(this.orderData.indexOf(item),1);
                alert("record deleted successfully");
              }
            );
          }
        );
      }
    );
  }
}
