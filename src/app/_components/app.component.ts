import { Component } from '@angular/core';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  logoPath = '../../assets/images/kindness-org-logo.png';
  orgPath = 'https://www.kindnesstoaction.org/';

  constructor(public authService: AuthenticationService) { }
}
