import { Component, OnInit } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";
declare var lat: number;
declare var lon: number;

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
})
export class RegistroComponent implements OnInit {
  showMap: boolean = false;
  name: string;
  lastname: string;
  phone: number;
  email: string;
  password: string;
  password2: string;
  motel: string;
  roomAmount: number;

  constructor(private _bottomSheet: MatBottomSheet) {}
  openBottomSheet(): void {
    this._bottomSheet.open(mapComponent);
  }
  mapLocate() {
    this.showMap = true;
  }
  ngOnInit() {
    google;
  }
  send() {
    // name, lastname,  roomamount, password2
    console.log(lat);
    let req = {
      usuario: this.email,
      contraseña: this.password,
      tipoUsuario: 2,
      nombreMotel: this.motel,
      telefono: this.phone,
      estado: 1,
      latitud: lat,
      longitud: lon,
    };
    console.log(req);
  }
}

declare var google: any;

@Component({
  selector: "bottom-sheet-overview-example-sheet",
  templateUrl: "map.html",
  styleUrls: ["./map.scss"],
})
export class mapComponent {
  map = null;
  marker = null;
  location: string;
  constructor(private _bottomSheetRef: MatBottomSheetRef<mapComponent>) {}
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit() {
    this.initMap();
  }
  initMap() {
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: new google.maps.LatLng(11.232623098616843, -74.19445037841797),
      mapTypeId: "roadmap",
    });

    google.maps.event.addListenerOnce(this.map, "click", e => {
      this.marker = new google.maps.Marker({
        position: e.latLng,
        draggable: true,
        map: this.map,
      }).addListener("dragend", async e => {
        let address = await this.getAddr(e.latLng);
        lat = e.latLng.lat();
        lon = e.latLng.lng();
        if (address.results[2]) {
          this.location = address.results[2].formatted_address;
        } else {
          this.location = "not found";
        }
      });
    });
  }
  async getAddr(latLng) {
    const addressRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?&latlng=${latLng.lat()},${latLng.lng()}&key=AIzaSyDqV0nn953l7QAY_1GKVKcQO6Md2YW2W1o`
    );
    const address = await addressRes.json();
    return address;
  }
}
