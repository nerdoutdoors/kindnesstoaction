import { get } from 'lodash';
import { Injectable } from '@angular/core';
import MarkerOptions = google.maps.MarkerOptions;
import LatLngBounds = google.maps.LatLngBounds;
import MarkerClusterer from '@googlemaps/markerclustererplus';

export const ELIJAH_COIN_NUMBER = '012104';
export const DEFAULT_MARKER_RADIUS = 12;

export const kindnessGreen = '#82be3f';
export const kindnessGray = '#a0a2a5';

export enum MarkerConfig {
  ELIJAH = 'ELIJAH',
  COIN = 'COIN',
}

@Injectable()
export class Points {
  generateMarkers(points: any[], map) {
    const allMarkers: any[] = [];
    const elijahMarker: any[] = [];

    if (!points || points.length < 1) {
      return undefined;
    }

    points.forEach((point) => {
      const { latitude, longitude, coin_num } = point;

      const position = {
        lat : parseFloat( latitude ),
        lng : parseFloat( longitude )
      };

      const popup = this.createPopup(point, `#${coin_num}`);
      const markerStyles = this.applyStyles(coin_num === ELIJAH_COIN_NUMBER ? MarkerConfig.ELIJAH : MarkerConfig.COIN);

      // create marker and apply styles
      const marker = new google.maps.Marker({
        position,
        map,
        ...markerStyles,
        label: {
          text: coin_num === ELIJAH_COIN_NUMBER ? 'E' : 'K',
        },
        // icon: {
          // path: google.maps.SymbolPath.CIRCLE,
          // ...markerStyles['icon'],
        // },
      } as MarkerOptions);

      marker.addListener('click', () => {
        popup.open(map, marker);
      });
      map.addListener('click', () => {
        popup.close();
      });

      // open Elijah's popup by default
      if (coin_num === ELIJAH_COIN_NUMBER) {
        popup.open(map, marker);

        elijahMarker.push(marker);
        return;
      }

      allMarkers.push(marker);
      return;
    });

    return new MarkerClusterer(map, allMarkers, {
      imagePath:
        '../../../assets/images/heart',
    });
  }

  createPopup(point, infoWindowTitle) {
    const { title, description, image, position } = point;

    // Using this pixel offset because the infowindow was triggering the mouseover & mouseout events on
    // the marker causing the window to open and close indefinitely.
    const pixelOffset = new google.maps.Size(0, -2);

    // Create and hook up info windows
    const content =
      `<div class="popup-content">
        <div class="popup-content__content">
          <h3>${title} <small class="coin-number">${infoWindowTitle}</small></h3>
          <div class="description">${description || ''}</div>
          <div class="image">
<!--            <img *ngIf="image" src="../../../assets/images/chimes/${image}" alt="Kindness Action Image" />-->
            <img src="../../../assets/images/elijah-laughing.jpg" alt="Kindness Action Image" />
          </div>
        </div>
      </div>`;

    return new google.maps.InfoWindow({
      content,
      position,
      pixelOffset,
    });
  }

  applyStyles(type: MarkerConfig) {
    const iconDefaults = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#FFFFFF',
      fillOpacity: 1,
      strokeWeight: 2,
    };

    switch (type) {
      case MarkerConfig.COIN: {
        return {
          icon: {
            ...iconDefaults,
            scale: DEFAULT_MARKER_RADIUS,
            fillColor: '#FFFFFF',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: kindnessGreen,
          },
        };
      }
      case MarkerConfig.ELIJAH: {
        return {
          icon: {
            ...iconDefaults,
            scale: 15,
            strokeColor: '#336699',
          },
        };
      }
    }
  }

  determineBounds(markers): LatLngBounds | undefined {
    const bounds = new google.maps.LatLngBounds();
    const clusterMarkers = markers.getMarkers();

    if (!clusterMarkers || !bounds.getNorthEast()) {
      return undefined;
    }

    // plot all marker points
    for (let i = 0; i < clusterMarkers.length; i++) {
      if (clusterMarkers[i]) {
        bounds.extend(clusterMarkers[i].getPosition());
      }
    }

    // check for whether we have the bounds for a single point
    // if so then pull back a bit so maps doesn't zoom too much
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
      const extendPoint = new google.maps.LatLng(bounds.getNorthEast().lat() + 1, bounds.getNorthEast().lng() + 1);
      bounds.extend(extendPoint);
    }
    return bounds;
  }

  clearAll(markers) {
    if (markers) {
      for (let i = 0; i < markers.length; i++) {
        if (markers[i]) {
          markers[i].setMap(null);
        }
      }
    }
    return markers;
  }
}
