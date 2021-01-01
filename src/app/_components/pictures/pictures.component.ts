import { Component } from '@angular/core';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent {
  images = [
    {
      url: '../../assets/images/elijah-big-laugh.jpg',
      label: `Elijah's Laugh`,
    },
    {
      url: '../../assets/images/lij-focused-on-top.jpg',
      label: `One of Elijah's favorite things`,
    },
    {
      url: '../../assets/images/lij-ice-cream.jpg',
      label: 'Blue Bell is back.',
    },
  ];

  constructor() {
  }
}
