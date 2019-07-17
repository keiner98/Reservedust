import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";

declare var google: any;

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  mapRef = null;
  markers = [];
  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMap(this.router);
  }
  async loadMap(router) {
    console.log(router);
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    const mapEle: HTMLElement = document.getElementById("map");
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 5
    });

    google.maps.event.addListenerOnce(this.mapRef, "idle", () => {
      loading.dismiss();
      this.MiPosicion(myLatLng.lat, myLatLng.lng);
      console.log(myLatLng);
      this.buscarMotel(router);
    });
  }

  buscarMotel = async router => {
    const myLatLng = await this.getLocation();
    let response = await fetch("http://localhost:5000/motel/api");
    let data = await response.json();
    this.markers = [];
    data.map((motel, id) => {
      let lat = parseFloat(motel.latitud);
      let lng = parseFloat(motel.longitud);
      let mark = new google.maps.Marker({
        position: { lat, lng },
        map: this.mapRef,
        icon: "https://img.icons8.com/color/48/000000/hotel-information.png"
      });
      // get distance
      var dis = this.distancia(myLatLng.lat, myLatLng.lng, lat, lng);
      mark.addListener("dblclick", function() {
        router.navigate([`/hreserva/${motel.idmotel}`]);
      });
      // message
      var contenido = ` Motel ${motel.nombreMotel}, distancia ${dis}`;
      // contenido = contenido,"Km";
      this.Mensaje(mark, contenido);
      this.markers.push(mark);
    });
    console.log(this.markers);
  };

  private MiPosicion(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: "Estoy aqui"
    });
  }

  private Mensaje(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, "click", () => {
      infoWindow.open(this.mapRef, marker);
    });
  }

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  private distancia(lat1, lon1, lat2, lon2) {
    const rad = function(x) {
      return (x * Math.PI) / 180;
    };
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(lat1)) *
        Math.cos(rad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(3);
  }
}
