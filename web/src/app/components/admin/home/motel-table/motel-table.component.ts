import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatTable } from "@angular/material";

@Component({
  selector: "app-motel-table",
  templateUrl: "./motel-table.component.html",
  styleUrls: ["./motel-table.component.scss"],
})
export class MotelTableComponent implements OnInit {
  @ViewChild("testTable", { static: false }) table: MatTable<any>;
  @Input("moteles") moteles: object[];
  @Input("i") i: string;

  motelTable: string[] = [
    "nombreMotel",
    "telefono",
    "estado",
    "habitaciones",
    "direccion",
    "idmotel",
  ];
  constructor() {}

  ngOnInit() {
    console.log(this.moteles);
  }

  delete(row) {
    console.log(this.table);
    console.log("row" + row);
    this.moteles.splice(row, 1);
    console.log(this.moteles);
    this.table.renderRows();
  }
}
