import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-trivial',
  templateUrl: './trivial.page.html',
  styleUrls: ['./trivial.page.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TrivialPage implements OnInit {
  pseudo: string = "";
  difficulties: string[] = ['easy', 'medium', 'hard'];
  selectedDifficulty: string = 'easy';
  saveInfo: boolean = false;
  gameStarted: boolean = false;
  answer: boolean = false;

  constructor() { }

  ngOnInit() { }

  pseudoInvalid() {
    return this.pseudo.length > 0 && this.pseudo.length < 3;
  }

  startGame() {
    if (this.pseudo.length >= 3) {
      this.gameStarted = true;
      // Logique supplémentaire pour sauvegarder les informations si nécessaire
      if (this.saveInfo) {
        localStorage.setItem('pseudo', this.pseudo);
        localStorage.setItem('difficulty', this.selectedDifficulty);
      }
    }
  }

  answerIt() {
    this.answer = true;
  }
}
