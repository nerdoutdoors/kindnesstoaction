import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from "@angular/material/form-field";

@Component({
  selector: 'app-ambassador',
  templateUrl: './ambassador.component.html',
  styleUrls: ['./ambassador.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: ''}],
})
export class AmbassadorComponent implements OnInit {
  sendEmail = () => {};
  waiting: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
