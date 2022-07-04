import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class RefreshPageService {

  constructor( 
    private router:Router,
    private location:Location
    ) { 
 
  }
  refresh(){
    this.router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())]);
      });
  }
   
  }


