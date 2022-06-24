import { Component, OnInit, ViewChild } from '@angular/core';
import { menuData } from './menu';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MenuService } from './menu.service';
import { Router } from '@angular/router';
import { ViewmoremenuitemComponent } from './viewmoremenuitem/viewmoremenuitem.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dataSource: MatTableDataSource<menuData>;
  displayedColumns: string[] = ['menu_id', 'name', 'pic', 'price', 'is_jain', 'is_available', 'action']
  constructor(private _data: MenuService, private _router: Router, private _dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  menu_tbl: menuData[];
  del_arr: number[] = [];
  del_ingredients: number[] = [];

  onCheckBoxChange(row: menuData) {

    if (this.del_arr.find(x => x == row.menu_id)) {
      this.del_arr.splice(this.del_arr.indexOf(row.menu_id), 1);
    }
    else {
      this.del_arr.push(row.menu_id);
    }

  }
  onDeleteAllClick() {


    this._data.deleteAll(this.del_arr).subscribe(
      (data) => {

        for (let i = 0; i < this.del_arr.length; i++) {

          let x = this.menu_tbl.find(x => x.menu_id == this.del_arr[i]);
          this.menu_tbl.splice(this.menu_tbl.indexOf(x), 1);
          this.dataSource.data = this.menu_tbl;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.del_arr = [];
        }
      }
    );
  }

  ngOnInit() {

    this._data.getAllData().subscribe(
      (data: menuData[]) => {
        console.log(data);
        this.menu_tbl = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  onAddRecord() {
    this._router.navigate(['/nav/addmenu']);
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(row) {
    this._router.navigate(['/nav/updatemenu', row.menu_id]);
  }

  onDelete(row) {
    if (confirm("Are you sure you want to delete")) {
      this._data.getStockMenuByID(row.menu_id).subscribe(
        (data: any[]) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            this.del_ingredients.push(data[i].sm_id);
          }
          this._data.deleteAllStockMenu(this.del_ingredients).subscribe(
            (data: any[]) => {
              console.log(data);
              alert("Data Deleted Successfully");
              this._data.deleteData(row.menu_id).subscribe(
                (data:any[])=>{
                  this.menu_tbl.splice(this.menu_tbl.indexOf(row),1);
                  this.dataSource.data=this.menu_tbl;
                  alert("Record is deleted");
                }
              );
            }
          );
        }
      );
    }
  }
  onView(row) {
    this._dialog.open(ViewmoremenuitemComponent, {
      data: row
    });
  }

  onImageEdit(row) {
    this._router.navigate(['/nav/updatemenuimage', row.menu_id]);
  }
}

