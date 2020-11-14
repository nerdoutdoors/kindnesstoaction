import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  logoPath: string = '../../assets/images/kindness-org-logo.png';
  orgPath: string = 'https://www.kindnesstoaction.org/';

  constructor(public authService: AuthenticationService) { }
}
