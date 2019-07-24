import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatTable } from "@angular/material";

@Component({
  selector: "app-motel-table",
  templateUrl: "./motel-table.component.html",
  styleUrls: ["./motel-table.component.scss"],
})
export class MotelTableComponent implements OnInit {
  response: string;
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

  async delete(row) {
    console.log();
    try {
      let status = await fetch("http://localhost:5000/motel/api/remMotel", {
        method: "POST",
        body: JSON.stringify({ id: this.moteles[row].idmotel }),
        headers: { "Content-Type": "application/json" },
      });
      let res = await status.json();
      this.response = res.ans;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    this.moteles.splice(row, 1);
    this.table.renderRows();
  }
}
