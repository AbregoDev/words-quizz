import { Component } from '@angular/core';
import { IonHeader, IonContent, IonFooter, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonContent, IonFooter, IonToolbar, IonTitle
  ],
})
export class HomePage { }
