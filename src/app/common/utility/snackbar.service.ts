import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor( 
    private snackBar: MatSnackBar,
    private router:Router
    ) { 
 
  }

   openSucessSnackBar(message:string,backurl:string){
    let snackBarRef=this.snackBar.open(message, "Ok", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ['green-snackbar'],
     });

     snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack-bar was dismissed');
      this.router.navigate([backurl]);
    });
  }

  openErrorSnackBar(message:string){
    let snackBarRef=this.snackBar.open(message, "Ok", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ['red-snackbar'],
     });

     snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });
  }

}
