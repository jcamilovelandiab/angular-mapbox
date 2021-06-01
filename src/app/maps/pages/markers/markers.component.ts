import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface ColorMarker {
  color: string;
  marker?: mapboxgl.Marker,
  center?: [ number, number ]
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [`
    .map-container {
      height: 100%;
      width: 100%;
    }
    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-Index: 99;
    }
    li {
      cursor: pointer;
    }
  `]
})
export class MarkersComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef;

  map!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [ number, number ] = [ -74.03773325096206, 4.753235974221012 ];

  markers: ColorMarker[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // const marker = new mapboxgl.Marker()
    //     .setLngLat( this.center )
    //     .addTo( this.map );
    this.readMarkersFromLocalStorage();
  }

  addMarker() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const newMarker = new mapboxgl.Marker({
          draggable: true,
          color
        })
        .setLngLat( this.center )
        .addTo( this.map );
    this.markers.push({
      color,
      marker: newMarker
    });
    this.saveMarkersLocalStorage();
    newMarker.on('dragend', () => {
      this.saveMarkersLocalStorage();
    });
  }

  goToMarker( marker: mapboxgl.Marker ) {
    this.map.flyTo({
      center: marker.getLngLat()
    });
  }

  saveMarkersLocalStorage() {
    const colorMarkerArray: ColorMarker[] = [];
    this.markers.forEach( m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
      colorMarkerArray.push({
        color,
        center: [ lng, lat ]
      });
    });
    localStorage.setItem('markers', JSON.stringify(colorMarkerArray) );

  }

  readMarkersFromLocalStorage() {
    if( !localStorage.getItem('markers') ) {
      return;
    }
    const colorMarkerArray: ColorMarker[] = JSON.parse( localStorage.getItem('markers')! );
    colorMarkerArray.forEach( colorMarker => {

      const newMarker = new mapboxgl.Marker({
            color: colorMarker.color,
            draggable: true
          })
          .setLngLat( colorMarker.center! )
          .addTo( this.map );

      this.markers.push({
        color: colorMarker.color,
        marker: newMarker
      });

      newMarker.on('dragend', () => {
        this.saveMarkersLocalStorage();
      });

    });
  }

  removeMarker( index: number ) {
    this.markers[index].marker?.remove();
    this.markers.splice( index, 1 );
    this.saveMarkersLocalStorage();
  }

}
