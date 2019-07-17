import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
lista=[];

  constructor(private router:Router){
    this.lista =[
      {
        id:1,
        Ubicacion: "assets/img/orquidea.jpg",
        Nombre: "La Orquidea",
        Precio: "35.000",
        Tiempo: "3"
      },
      {
        id:2,
        Ubicacion: "assets/img/malibu.jpg",
        Nombre: "Malibu",
        Precio: "25.000",
        Tiempo: "3"
      },
      {
        id:3,
        Ubicacion: "assets/img/hacienda.jpg",
        Nombre: "La Hacienda",
        Precio: "27.000",
        Tiempo: "4"
      }
  ]
  }

 



}