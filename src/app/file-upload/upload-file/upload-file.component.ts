import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { UploadFileService } from '../upload-file.service';
import { Location } from '@angular/common';
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
    public _location: Location
    ) { }

  imageSrc!: string|null;
  selectedFile!:any
  @ViewChild('formFile')
  myVar1: any;
  files:any=[];
  myForm = new FormGroup({
    file: new FormControl(null, [Validators.required]),
    fileSource: new FormControl<any>(null, [Validators.required])
  });

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}


  ngOnInit(): void {
    this.getAllAttachment();
  }

  get f(){
    return this.myForm.controls;
  }

  onFileChange(event:any) {
    if(event.target.files && event.target.files.length) {
      console.log(event.target.files)
      const [file] = event.target.files;
      // to send to backened
      [this.selectedFile]=event.target.files
      // File preveiw
      const reader = new FileReader();
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
      if(data!=null  && data.response!=null && data.status==HttpStatus.SUCCESS){
       this.router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
        console.log(decodeURI(this._location.path()));
        this.router.navigate([decodeURI(this._location.path())]);
        });
        this.snackbarService.openSucessSnackBar(data.message,"/fileUploading");
      }else{
        this.snackbarService.openErrorSnackBar(data.message);
      }
    })

   // console.log(this.myForm.value);
    
  }

  getAllAttachment(){
    this.service.getAllAttachment().subscribe((data)=>{
      if(data!=null && data!=undefined && data.response!=null && data.status==HttpStatus.SUCCESS){  
       // alert("helo")  
         data.response.map((file:any)=>{
          const map: {[key:string]: string} = {};
          map["id"]=file.id;
          map["fileName"]=file.fileName;
          map["fileType"]=file.fileType;
          map["filePreview"]=(file.fileType=="application/pdf")?'data:application/pdf;base64,'+file.data: 'data:image/jpeg;base64,'+file.data;
          this.files.push(map);
          return this.files;
        });
        console.log(this.files)
       // console.log(this.files);
        //console.log(data.response)
      }else{
        console.log("error")
       // this.snackbarService.openErrorSnackBar(data.message)
      }
    })
  }

  deleteFile(id:string){
   this.service.deleteAttachment(id).subscribe((data)=>{
    if(data!=null && data.status==HttpStatus.SUCCESS){
      this.router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
        console.log(decodeURI(this._location.path()));
        this.router.navigate([decodeURI(this._location.path())]);
        });
      //this.getAllAttachment();
      this.snackbarService.openSucessSnackBar(data.message,"/fileUploading");
    }else{
      this.snackbarService.openErrorSnackBar(data.message)
    }
   })
  }

  downloadFile(id:string){
    //alert(id);
    this.service.getAttachment(id).subscribe((data)=>{
      if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
        // console.log(data.response)
        const blob = new Blob([data.response.data], { type: data.response.fileType});
        // const url= window.URL.createObjectURL(blob);
        // window.open(url);
        //FileSaver.saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBom })
        FileSaver.saveAs(blob,data.response.fileName)
        // const fileURL = URL.createObjectURL(blob);
        // window.open(fileURL, data.response.fileName);
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
     })
   

  }

  downloadAttachment(id:string,fileName:string,fileType:string):void{
    this.service.getFile(id).subscribe((data)=>{
      const blob = new Blob([data], { type:fileType});
      FileSaver.saveAs(blob,fileName)
     })
   

  }
}
