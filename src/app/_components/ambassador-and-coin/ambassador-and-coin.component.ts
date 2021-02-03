import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Loader } from '@googlemaps/js-api-loader';
import { Points } from './points';
import LatLngBounds = google.maps.LatLngBounds;
import { QueryService } from '../../_services/query.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

const loader = new Loader({
  apiKey: 'AIzaSyClzIs4beJRuUasJRaY-M7notQHmre5UWQ',
  version: 'weekly',
});

const TEXT_INPUT_MINLENGTH = 3;

@Component({
  selector: 'app-ambassador-and-coin',
  templateUrl: './ambassador-and-coin.component.html',
  styleUrls: ['./ambassador-and-coin.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: ''}],
})

export class AmbassadorAndCoinComponent implements OnInit {
  readonly REQUIRED_FIELD_ERROR_MESSAGE = 'You must enter a value';
  readonly INVALID_EMAIL_ERROR_MESSAGE = 'Email entered is invalid';
  readonly INVALID_RECEIVER_EMAIL_ERROR_MESSAGE = 'Valid email required with receiver name';

  private mapPoints;
  private coinDetails: any[];

  public waiting = false;
  public isOpen = true; // default page load
  public map: google.maps.Map;

  // Search
  public searchForm: FormGroup;
  public searchInput: FormControl = new FormControl('');

  // Add Coin
  public addCoinForm: FormGroup;
  public coinId: FormControl = new FormControl('', [Validators.required, Validators.minLength(10)]);
  public coinTitle: FormControl = new FormControl('', [Validators.required, Validators.minLength(TEXT_INPUT_MINLENGTH)]);
  public coinGiver: FormControl = new FormControl('');
  public coinReceiver: FormControl = new FormControl('');
  public coinReceiverEmail: FormControl = new FormControl('', [Validators.email]);
  public coinEventDescription: FormControl = new FormControl('');

  // Become Ambassador
  public becomeAmbassadorForm: FormGroup;
  public ambassadorName: FormControl = new FormControl('', [Validators.required, Validators.minLength(TEXT_INPUT_MINLENGTH)]);
  public ambassadorEmail: FormControl = new FormControl('', [Validators.required, Validators.email]);

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

    // Set up form groups
    this.searchForm = new FormGroup({
      searchInput: this.searchInput,
    });

    this.addCoinForm = new FormGroup({
      coinId: this.coinId,
      coinTitle: this.coinTitle,
      coinGiver: this.coinGiver,
      coinReceiver: this.coinReceiver,
      coinReceiverEmail: this.coinReceiverEmail,
      coinEventDescription: this.coinEventDescription,
    });

    this.becomeAmbassadorForm = new FormGroup({
      ambassadorName: this.ambassadorName,
      ambassadorEmail: this.ambassadorEmail,
    });
  }

  generateMinimumLengthErrorMessage = (length: number = TEXT_INPUT_MINLENGTH) => {
    return `Minimum length of ${length} is required`;
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

  registerCoin = () => {
    console.log('attempting to register coin');
  }

  becomeAmbassador = () => {
    console.log('attempting to become ambassador');
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
}
