import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { cartData } from './cart';
import { CartService } from './cart.service';
import { ViewmorecartComponent } from './viewmorecart/viewmorecart.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  dataSource:MatTableDataSource<cartData>;
  displayedColumns:string[]=['cart_id','name','price','qty','table_no','action']
  constructor(private _data:CartService,private _dialog:MatDialog) {
    this.dataSource=new MatTableDataSource();
  }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  cart_tbl:cartData[];
  del_arr: number[] = [];
  onCheckBoxChange(row: cartData) {

    if (this.del_arr.find(x => x == row.cart_id)) {
      this.del_arr.splice(this.del_arr.indexOf(row.cart_id), 1);
    }
    else {
      this.del_arr.push(row.cart_id);
    }

  }
  onDeleteAllClick() {


    this._data.deleteAll(this.del_arr).subscribe(
      (data) => {

        for (let i = 0; i < this.del_arr.length; i++) {

          let x = this.cart_tbl.find(x => x.cart_id == this.del_arr[i]);
          this.cart_tbl.splice(this.cart_tbl.indexOf(x), 1);
          this.dataSource.data = this.cart_tbl;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    );
  }

  ngOnInit() {
    this._data.getAllData().subscribe(
      (data:cartData[])=>{
        console.log(data)
        this.cart_tbl=data;
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

  onDelete(row){
    if (confirm("are you sure you want to delete ?")){
      this._data.deleteData(row.cart_id).subscribe(
        (data:any[])=>{
          this.cart_tbl.splice(this.cart_tbl.indexOf(row),1);
          this.dataSource.data=this.cart_tbl;
          alert("Record Deleted");
        }
      );
    }
  }

  onView(row)
  {
    this._dialog.open(ViewmorecartComponent,{
      data:row
    })
  }
}
