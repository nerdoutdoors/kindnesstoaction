import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cause',
  templateUrl: './cause.component.html',
  styleUrls: ['./cause.component.scss']
})
export class CauseComponent implements OnInit {
  logoPathLg: string = '../../assets/images/kindness-org-logo-lg.png';
  constructor() { }

  ngOnInit() {
  }

}
