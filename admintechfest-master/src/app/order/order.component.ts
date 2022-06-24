import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderDataService } from './order-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { orderdata } from "./order";
import { ViewmoreorderComponent } from './viewmoreorder/viewmoreorder.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  displayedColumns:string[]=['order_id','table_no','date','order_amt','payment_type','is_paid','status','action'];
  order_tbl:orderdata[];
  del_arr: number[] = [];
  constructor(private _data:OrderDataService,private _router:Router) { }
  dataSource=new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  onCheckBoxChange(row: orderdata) {

    if (this.del_arr.find(x => x == row.order_id)) {
      this.del_arr.splice(this.del_arr.indexOf(row.order_id), 1);
    }
    else {
      this.del_arr.push(row.order_id);
    }

  }
  onDeleteAllClick() {

    this._data.deleteAll(this.del_arr).subscribe(
      (data) => {

        for (let i = 0; i < this.del_arr.length; i++) {

          let x = this.order_tbl.find(x => x.order_id == this.del_arr[i]);
          this.order_tbl.splice(this.order_tbl.indexOf(x), 1);
          this.dataSource.data = this.order_tbl;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.del_arr=[];
        }
      }
    );
  }

  ngOnInit() {
    this._data.getAllData().subscribe(
      (data:any[])=>{
        console.log(data);
        this.order_tbl=data;
        console.log(this.order_tbl);
        this.dataSource.data=data;
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      }
    );
  }

  onDelete(row){
    this._data.deleteData(row.order_id).subscribe(
      (data:any[])=>{
        if (confirm("Are you sure you want to Delete ?")){
          this.order_tbl.splice(this.order_tbl.indexOf(row),1);
          this.dataSource.data=this.order_tbl;
          alert("Record Deleted successfully");
        }
      }
    );
  }

  applyFilter(filtervalue:string){
    this.dataSource.filter=filtervalue.trim().toLowerCase();

    if (this.dataSource.paginator)
    {
      this.dataSource.paginator.firstPage();
    }
  }

  onView(row){
      this._router.navigate(['/nav/orderviewmore',row.order_id]);
  }

  onCashPayment(row){
    this._data.updatepaymentstatus(row.order_id).subscribe((data:any)=>{
      console.log(data);
      this.ngOnInit();
    });
  }

}
