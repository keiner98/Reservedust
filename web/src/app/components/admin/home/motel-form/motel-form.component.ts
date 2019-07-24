import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-motel-form",
  templateUrl: "./motel-form.component.html",
  styleUrls: ["./motel-form.component.scss"],
})
export class MotelFormComponent implements OnInit {
  motelform: FormGroup;
  @Input("idusuario") idusuario: string;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.motelform = this.fb.group({
      motel: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      roomAmount: ["", [Validators.required]],
      state: [1, [Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      address: [null, [Validators.required]],
    });
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
  log() {
    console.log(this.motelform.value);
  }
  send() {
    let regForm = new FormData();
    for (let field in this.motelform.value) {
      if (field === "passwords") {
        let passwords = this.motelform.get(`${field}`).value;
        regForm.append("password", passwords.pass);
        continue;
      }
      regForm.append(`${field}`, this.motelform.get(`${field}`).value);
    }
    console.log(this.motelform.value);
  }
}
