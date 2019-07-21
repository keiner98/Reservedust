import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import {
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );

    return invalidCtrl || invalidParent;
  }
}
@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
})
export class RegistroComponent implements OnInit {
  myForm: FormGroup;
  passwords: FormGroup;

  showMap: boolean = false;
  loading: boolean = false;
  succcess: boolean = false;
  response: string;

  constructor(private fb: FormBuilder, private router: Router) {}
  ngOnInit() {
    this.passwords = this.fb.group(
      {
        pass: [
          "user123",
          [
            Validators.required,
            Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"),
          ],
        ],
        confirmPass: ["user123", [Validators.required]],
      },
      { validator: this.checkPasswords }
    );
    this.myForm = this.fb.group({
      name: ["Wilmer", [Validators.required]],
      lastname: ["Cantillo  ", [Validators.required]],
      phone: [
        "3008366711",
        [Validators.required, Validators.pattern("^[3]{1}[0-9]{9}$")],
      ],
      email: [
        "will.canti2697@gmail.com",
        [Validators.required, Validators.email],
      ],
      passwords: this.passwords,
      motel: ["motel", [Validators.required]],
      rooms: [3, [Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      address: [null, [Validators.required]],
      agree: [true, [Validators.requiredTrue]],
    });
    this.myForm.valueChanges.subscribe(console.log);
  }
  matcher = new MyErrorStateMatcher();

  checkPasswords(group: FormGroup) {
    let pass = group.controls.pass.value;
    let confirmPass = group.controls.confirmPass.value;
    let match = pass === confirmPass ? null : { notSame: true };
    return match;
  }
  //Form getters
  get name() {
    return this.myForm.get("name");
  }
  get lastname() {
    return this.myForm.get("lasname");
  }
  get phone() {
    return this.myForm.get("phone");
  }
  get email() {
    return this.myForm.get("email");
  }
  get password() {
    return this.myForm.get("password");
  }
  get password2() {
    return this.myForm.get("password2");
  }
  get motel() {
    return this.myForm.get("motel");
  }
  get rooms() {
    return this.myForm.get("rooms");
  }
  get latitude() {
    return this.myForm.get("latitude");
  }
  get longitude() {
    return this.myForm.get("longitude");
  }
  get address() {
    return this.myForm.get("address");
  }
  get agree() {
    return this.myForm.get("agree");
  }
  //setter
  //Get data from map
  getLat(Lat: number) {
    if (Lat) this.myForm.patchValue({ latitude: Lat });
  }
  getLon(Lon: number) {
    if (Lon) this.myForm.patchValue({ longitude: Lon });
  }
  getAddress(addr: string) {
    if (addr) this.myForm.patchValue({ address: addr });
  }

  confirm() {}
  mapLocate() {
    this.showMap = !this.showMap;
  }
  async send() {
    this.loading = true;
    const {
      name,
      lastname,
      phone,
      email,
      passwords,
      motel,
      rooms,
      latitude,
      longitude,
      address,
      agree,
    } = this.myForm.value;
    const data = {
      email: email,
      password: passwords.pass,
      userType: 2,
      motel: motel,
      phone: phone,
      state: 1,
      latitude: latitude,
      longitude: longitude,
    };
    const req = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    console.log(data);
    try {
      let status = await fetch("http://localhost:5000/motel/api/signup", req);
      let res = await status.json();
      this.response = res.ans;
      console.log(res);
      if (this.response === "Motel registrado") {
        this.router.navigate(["/admin"]);
      }
      this.succcess = true;
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }
}
