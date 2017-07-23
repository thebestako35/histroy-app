import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';

declare var google;

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation) {

  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    // console.log(this.geolocation.getCurrentPosition());

    this.geolocation.getCurrentPosition().then((resp) => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 19,
      center: {lat: resp.coords.latitude, lng: resp.coords.longitude}
    });

    this.directionsDisplay.setMap(this.map);

    }).catch((error) => {
      console.log('Error getting location', error);
    })

    
  }
  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        console.log(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}