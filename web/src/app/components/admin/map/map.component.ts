import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { typeofExpr } from "@angular/compiler/src/output/output_ast";
declare var google: any;

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  @Output() addressToReg = new EventEmitter<string>();
  @Output() lat = new EventEmitter<number>();
  @Output() lon = new EventEmitter<number>();
  map = null;
  marker = null;
  location: string;
  constructor() {}

  ngOnInit() {
    this.initMap();
  }
  initMap() {
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: new google.maps.LatLng(11.232623098616843, -74.19445037841797),
      mapTypeId: "roadmap",
    });

    google.maps.event.addListenerOnce(this.map, "click", async e => {
      this.marker = new google.maps.Marker({
        position: e.latLng,
        draggable: true,
        map: this.map,
      }).addListener("dragend", async e => {
        let address = await this.getAddr(e.latLng);
        if (address.results[2]) {
          this.location = address.results[2].formatted_address;
        } else {
          this.location = "not found";
        }
        this.addressToReg.emit(this.location);
        this.lat.emit(e.latLng.lat());
        this.lon.emit(e.latLng.lng());
      });
      let initAddress = await this.getAddr(e.latLng);
      if (initAddress.results[2]) {
        this.location = initAddress.results[2].formatted_address;
      } else {
        this.location = "not found";
      }
      this.addressToReg.emit(this.location);
      this.lat.emit(e.latLng.lat());
      this.lon.emit(e.latLng.lng());
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
