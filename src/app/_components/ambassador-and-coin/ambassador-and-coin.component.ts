import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Loader } from '@googlemaps/js-api-loader';

let map: google.maps.Map;

const loader = new Loader({
  apiKey: 'AIzaSyClzIs4beJRuUasJRaY-M7notQHmre5UWQ',
  version: 'weekly',
});

@Component({
  selector: 'app-ambassador-and-coin',
  templateUrl: './ambassador-and-coin.component.html',
  styleUrls: ['./ambassador-and-coin.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: ''}],
})

export class AmbassadorAndCoinComponent implements OnInit {
  public sendEmail = () => {};

  constructor() { }

  ngOnInit() {
    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 41.850033, lng: -87.6500523 }, // approximate US center TODO: fit to bounds instead
        zoom: 5,
      });
    });
  }
}
