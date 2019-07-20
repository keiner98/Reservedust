import { Component, OnInit } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetRef
} from "@angular/material/bottom-sheet";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"]
})
export class testComponent implements OnInit {
  ngOnInit() {}
  constructor(private _bottomSheet: MatBottomSheet) {}
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
}

declare var google: any;

@Component({
  selector: "bottom-sheet-overview-example-sheet",
  templateUrl: "map.html",
  styleUrls: ["./map.scss"]
})
export class BottomSheetOverviewExampleSheet {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>
  ) {}
  ngOnInit() {
    this.initMap();
  }

  initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 2,
      center: new google.maps.LatLng(2.8, -187.3),
      mapTypeId: "roadmap"
    });
  }
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
