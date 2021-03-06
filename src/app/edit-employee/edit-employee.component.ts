import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../common/utility/snackbar.service';
import { HttpStatus } from '../constant/enum';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MSG } from '../error-message';
import { regix_patterns } from '../shared/regix_patterns';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  param!: number;
  employee!: Employee;
  backurl:string='/allEmployee';
  MESSAGE=MSG;
  title='Edit Employee Form'
  constructor(
    private service:EmployeeService,
    private snackbarService:SnackbarService,
    private route: ActivatedRoute
    ) { }

    employeeForm=new FormGroup({
      id:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.ONLY_NUMERIC)]),
      name:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.ONLY_ALPHABETS)]),
      email:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.EMAIL)]),
      department:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.ONLY_ALPHA_NUMERIC_WITH_SPACE)]),
      salary:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.ONLY_NUMERIC_FLOAT)]),
      senior:new FormControl(true,[])
    })

  ngOnInit(): void {
   this.getDetail();
  }
  getDetail(){
    this.route.queryParams.subscribe(params=>{
      this.param=params['param'];
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
          
      }else{
        this.snackbarService.openErrorSnackBar(data.message);
      }
    })
  }
  
  update(){
    if(this.employeeForm.invalid){
      this.employeeForm.markAllAsTouched();
      return;
    }
    const model=new Employee();
    model.id=this.employeeForm.value.id?Number(this.employeeForm.value.id):null;
    model.name=(this.employeeForm.value.name)?this.employeeForm.value.name:null;
    model.department=(this.employeeForm.value.department)?this.employeeForm.value.department:null;
    model.salary=(this.employeeForm.value.salary)?Number(this.employeeForm.value.salary):null
    model.email=(this.employeeForm.value.email)?this.employeeForm.value.email:null;
    model.senior=this.employeeForm.value.senior;
    console.log(model)

    this.service.updateEmployee(model).subscribe((data) => { 
      if (data != null && data != undefined && data.status == HttpStatus.SUCCESS) {
          this.snackbarService.openSucessSnackBar(data.message,this.backurl)
           }else{
            this.snackbarService.openErrorSnackBar(data.message)
           }        
     });
  }


}
