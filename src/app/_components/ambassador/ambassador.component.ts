import { Component, OnInit } from '@angular/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldControl} from "@angular/material/form-field";

@Component({
  selector: 'app-ambassador',
  templateUrl: './ambassador.component.html',
  styleUrls: ['./ambassador.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: ''}],
})
export class AmbassadorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
