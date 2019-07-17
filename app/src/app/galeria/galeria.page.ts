import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagenModalPage } from '../imagen-modal/imagen-modal.page';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {



  constructor(private ModalCtrl: ModalController) { }


  imagenes=[
      "assets/img/orquidea.jpg",
      "assets/img/malibu.jpg",
      "assets/img/hacienda.jpg",
      "assets/img/orquidea.jpg",
      "assets/img/malibu.jpg",
      "assets/img/hacienda.jpg",
      "assets/img/orquidea.jpg",
      "assets/img/malibu.jpg",
      "assets/img/hacienda.jpg",
      "assets/img/orquidea.jpg",
      "assets/img/malibu.jpg",
      "assets/img/hacienda.jpg"
    ];

    verImagen(imagen){
      this.ModalCtrl.create({
        component: ImagenModalPage,
        componentProps: {
          imagen :  imagen
        }
      }).then(modal => modal.present())
    }







  ngOnInit() {
  }

}
