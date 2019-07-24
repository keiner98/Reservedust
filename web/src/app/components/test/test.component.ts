import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterContentInit,
} from "@angular/core";
declare var google: any;

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
})
export class testComponent implements OnInit {
  motelform: FormGroup;
  constructor(private fb: FormBuilder) {}
  maps: number[] = [1, 2, 3];
  //ngOnInit() {}
  ngOnInit() {
    this.mapAddress(
      "map0",
      "Cra. 1c #17-2 a 17-42, Santa Marta, Magdalena, Colombia"
    );
    this.mapAddress(
      "map1",
      "Cra. 1c #17-2 a 17-42, Santa Marta, Magdalena, Colombia"
    );
    this.mapAddress(
      "map2",
      "Cra. 1c #17-2 a 17-42, Santa Marta, Magdalena, Colombia"
    );
  }
  mapAddress(mapElement, address) {
    console.log("here");

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results);
        var mapOptions = {
          zoom: 14,
          center: results[0].geometry.location,
          disableDefaultUI: true,
        };
        var map = new google.maps.Map(
          document.getElementById(mapElement),
          mapOptions
        );
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
}
