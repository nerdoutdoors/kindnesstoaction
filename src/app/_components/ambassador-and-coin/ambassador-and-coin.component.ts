import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Loader } from '@googlemaps/js-api-loader';
import { Points } from './points';
import LatLngBounds = google.maps.LatLngBounds;
import { QueryService } from '../../_services/query.service';

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
    private queryService: QueryService,
  ) {
    this.queryService
      .getAllChimes()
      .subscribe((results) => {
        this.coinDetails = results.map((chime) => ({
          lat: chime.latitude,
          lng: chime.longitude,
        }));
      });
  }

  ngOnInit() {
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
