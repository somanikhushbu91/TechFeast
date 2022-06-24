import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { feedbackData } from "./feedback";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FeedbackDataService } from './feedback-data.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private _feedback:FeedbackDataService,private _router:Router) {
    this.dataSource = new MatTableDataSource();
  }
  dataSource:MatTableDataSource<feedbackData>;
  displayedColumns:string[]=['Name','Mobile_no','feedback','action']

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  feedback_tbl: feedbackData[]=[];

  ngOnInit() {
    this._feedback.getAllFeedback().subscribe(
      (data:feedbackData[])=>{
        console.log(data);
        this.feedback_tbl=data;
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

      this._feedback.deleteFeedback(row.feedback_id).subscribe(
        (data:any[])=>{
          this.feedback_tbl.splice(this.feedback_tbl.indexOf(row),1);
          this.dataSource.data=this.feedback_tbl;
          alert("Record is deleted");

        }
      );
    }
  }
}
