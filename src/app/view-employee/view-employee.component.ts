import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../common/utility/snackbar.service';
import { HttpStatus } from '../constant/enum';
import { EmployeeService } from '../employee.service';
import { MSG } from '../error-message';
import { regix_patterns } from '../shared/regix_patterns';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  param!: number;
  employee:any;
  title='View Employee Form'
  backurl:string='/allEmployee';
  MESSAGE=MSG;
  constructor(
      private route: ActivatedRoute,
      private service:EmployeeService,
      private snackbarService:SnackbarService,
      private router:Router
  ) { }

  ngOnInit(): void {
    this.getDetail();
  }
  
  employeeForm=new FormGroup({
    id:new FormControl('',[]),
    name:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.ONLY_ALPHABETS)]),
    email:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.EMAIL)]),
    department:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.ONLY_ALPHA_NUMERIC_WITH_SPACE)]),
    salary:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.ONLY_NUMERIC_FLOAT)]),
    senior:new FormControl(true,[])

  })
  getDetail(){
    this.route.queryParams.subscribe(prams=>{
      this.param=prams['param'];
    });
    this.service.findEmployeeById(this.param).subscribe((data)=>{
      if(data!=null && data!=undefined && data.response!=null && data.status==HttpStatus.SUCCESS){
         this.employee=data.response;
         this.employeeForm.patchValue({
          'id':String(this.employee.id),
          'name':this.employee.name,
          'email':this.employee.email,
          'department':this.employee.department,
          'salary':String(this.employee.salary),
          'senior':this.employee.senior
         });
        this.employeeForm.disable();
      
      }else{
        this.snackbarService.openErrorSnackBar(data.message);
      }
    })
  }

  backToList(){
          this.router.navigate(['allEmployee']);
  }
}
