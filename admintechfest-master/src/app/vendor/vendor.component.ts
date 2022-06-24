import { Component, OnInit, ViewChild } from '@angular/core';
import { VendorService } from './vendor.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { vendorData } from './vendor';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  constructor(private _vendorData:VendorService,private _router:Router) {
    this.dataSource=new MatTableDataSource();
   }
   dataSource:MatTableDataSource<vendorData>;
  displayedColumns:string[]=['vendor_id','vendor_name','vendor_email','mobile_no','password','action']

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  arr:vendorData[]=[];

  del_arr: number[] = [];

  onCheckBoxChange(row: vendorData) {

    if (this.del_arr.find(x => x == row.vendor_id)) {
      this.del_arr.splice(this.del_arr.indexOf(row.vendor_id), 1);
    }
    else {
      this.del_arr.push(row.vendor_id);
    }

  }
  onDeleteAllClick() {


    this._vendorData.deleteAll(this.del_arr).subscribe(
      (data) => {

        for (let i = 0; i < this.del_arr.length; i++) {

          let x = this.arr.find(x => x.vendor_id == this.del_arr[i]);
          this.arr.splice(this.arr.indexOf(x), 1);
          this.dataSource.data = this.arr;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.del_arr=[];
        }
      }
    );
  }

  ngOnInit() {
    this._vendorData.getAllData().subscribe(
      (data:vendorData[])=>{
        this.arr=data;
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
  onDelete(row)
  {
    if (confirm("Are you sure you want to delete"))
    {
      this._vendorData.deleteData(row.vendor_id).subscribe(
        (data:any[])=>{
          this.arr.splice(this.arr.indexOf(row),1);
          this.dataSource.data=this.arr;
          alert("Record is deleted");
        }
      );
    }
  }

  onAddRecord()
  {
    this._router.navigate(['/nav/addvendor']);
  }
  onEdit(row)
  {
    this._router.navigate(['/nav/updatevendor',row.vendor_id]);
  }
}
