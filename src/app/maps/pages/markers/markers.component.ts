import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [`
    .map-container {
      height: 100%;
      width: 100%;
    }
  `]
})
export class MarkersComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef;

  map!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [ number, number ] = [ -74.03773325096206, 4.753235974221012 ];

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    const marker = new mapboxgl.Marker()
        .setLngLat( this.center )
        .addTo( this.map );

  }

}
