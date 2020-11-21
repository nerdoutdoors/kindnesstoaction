import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {
  image1: string = '../../assets/images/elijah-laughing.jpg';
  image2: string = '../../assets/images/lij-focused-on-top.jpg';
  image3: string = '../../assets/images/lij-ice-cream.jpg';
  images = [this.image1, this.image2, this.image3];

  constructor(config: NgbCarouselConfig) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
  }

  ngOnInit() {
  }

}
