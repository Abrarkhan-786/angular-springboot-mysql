import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from '../common/utility/snackbar.service';
import { HttpStatus } from '../constant/enum';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { DeleteBoxComponent } from '../pop-up/delete-box/delete-box.component';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'salary' ,'department','Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  instruction:string='Do you want delete record?'
  confirmation:any;
  employees!:any;
  backurl:string='/allEmployee';

  constructor(private service:EmployeeService,
    private _changeDetectorRef: ChangeDetectorRef,
    private snackbarService:SnackbarService,
    public dialog: MatDialog,
    private router :Router) {
   }
  

 

  ngOnInit(): void {
    this.getAllEmployeeList();
     //Assign the data to the data source for the table to render
     
   
  }

  ngAfterViewInit() {
  //  this.dataSource.paginator == this.paginator;
    //this.dataSource.sort = this.sort;
  }

   getAllEmployeeList(){
    this.service.getAllEmployeeList().subscribe((data)=>{
      if(data!=null && data!=undefined && data.response!=null && data.status==HttpStatus.SUCCESS ){
        this.employees=data.response;
        this.dataSource = new MatTableDataSource(data.response);
        this.dataSource.paginator =this.paginator;
        this.dataSource.sort = this.sort;
        this._changeDetectorRef.detectChanges();
        //alert(JSON.stringify(this.employees))

      }
    })
   }

  //  applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }


  editEmployee(id:number){
   this.router.navigate(['editEmployee'],{queryParams:{param:id},skipLocationChange:true})
  }
  viewEmployee(id:number){
    this.router.navigate(['viewEmployee'],{queryParams:{param:id},skipLocationChange:true})
  }

  deleteEmployee(id:number){
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      disableClose: true,
      width: '250px',
      data: {instruction:this.instruction},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.confirmation = result;
      if(result!=null && result.isConfirm==true){
        this.service.deleteEmployeeById(id).subscribe((data)=>{
          if(data!=null && data.status==HttpStatus.SUCCESS){
            this.snackbarService.openSucessSnackBar(data.message,this.backurl);
            this.getAllEmployeeList();
          }else{
            this.snackbarService.openErrorSnackBar(data.message)
          }
        })
      }
    });
  }
  backToList(){
    this.router.navigate(['addEmployee']);
  }
  
}   
