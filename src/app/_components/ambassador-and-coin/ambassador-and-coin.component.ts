import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Loader } from '@googlemaps/js-api-loader';
import { Points } from './points';
import LatLngBounds = google.maps.LatLngBounds;
import { QueryService } from '../../_services/query.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GoogleAnalyticsService} from 'ngx-google-analytics';

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
  private coinDetails: any[];

  public waiting = false;
  public isOpen = true; // default page load
  public map: google.maps.Map;
  public searchForm: FormGroup;
  public searchInput: FormControl;

  constructor(
    private points: Points,
    private queryService: QueryService,
    private $gaService: GoogleAnalyticsService,
  ) {
    this.queryService
      .getAllChimes()
      .subscribe((results) => {
        this.coinDetails = results;
      });
  }

  ngOnInit() {
    loader
      .load()
      .then(() => {
        this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
          center: new google.maps.LatLng(29.9717, -95.6938),
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          disableDefaultUI: true,
        });

        this.loadMarkersToMap();

        // center to Elijah's coin
        const elijahLatLng = new google.maps.LatLng(29.9717, -95.6938);
        this.map.panTo(elijahLatLng);
        this.map.setCenter(elijahLatLng);
      });

    this.searchForm = new FormGroup({
      searchInput: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(10)
        ]),
    });
  }

  searchCoinOrTitle = () => {
    const search = this.searchForm.get('searchInput').value;

    if (!search) {
      this.queryService
        .getAllChimes()
        .subscribe((results) => {
          this.coinDetails = results;
          this.loadMarkersToMap();
          this.isOpen = false;

          this.$gaService.event('getAllChimes', 'search', 'View All Chimes');
        });

      return;
    }

    this.queryService
      .getSelectChimes(search)
      .subscribe((results) => {
        this.coinDetails = results;
        this.loadMarkersToMap();
        this.isOpen = false;

        this.$gaService.event('getSelectChimes', 'search', 'Find Specific Chimes');
      });
  }

  registerAmbassadorOrCoin = () => {
    console.log('attempting to register ambassador or coin');
  }

  loadMarkersToMap(): void {
    // ensure clean slate first
    this.points.clearAll(this.mapPoints);

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
  }

  hidePanels() {
    this.isOpen = !this.isOpen;
  }

  getErrorMessage() {
    console.log('getErrorMessages')
    console.log('here!', this.searchForm.controls)
    if (this.searchInput.hasError('required')) {
      return 'You must enter a value';
    }

    return this.searchInput.hasError('email') ? 'Not a valid email' : '';
  }
}
