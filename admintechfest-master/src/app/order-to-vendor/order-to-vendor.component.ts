import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { orderToVendor } from './orderToVendor';
import { OrderToVendorService } from './order-to-vendor.service';
import { Router } from '@angular/router';
import { ViewmoreorderToVendorComponent } from './viewmoreorder-to-vendor/viewmoreorder-to-vendor.component';
import { VendormailComponent } from './vendormail/vendormail.component';

@Component({
  selector: 'app-order-to-vendor',
  templateUrl: './order-to-vendor.component.html',
  styleUrls: ['./order-to-vendor.component.css']
})
export class OrderToVendorComponent implements OnInit {
  dataSource:MatTableDataSource<orderToVendor>;
  displayedColumns:string[]=['ven_order_id','order_name','qty','date','price','is_delivered','vendor_name','action'];

  constructor(private _data:OrderToVendorService,private _router:Router,private _dialog:MatDialog) {
    this.dataSource=new MatTableDataSource();
   }

   @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
   @ViewChild(MatSort,{static:true}) sort:MatSort;

   orderVendor:orderToVendor[];

   del_arr: number[] = [];

  onCheckBoxChange(row: orderToVendor) {

    if (this.del_arr.find(x => x == row.ven_order_id)) {
      this.del_arr.splice(this.del_arr.indexOf(row.ven_order_id), 1);
    }
    else {
      this.del_arr.push(row.ven_order_id);
    }

  }
  onDeleteAllClick() {


    this._data.deleteAll(this.del_arr).subscribe(
      (data) => {

        for (let i = 0; i < this.del_arr.length; i++) {

          let x = this.orderVendor.find(x => x.ven_order_id == this.del_arr[i]);
          this.orderVendor.splice(this.orderVendor.indexOf(x), 1);
          this.dataSource.data = this.orderVendor;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.del_arr=[];
        }
      }
    );
  }

  onAllRecord(){
    this._data.getAllData().subscribe(
      (data:orderToVendor[])=>{
        console.log(data);
        this.orderVendor=data;
        this.dataSource.data=data;
      }
    );
  }

  ngOnInit() {
    this._data.getAllData().subscribe(
      (data:orderToVendor[])=>{
        console.log(data);
        this.orderVendor=data;
        this.dataSource.data=data;
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
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

onAddRecord(){
  this._router.navigate(['/nav/addOrderVendor']);
}


onDelete(row)
{
  if(confirm("Are you sure you want to delete"))
  {
    this._data.deleteData(row.ven_order_id).subscribe(
      (data:any[])=>{
        this.orderVendor.splice(this.orderVendor.indexOf(row),1);
        this.dataSource.data=this.orderVendor;
        alert("Record is deleted");
      }
    );
  }
}
onView(row){
  this._dialog.open(ViewmoreorderToVendorComponent,{
    data:row
  });
}

onNotDeliveredClick(){
  this._data.getNotDelivered().subscribe(
    (data:orderToVendor[])=>{
      console.log(data);
      this.orderVendor=data;
      this.dataSource.data=data;
    }
  );
}

onDeliveredClick(){
  this._data.getDelivered().subscribe(
    (data:orderToVendor[])=>{
      console.log(data);
      this.orderVendor=data;
      this.dataSource.data=data;
    }
  );
}

onMail(row){
  this._dialog.open(VendormailComponent,{
    data:row
  });
}

}
