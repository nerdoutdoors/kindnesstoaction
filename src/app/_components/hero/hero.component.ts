import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  elijahImage = '../../assets/images/elijah-laughing.jpg';

  constructor() {}

  onTypingComplete() {
    // hide blinking cursor when animation is complete
    document.getElementsByClassName('typed-cursor')[0].className = 'hide';
  }
}
