import { Component, OnInit } from '@angular/core';
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
    }
  `]
})
export class ZoomRangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -74.03773325096206, 4.753235974221012 ],
      zoom: 16
    });
  }

}
