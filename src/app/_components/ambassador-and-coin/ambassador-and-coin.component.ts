import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Loader } from '@googlemaps/js-api-loader';
import { Points } from './points';
import LatLngBounds = google.maps.LatLngBounds;

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
  private mapPoints;
  private coinDetails;
  public map: google.maps.Map;
  public sendEmail = () => {};

  constructor(
    private points: Points,
  ) {}

  ngOnInit() {
    // TODO: query api for point data
    this.coinDetails = [
      { lat: '29.749907', lng: '-95.358421' }, // Houston
      { lat: '47.6062', lng: '-122.3321' } // Seattle
    ];

    loader
      .load()
      .then(() => {
        this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
          center: new google.maps.LatLng(41.850033, -87.6500523),
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          disableDefaultUI: true,
        });

        // create markers for map points
        this.mapPoints = this.points.generateMarkers(this.coinDetails, this.map);

        // fit to bounds if we have points
        if (this.mapPoints) {
          // Fit the map to show all the markers
          const bounds = this.points.determineBounds(this.mapPoints);

          if (!bounds) {
            return;
          }
          this.map.fitBounds(bounds as LatLngBounds);
        }
      });
  }
}
