import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  users: object[];
  loading: boolean = false;
  moteles: object[];
  step = 0;
  constructor() {}

  async ngOnInit() {
    try {
      let res = await fetch("http://localhost:5000/motel/api/usuario");
      this.users = await res.json();
    } catch (err) {
      console.log(err);
    }
  }
  setStep(index: number) {
    this.step = index;
  }
  async getData(idusuario) {
    this.loading = true;
    const data = { idusuario: idusuario };
    const req = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    console.log(data);
    try {
      let status = await fetch("http://localhost:5000/motel/api/motel", req);
      this.moteles = await status.json();
      console.log(this.moteles);
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }
}
