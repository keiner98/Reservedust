import { Component, OnInit, ViewChild, QueryList } from "@angular/core";
import { MatTable } from "@angular/material";

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
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  // @ViewChildren('cmp') components:QueryList<CustomComponent>;
  users: object[];
  idUser: number;
  url: string = "http://localhost:5000/uploads/perfil/";
  loading: boolean = false;
  addingMotel: boolean = false;
  moteles: Element[];
  step = null;
  constructor() {}

  async ngOnInit() {
    try {
      let res = await fetch("http://localhost:5000/motel/api/usuario");
      this.users = await res.json();
    } catch (err) {
      console.log(err);
    }
  }
  jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  setStep(index: number) {
    this.step = index;
  }
  async getData(idusuario) {
    this.idUser = idusuario;
    this.addingMotel = false;
    this.loading = true;
    const data = { idusuario: idusuario };
    const req = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    try {
      let status = await fetch("http://localhost:5000/motel/api/motel", req);
      this.moteles = await status.json();
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }
  addMotel() {
    this.addingMotel = true;
  }
  isAdingMotel(adding: boolean) {
    this.addingMotel = adding;
    this.getData(this.idUser);
  }
}
