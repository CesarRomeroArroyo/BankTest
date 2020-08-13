import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

import * as sjcl from 'sjcl';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
const secretKey = environment.secretKey;
Storage.prototype._setItem = Storage.prototype.setItem;
Storage.prototype.setItem = function(key, value) {
  try {
    const cryptoValue = sjcl.encrypt(secretKey, JSON.stringify(value));
    this._setItem(key, cryptoValue);
  } catch (error) {
    const cryptoValue = sjcl.encrypt(secretKey, value);
    this._setItem(key, cryptoValue);
  }
};

Storage.prototype._getItem = Storage.prototype.getItem;
Storage.prototype.getItem = function(key) {
  try {
    const crytoValue = JSON.parse(this._getItem(key));
    if (crytoValue) {
      const value =  sjcl.decrypt(secretKey, crytoValue).toString();
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    } else {
      return null;
    }
  } catch (e) {
    const crytoValue = this._getItem(key);
    if (crytoValue) {
      const value =  sjcl.decrypt(secretKey, crytoValue).toString();
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    } else {
      return null;
    }
  }
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
