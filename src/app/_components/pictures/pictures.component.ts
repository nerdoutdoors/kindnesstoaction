import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(config: NgbCarouselConfig) {
    config.interval = 3000;
    config.wrap = false;
    config.keyboard = true;
    config.pauseOnHover = false;
  }
}
