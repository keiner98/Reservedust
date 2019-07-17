import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  email: string;
  password: string;
  invalid: string;

  async send() {
    const reqBody = {
      usuario: this.email,
      contraseña: this.password,
      tipoUsuario: 2
    };
    console.log(reqBody);
    const req = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" }
    };
    try {
      let res = await fetch("http://localhost:5000/motel/api/login", req);
      let data = await res.json();
      this.invalid = data.ans;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
}
