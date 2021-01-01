import { get } from 'lodash';
import { Injectable } from '@angular/core';
import MarkerOptions = google.maps.MarkerOptions;
import LatLngBounds = google.maps.LatLngBounds;

export enum MarkerConfig {
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
      const { lat, lng } = point;
      // create popup

      // get corresponding marker styles
      // const markerStyles = this.applyStyles(MarkerConfig[`${type}`]);

      // apply styles to label
      // const label =
      //   type !== MarkerConfig.CORE_EVENT
      //     ? {
      //       text: portCode,
      //       ...markerStyles['label'],
      //     }
      //     : null;

      const position = {
        lat : parseFloat( lat ),
        lng : parseFloat( lng )
      };

      // create marker and apply styles
      const marker = new google.maps.Marker({
        position,
        map,
        // ...markerStyles,
        // label,
        icon: {
          // path: google.maps.SymbolPath.CIRCLE,
          // ...markerStyles['icon'],
        },
      } as MarkerOptions);

      allMarkers.push(marker as never);
      return;
    });

    // TODO: move back into marker generation when points have unique information
    // allMarkers.forEach((marker) => {
    //   // add event listeners
    //   marker.addListener('mouseover', () => {
    //     popup.open(map, marker);
    //   });
    //   marker.addListener('mouseout', () => {
    //     popup.close();
    //   });
    // });

    return allMarkers;
  }

  createPopup(point, title, contents) {
    const { position } = point;

    // Using this pixel offset because the infowindow was triggering the mouseover & mouseout events on the marker causing the window to open and close indefinitely.
    const pixelOffset = new google.maps.Size(0, -2);

    // Create and hook up info windows
    const content =
      '<div class="popup-content">' +
      '<h1 class="popup-content__title">' +
      title +
      '</h1>' +
      '<div class="popup-content__content">' +
      contents.reduce((acc, curr) => {
        acc += '<div class="content">' + curr + '</div>';
        return acc;
      }, '') +
      '</div>' +
      '</div>';

    return new google.maps.InfoWindow({
      content,
      position,
      pixelOffset,
    });
  }

  applyStyles(type: MarkerConfig) {
    const port = {
      label: {
        color: '#FFFFFF',
      },
      icon: {
        scale: 20,
        fillColor: '#336699',
        fillOpacity: 1,
        strokeWeight: 1.5,
        strokeColor: '#FFFFFF',
      },
    };
  }

  determineBounds(markers): LatLngBounds | undefined {
    const bounds = new google.maps.LatLngBounds();

    if (!markers || !bounds.getNorthEast()) {
      return undefined;
    }

    // plot all marker points
    for (let i = 0; i < markers.length; i++) {
      if (markers[i]) {
        bounds.extend(markers[i].getPosition());
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
