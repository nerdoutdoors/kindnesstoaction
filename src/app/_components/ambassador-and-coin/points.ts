import { get } from 'lodash';
import { Injectable } from '@angular/core';
import MarkerOptions = google.maps.MarkerOptions;
import LatLngBounds = google.maps.LatLngBounds;
import MarkerClusterer from '@googlemaps/markerclustererplus';

export const ELIJAH_COIN_NUMBER = '012104';
export const DEFAULT_MARKER_RADIUS = 15;

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

    if (!points || points.length < 1) {
      return undefined;
    }

    points.forEach((point) => {
      const { latitude, longitude, coin_num } = point;

      const position = {
        lat : parseFloat( latitude ),
        lng : parseFloat( longitude )
      };

      const popup = this.createPopup(point, `Chime #${coin_num}`);
      const markerStyles = this.applyStyles(coin_num === ELIJAH_COIN_NUMBER ? MarkerConfig.ELIJAH : MarkerConfig.COIN);

      // create marker and apply styles
      const marker = new google.maps.Marker({
        position,
        map,
        ...markerStyles,
        label: {
          text: 'K'
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

      allMarkers.push(marker as never);
      return;
    });

    return new MarkerClusterer(map, allMarkers, {
      imagePath:
        '../../../assets/images/m',
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
        <h2 class="popup-content__title">${infoWindowTitle}</h2>
        <div class="popup-content__content">
        <h3>${title}</h3>
        <div class="content">${description || ''}</div>
        <div class="content content--image">${image || ''}</div>
      </div>`;

    return new google.maps.InfoWindow({
      content,
      position,
      pixelOffset,
    });
  }

  applyStyles(type: MarkerConfig) {
    switch (type) {
      case MarkerConfig.COIN: {
        return {
          label: {
            color: '#000',
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: DEFAULT_MARKER_RADIUS,
            fillColor: '#FFFFFF',
            fillOpacity: 1,
            strokeWeight: 3.5,
            strokeColor: kindnessGreen,
          },
        };
      }
      case MarkerConfig.ELIJAH: {
        return {
          label: {
            color: '#FFFFFF',
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 25,
            fillColor: '#FFFFFF',
            fillOpacity: 1,
            strokeWeight: 2,
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
