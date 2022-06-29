import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    private service:UploadFileService,
    private snackbarService:SnackbarService,
    private router:Router,
    private _changeDetectorRef: ChangeDetectorRef,
    ) { }

  imageSrc!: string|null;
  selectedFile!:any
  @ViewChild('formFile')
  myVar1: any;
  myForm = new FormGroup({
    file: new FormControl(null, [Validators.required]),
    fileSource: new FormControl<any>(null, [Validators.required])
  });

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}


  ngOnInit(): void {
  }

  get f(){
    return this.myForm.controls;
  }

  onFileChange(event:any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      console.log(event.target.files)
      const [file] = event.target.files;
      [this.selectedFile]=event.target.files
      reader.readAsDataURL(file);//read file as data url
      console.log(file)
    
      reader.onload = () => { // called once readAsDataURL is completed
   
        this.imageSrc = reader.result as string; //returns file content
     
        this.myForm.patchValue({
          fileSource: reader.result,
        });
   
      };
   
    }
  }

  upload(){
    const file = new FormData();
    file.append("file",this.selectedFile,this.selectedFile.name);
    this.service.uploadAttachment(file).subscribe(data=>{
      if(data!=null && data.reponse!=null && data.status==HttpStatus.SUCCESS){
        // this.myForm.reset();
        // this.imageSrc=null;
        //this.router.navigateByUrl("fileUploading")
       // this.myVar1.nativeElement.value = '';
        //this.imageSrc="";
       // this._changeDetectorRef.detectChanges();
       //location.reload;
        this.snackbarService.openSucessSnackBar(data.message,"");
        
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
    })

    console.log(this.myForm.value);
    
  }

}
