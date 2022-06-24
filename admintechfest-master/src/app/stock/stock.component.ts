import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { stockData } from './stock';
import { StockService } from './stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
dataSource:MatTableDataSource<stockData>;
displayedColumns:string[]=['stock_id','title','qty','price','date','vendor_name','action'];
  constructor(private _stockdata:StockService,private _router:Router) {
    this.dataSource=new MatTableDataSource();
   }

   @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
   @ViewChild(MatSort,{static:true}) sort:MatSort;
   stock:stockData[];
   del_arr: number[] = [];

   onCheckBoxChange(row: stockData) {

    if (this.del_arr.find(x => x == row.stock_id)) {
      this.del_arr.splice(this.del_arr.indexOf(row.stock_id), 1);
    }
    else {
      this.del_arr.push(row.stock_id);
    }

  }
  onDeleteAllClick() {


    this._stockdata.deleteAll(this.del_arr).subscribe(
      (data) => {

        for (let i = 0; i < this.del_arr.length; i++) {

          let x = this.stock.find(x => x.vendor_id == this.del_arr[i]);
          this.stock.splice(this.stock.indexOf(x), 1);
          this.dataSource.data = this.stock;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.del_arr=[];
        }
      }
    );
  }


  ngOnInit() {
    this._stockdata.getAllData().subscribe(
      (data:stockData[])=>{
        this.stock=data;
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
      this._router.navigate(['/nav/addstock']);
    }


    onDelete(row)
    {
      if(confirm("Are you sure you want to delete"))
      {
        this._stockdata.deleteData(row.stock_id).subscribe(
          (data:any[])=>{
            this.stock.splice(this.stock.indexOf(row),1);
            this.dataSource.data=this.stock;
            alert("Record is deleted");
          }
        );
      }
    }
}
