import { Component } from '@angular/core';
import { ScriptService} from '../../_services/script.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  constructor(
    private script: ScriptService
  ) {
    this.script
      .load('amazonSmile')
      .then(data => {
        console.log('script loaded ', data);
      }).catch(error => console.log(error));
  }
}
