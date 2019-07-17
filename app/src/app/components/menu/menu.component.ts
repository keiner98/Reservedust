import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {}

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Comunicate con nosotros',
      message: '+57 314 263 7991',
      buttons: ['OK']
    });

    await alert.present();
  }

}
