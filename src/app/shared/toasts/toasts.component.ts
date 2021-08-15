import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styles: [
  ]
})
export class ToastsComponent implements OnInit {
  
  myToast!: bootstrap.Toast;
  constructor() { }

  ngOnInit(): void {

    let myToastEl = document.getElementById('liveToast')!
    // this.myToast = bootstrap.Toast.getInstance(myToastEl)! // Returns a Bootstrap toast instance
    this.myToast = new bootstrap.Toast( myToastEl );
      
    // this.myToast?.show()

  }
  

}
