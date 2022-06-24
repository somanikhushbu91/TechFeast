import { Component, OnInit, ViewChild } from '@angular/core';
import { VendorDataService } from './vendor-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePriceComponent } from '../update-price/update-price.component';

@Component({
  selector: 'app-vendor-data',
  templateUrl: './vendor-data.component.html',
  styleUrls: ['./vendor-data.component.css']
})
export class VendorDataComponent implements OnInit {
  dataSource: MatTableDataSource<VendorDataComponent>;
  displayedColumns: string[] = ['order_name', 'qty', 'date', 'price', 'amount', 'special_instruction', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _vendor: VendorDataService, private _dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }
  vendor_email: string = "";
  ngOnInit(): void {
    this.vendor_email = localStorage.getItem('vendor_email');
    this._vendor.getData(this.vendor_email).subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(row) {
    this._dialog.open(UpdatePriceComponent, {
      data: row
    });
  }

  onDone(row) {
    console.log(row.ven_order_id);
    this._vendor.updateStatus(row.ven_order_id).subscribe(
      (data: any) => {
        console.log(data);
        this._vendor.getStockDetail(row.order_name).subscribe(
          (data: any) => {
            console.log(data);
            let stockqty = parseInt(data[0].stockQty);
            console.log(stockqty);
            stockqty += row.qty;
            console.log(stockqty);
            let order_date = new Date();
            let order_month = order_date.getMonth() + 1;
            if (order_month > 12) {
              order_month = (order_month % 12);
            }
            let datestr = order_date.getFullYear() + "-" + order_month + "-" + order_date.getDate();
            let obj = {
              stockQty: stockqty,
              price: row.price,
              date:datestr,
              fk_vendor_id: row.vendor_id,
            }
            this._vendor.updateStock(data[0].stock_id,obj).subscribe(
              (data:any[])=>{
                alert("done properly");
              }
            );
          }
        );
      }
    );
  }
}
