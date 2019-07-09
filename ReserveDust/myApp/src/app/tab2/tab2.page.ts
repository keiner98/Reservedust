import { Component,OnInit  } from '@angular/core';
import { Geolocation} from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';

declare var google:any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{
  mapRef = null;

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController
  ) {

  }

  ngOnInit() {
    this.loadMap();
  }
  

  

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 16
    });


    google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.MiPosicion(myLatLng.lat, myLatLng.lng);
    
      this.AgregarMotel(myLatLng.lat, myLatLng.lng,11.22851897509651,-74.14676070213318);
      this.AgregarMotel(myLatLng.lat, myLatLng.lng,11.226187, -74.162567)
    });
  }



  private MiPosicion(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: 'Estoy aqui'
    });
  }










  private AgregarMotel(lati,longi,lat: number, lng: number) {
    var dis = this.distancia(lati, longi, lat, lng);  

    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      icon: "https://img.icons8.com/color/48/000000/hotel-information.png"
    });
    var contenido = "Se encentra a "+dis+"Kms";
  // contenido = contenido,"Km";
    this.Mensaje(marker, contenido);
  

  }






  private Mensaje(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
        content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
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
 

   private distancia(lat1,lon1,lat2,lon2){
    const rad = function(x) {return x*Math.PI/180;}
    var R     = 6378.137;                          //Radio de la tierra en km
    var dLat  = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d.toFixed(3); 

  }


}