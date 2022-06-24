import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-box',
  templateUrl: './delete-box.component.html',
  styleUrls: ['./delete-box.component.css']
})
export class DeleteBoxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public  data: any) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
  confirm(){
    const result={
      'isConfirm':true
    }
    this.dialogRef.close(result)
  }
}
