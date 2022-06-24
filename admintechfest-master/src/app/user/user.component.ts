import { Component, OnInit, ViewChild } from '@angular/core';
import { UserdataService } from './userdata.service';
import { Userdata } from './userdata';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserviewmoredialogcomponentComponent } from './userviewmoredialogcomponent/userviewmoredialogcomponent.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataSource:MatTableDataSource<Userdata>;
  displayedColumns:string[]=['email_id','name','mobile_no','dob','address','employee_type','action']

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  user_tbl:Userdata[];
  i:number;
  del_arr: string[] = [];
  constructor(private _data:UserdataService,private _router:Router,private _dialog:MatDialog) {
    this.dataSource=new MatTableDataSource();
  }


  onCheckBoxChange(row: Userdata) {

    if (this.del_arr.find(x => x== row.email_id)) {
      this.del_arr.splice(this.del_arr.indexOf(row.email_id), 1);
    }
    else {
      this.del_arr.push(row.email_id);
    }

  }
  onDeleteAllClick() {


    this._data.deleteAll(this.del_arr).subscribe(
      (data) => {

        for (let i = 0; i < this.del_arr.length; i++) {

          let x = this.user_tbl.find(x => x.email_id == this.del_arr[i]);
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
      this._data.getAllData().subscribe(
        (data:Userdata[])=>{
          this.dataSource.data=data;
          console.log(data)
          this.user_tbl=data;
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort;
        }
      )
  }

  applyFilter(filtervalue:string){
    this.dataSource.filter=filtervalue.trim().toLowerCase();

    if (this.dataSource.paginator)
    {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(item:Userdata){

      if (confirm("Are you sure you want to delete ?"))
      {
        this._data.deleteData(item.email_id).subscribe(
        (data:any[])=>{
          this.user_tbl.splice(this.user_tbl.indexOf(item),1);
          this.dataSource.data=this.user_tbl;
          alert("Record is deleted");
        }
        );
      }
  }

  onAddRecord()
  {
    this._router.navigate(['/nav/adduser']);
  }

  onEdit(row)
  {
    this._router.navigate(['/nav/updateuser',row.email_id]);
  }

  onView(row){
    this._dialog.open(UserviewmoredialogcomponentComponent,{
      data:row
    });
  }

}
