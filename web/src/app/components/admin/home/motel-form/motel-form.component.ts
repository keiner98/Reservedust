import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-motel-form",
  templateUrl: "./motel-form.component.html",
  styleUrls: ["./motel-form.component.scss"],
})
export class MotelFormComponent implements OnInit {
  motelform: FormGroup;
  response: string;
  succcess: boolean = false;
  @Input("i") i: string;

  @Input("idusuario") idusuario: string;
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.motelform = this.fb.group({
      idusuario: this.idusuario,
      motel: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      state: [1, [Validators.required]],
      roomAmount: ["", [Validators.required]],
      address: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
    });
    this.motelform.valueChanges.subscribe(console.log);
  }
  get motel() {
    return this.motelform.get("motel");
  }
  get phone() {
    return this.motelform.get("phone");
  }
  get roomAmount() {
    return this.motelform.get("roomAmount");
  }
  get latitude() {
    return this.motelform.get("latitude");
  }
  get longitude() {
    return this.motelform.get("longitude");
  }
  get address() {
    return this.motelform.get("address");
  }

  getLat(Lat: number) {
    if (Lat) this.motelform.patchValue({ latitude: Lat });
  }
  getLon(Lon: number) {
    if (Lon) this.motelform.patchValue({ longitude: Lon });
  }
  getAddress(addr: string) {
    if (addr) this.motelform.patchValue({ address: addr });
  }
  log() {}
  async send() {
    console.log(this.motelform.value);
    let regForm = new FormData();
    for (let field in this.motelform.value) {
      let formElement = this.motelform.get(`${field}`).value;
      if (formElement) {
        console.log(field);
        regForm.append(`${field}`, formElement);
      } else {
        if (field == "latitude") {
          return (this.response = "Por favor elige la ubicacion del motel");
        } else {
          return (this.response = "Por favor llena todos los campos");
        }
      }
    }
    try {
      let status = await fetch("http://localhost:5000/motel/api/regMotel", {
        method: "POST",
        body: regForm,
      });
      let res = await status.json();
      this.response = res.ans;
      console.log(res);
      if (this.response === "Motel registrado") {
        this.router.navigate([""]);
      }
      this.succcess = true;
    } catch (error) {
      console.log(error);
    }
  }
}
