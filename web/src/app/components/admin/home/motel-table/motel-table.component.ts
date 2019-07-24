import { Component, OnInit, ViewChild, Input, OnChanges } from "@angular/core";
import { DataSource } from "@angular/cdk/collections";
import { CdkTable } from "@angular/cdk/table";
import { Observable, BehaviorSubject } from "rxjs";

export interface Element {
  direccion: string;
  estado: number;
  habitaciones: number;
  idmotel: number;
  idusuario: number;
  latitud: string;
  longitud: string;
  nombreMotel: string;
  telefono: number;
}

@Component({
  selector: "app-motel-table",
  templateUrl: "./motel-table.component.html",
  styleUrls: ["./motel-table.component.scss"],
})
export class MotelTableComponent implements OnInit {
  response: string;
  @ViewChild("testTable", { static: false }) table: CdkTable<any>;
  @Input("i") i: string;

  @Input("moteles") moteles: Element[];
  dataSource: ExampleDataSource;

  motelTable: string[] = [
    "nombreMotel",
    "telefono",
    "estado",
    "habitaciones",
    "direccion",
    "idmotel",
  ];
  constructor() {}
  ngOnChanges() {
    this.dataSource = new ExampleDataSource(this.moteles);
  }
  ngOnInit() {}
  update(el: Element, nombreMotel: string) {
    if (nombreMotel == null) {
      return;
    }
    // copy and mutate
    const copy = this.dataSource.data().slice();
    el.nombreMotel = nombreMotel;
    this.dataSource.update(copy);
  }

  async delete(row) {
    try {
      let status = await fetch("http://localhost:5000/motel/api/remMotel", {
        method: "POST",
        body: JSON.stringify({ id: this.dataSource.data()[row].idmotel }),
        headers: { "Content-Type": "application/json" },
      });
      let res = await status.json();
      this.response = res.ans;
    } catch (error) {
      console.log(error);
    }
    this.dataSource.data().splice(row, 1);
    this.table.renderRows();
  }
}

export class ExampleDataSource extends DataSource<Element> {
  private dataSubject = new BehaviorSubject<Element[]>([]);

  data() {
    return this.dataSubject.value;
  }

  update(data) {
    this.dataSubject.next(data);
  }

  constructor(data: any[]) {
    super();
    this.dataSubject.next(data);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return this.dataSubject;
  }

  disconnect() {}
}
