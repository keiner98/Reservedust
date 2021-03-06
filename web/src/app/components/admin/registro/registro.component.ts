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
  img: string = "default.jpg";
  selectedFile: File = null;
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

  async onFile(e) {
    this.selectedFile = <File>e.target.files[0];
    const fd = new FormData();
    fd.append("perfil", this.selectedFile);
    try {
      let res = await fetch("http://localhost:5000/motel/api/upload", {
        method: "POST",
        body: fd,
      });
      let response = await res.json();
      this.img = response.name;
    } catch (error) {
      console.log(error);
    }
  }

  async send() {
    this.loading = true;
    console.log(this.myForm.value);
    let regForm = new FormData();
    for (let field in this.myForm.value) {
      if (field === "passwords") {
        let passwords = this.myForm.get(`${field}`).value;
        regForm.append("password", passwords.pass);
        continue;
      }
      regForm.append(`${field}`, this.myForm.get(`${field}`).value);
    }
    regForm.append("img", this.img);
    const req = {
      method: "POST",
      body: regForm,
    };
    try {
      let status = await fetch("http://localhost:5000/motel/api/signup", req);
      let res = await status.json();
      this.response = res.ans;
      console.log(res);
      if (this.response === "Motel registrado") {
        this.router.navigate(["admin"]);
      }
      this.succcess = true;
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }
}
