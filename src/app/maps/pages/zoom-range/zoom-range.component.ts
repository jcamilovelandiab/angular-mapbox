import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .map-container {
      height: 100%;
      width: 100%;
    }
    .row {
      background-color: white;
      position: fixed;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      z-index: 999;
      width: 400px;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef;

  map!: mapboxgl.Map;
  zoomLevel: number = 10;

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -74.03773325096206, 4.753235974221012 ],
      zoom: this.zoomLevel
    });
    this.map.on('zoom', ( event ) => {
      this.zoomLevel = this.map.getZoom();
    });
    this.map.on('zoomend', ( event ) => {
      if( this.map.getZoom() > 18 ) {
        this.map.zoomTo( 18 );
      }
    });
  }

  zoomOut() {
    this.map.zoomOut();
  }

  zoomIn() {
    this.map.zoomIn();
  }

  zoomChanged( value: string ) {
    this.map.zoomTo( Number(value) );
  }

}
