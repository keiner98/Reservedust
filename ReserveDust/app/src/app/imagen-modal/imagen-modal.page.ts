import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';



@Component({
  selector: 'app-imagen-modal',
  templateUrl: './imagen-modal.page.html',
  styleUrls: ['./imagen-modal.page.scss'],
})
export class ImagenModalPage implements OnInit {

    imgenDesdeGaleria : string;
  constructor(private ModalCtrl: ModalController, private navParm: NavParams) {
    this.imgenDesdeGaleria = this.navParm.get('imagen');
    console.log(this.imgenDesdeGaleria);
   }

  ngOnInit() {
  }

  cerrarModal(){
    this.ModalCtrl.dismiss();
  }
}
