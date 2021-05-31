import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
    #map {
      height: 100%;
      width: 100%;
    }
  `]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    ( mapboxgl as any ).accessToken = 'pk.eyJ1IjoiamNhbWlsb3ZlbGFuZGlhYiIsImEiOiJja3BjMWh3dXQxMnc5Mm5ueml4a2ZsOXVqIn0.OdbCutgvxknlsBsCpid4dw';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
    });

  }

}
