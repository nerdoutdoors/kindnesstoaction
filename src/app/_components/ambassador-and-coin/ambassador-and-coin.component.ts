import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from "@angular/material/form-field";

@Component({
  selector: 'app-ambassador-and-coin',
  templateUrl: './ambassador-and-coin.component.html',
  styleUrls: ['./ambassador-and-coin.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: ''}],
})
export class AmbassadorAndCoinComponent implements OnInit {
  sendEmail = () => {};
  waiting: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
