import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from './category.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { categoryData } from './category';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private _cat_data: CategoryService, private _router: Router) {
    this.dataSource = new MatTableDataSource();
  }
  dataSource: MatTableDataSource<categoryData>;
  displayedColumns: string[] = ['cat_id', 'cat_name', 'Image', 'action']

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  user_tbl: categoryData[] = [];
  del_arr: number[] = [];

  onCheckBoxChange(row: categoryData) {

    if (this.del_arr.find(x => x == row.cat_id)) {
      this.del_arr.splice(this.del_arr.indexOf(row.cat_id), 1);
    }
    else {
      this.del_arr.push(row.cat_id);
    }
  }

  onDeleteAllClick() {
    this._cat_data.deleteAll(this.del_arr).subscribe(
      (data) => {

        for (let i = 0; i < this.del_arr.length; i++) {

          let x = this.user_tbl.find(x => x.cat_id == this.del_arr[i]);
          this.user_tbl.splice(this.user_tbl.indexOf(x), 1);
          this.dataSource.data = this.user_tbl;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.del_arr=[];
        }
      }
    );
  }

  ngOnInit() {
    this._cat_data.getAllData().subscribe(
      (data: categoryData[]) => {
        this.user_tbl = data;
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
  onDelete(row) {
    if (confirm("Are you sure you want to delete")) {
      this._cat_data.deleteData(row.cat_id).subscribe(
        (data: any[]) => {
          this.user_tbl.splice(this.user_tbl.indexOf(row), 1);
          this.dataSource.data = this.user_tbl;
          alert("Record is deleted");
        }
      );
    }
  }

  onAddRecord() {
    this._router.navigate(['/nav/addcategory']);
  }
  onEdit(row) {
    this._router.navigate(['/nav/updatecategory', row.cat_id]);
  }

}
