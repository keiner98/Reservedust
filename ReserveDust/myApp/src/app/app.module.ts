import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ComponentsModule } from './components/components.module';
import { ImagenModalPageModule } from './imagen-modal/imagen-modal.module';
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ComponentsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, ImagenModalPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    NativeGeocoder,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
