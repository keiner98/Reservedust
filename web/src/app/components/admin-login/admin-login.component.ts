import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  email: string;
  password: string;
  invalid: string;

  async send() {
    const reqBody = {
      usuario: this.email,
      contraseña: this.password,
      tipoUsuario: 1
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
      if(this.invalid == "success"){
        this.router.navigate(['/admin', data.userInfo])
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }


}
