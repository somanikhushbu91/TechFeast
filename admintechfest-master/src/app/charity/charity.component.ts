import { OnInit, ViewChild, Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { charity } from "./charity";
import { CharityService } from "./charitydata.service";
import { CharitymailComponent } from './charitymail/charitymail.component';

@Component({
  selector: 'app-charity',
  templateUrl: './charity.component.html',
  styleUrls: ['./charity.component.css']
})
export class CharityComponent implements OnInit {

  constructor(private _charity:CharityService,private _router:Router,private _dialog:MatDialog) {
    this.dataSource=new MatTableDataSource();
   }
  dataSource:MatTableDataSource<charity>;
  displayedColumns:string[]=['charity_id','charity_name','location','contact_info','email_id','action']

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  charity_tbl:charity[]=[];
  del_arr: number[] = [];

  onCheckBoxChange(row: charity) {

    if (this.del_arr.find(x => x == row.charity_id)) {
      this.del_arr.splice(this.del_arr.indexOf(row.charity_id), 1);
    }
    else {
      this.del_arr.push(row.charity_id);
    }

  }
  onDeleteAllClick() {


    this._charity.deleteAll(this.del_arr).subscribe(
      (data) => {

        for (let i = 0; i < this.del_arr.length; i++) {

          let x = this.charity_tbl.find(x => x.charity_id == this.del_arr[i]);
          this.charity_tbl.splice(this.charity_tbl.indexOf(x), 1);
          this.dataSource.data = this.charity_tbl;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.del_arr  =[];
        }
      }
    );
  }
  ngOnInit()
  {
    this._charity.getAllData().subscribe(
      (data:charity[])=>{
        this.charity_tbl=data;
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
      this._charity.deleteData(row.charity_id).subscribe(
        (data:any[])=>{
          this.charity_tbl.splice(this.charity_tbl.indexOf(row),1);
          this.dataSource.data=this.charity_tbl;
          alert("Record is deleted");
        }
      );
    }
  }

  onAddRecord()
  {
    this._router.navigate(['/nav/addcharity']);
  }
  onEdit(row)
  {
    this._router.navigate(['/nav/updatecharity',row.charity_id]);
  }
  // onMail(row)
  // {
  //   this._router.navigate(['/nav/charitymail',row.charity_id]);
  // }
  onMail(row){
    this._dialog.open(CharitymailComponent,{
      data:row
    });
  }
}
