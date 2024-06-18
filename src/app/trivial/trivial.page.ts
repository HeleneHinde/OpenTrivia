import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-trivial',
  templateUrl: './trivial.page.html',
  styleUrls: ['./trivial.page.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule]
})
export class TrivialPage implements OnInit {
  pseudo: string = "";
  difficulties: string[] = ['easy', 'medium', 'hard'];
  selectedDifficulty: string = this.difficulties[0];
  saveInfo: boolean = false;
  gameStarted: boolean = false;
  answer: boolean = false;
  isToast: boolean = false;

  constructor() { }

  ngOnInit() { }

  pseudoInvalid() {

    if(this.pseudo.length > 0 && this.pseudo.length < 3)
      this.isToast=true;
    else
    this.isToast=false;
  }

  startGame() {
    if (this.pseudo.length >= 3) {
      this.gameStarted = true;
      this.isToast=false;
      // Logique supplémentaire pour sauvegarder les informations si nécessaire
      if (this.saveInfo) {
        localStorage.setItem('pseudo', this.pseudo);
        localStorage.setItem('difficulty', this.selectedDifficulty);
      }
    } else {
      this.isToast=true;
    }
  }

  answerIt() {
    this.answer = true;
  }
}
