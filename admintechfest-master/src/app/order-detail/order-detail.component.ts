import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { order_detail } from './order_detail';
import { OrderDetailDataService } from './order-detail-data.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  dataSource:MatTableDataSource<order_detail>
  displayedColumns:string[]=['order_details_id','table_no','name','price','qty','discription','action']

  constructor(private _data:OrderDetailDataService) {
    this.dataSource=new MatTableDataSource();
   }
   order_tbl:order_detail[]=[];
   del_arr: number[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this._data.getAllData().subscribe(
      (data:any[])=>{
        this.dataSource.data=data;
        console.log(data);
        this.order_tbl=data;
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      }
    );
  }
  onCheckBoxChange(row: order_detail) {

    if (this.del_arr.find(x => x == row.order_details_id)) {
      this.del_arr.splice(this.del_arr.indexOf(row.order_details_id), 1);
    }
    else {
      this.del_arr.push(row.order_details_id);
    }

  }
  onDeleteAllClick() {
    this._data.deleteAll(this.del_arr).subscribe(
      (data) => {
        for (let i = 0; i < this.del_arr.length; i++) {
          let x = this.order_tbl.find(x => x.order_details_id == this.del_arr[i]);
          this.order_tbl.splice(this.order_tbl.indexOf(x), 1);
          this.dataSource.data = this.order_tbl;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.del_arr=[];
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

  onDelete(row){
    if(confirm("Are You Sure You Want TO Delete ?")){
      this._data.deleteData(row.order_details_id).subscribe(
        (data:any[])=>{
          this.order_tbl.splice(this.order_tbl.indexOf(row),1);
          this.dataSource.data=this.order_tbl;
          alert("Record is deleted");
        }
      );
    }
  }

}
