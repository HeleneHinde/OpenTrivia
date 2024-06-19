import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  title: string= 'Introduction à Angular';
  sizeText: number =20;
  srcImg: string ='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pixelstalk.net%2Fwp-content%2Fuploads%2F2016%2F03%2FFree-download-Pikachu-wallpaper-HD.jpg&f=1&nofb=1&ipt=29449b4ab4fdcd8ee735c3771355459f5b1ec6e0bcc72687369cfb41be69d545&ipo=images';
  altImg: string='Pikachu';
  isHidden: boolean=true;
  listFruits: string[]= ['papaye', 'tomate']
  classText:number= 1;
  constructor() {}

  doSomething(){
    alert('ahahah');
  }

  changeVisibility(){
    if(this.isHidden){
      this.isHidden=false;
    } else {
      this.isHidden=true;
    }
  }
}
