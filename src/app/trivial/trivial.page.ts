import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule, ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../services/open-trivia.service';
import { Question } from '../models/question';

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
  question: Question[] = [];
  number: number = 0;
  rejouer: boolean = false;
  score: number = 0;
  classText: boolean = false;

  constructor(private openTriviaService: OpenTriviaService, private toastCtrl: ToastController) { }

  ngOnInit() { }

  pseudoInvalid() {

    if (this.pseudo.length > 0 && this.pseudo.length < 3)
      this.isToast = true;
    else
      this.isToast = false;
  }

  async startGame() {
    if (this.pseudo.length >= 3) {
      this.gameStarted = true;
      this.isToast = false;
      // Logique supplémentaire pour sauvegarder les informations si nécessaire
      if (this.saveInfo) {
        localStorage.setItem('pseudo', this.pseudo);
        localStorage.setItem('difficulty', this.selectedDifficulty);
      }

      try {
        this.question = await this.openTriviaService.getQuestions(this.selectedDifficulty);
      } catch (error) {
        console.error('Erreur lors de la récupération des questions :', error);
        // Gérer l'erreur, par exemple afficher un message à l'utilisateur
      }

    } else {
      this.isToast = true;
    }
  }

  async restartGame() {
    this.number=0;
    this.score=0;
    this.classText=false;
    this.answer = false;
    this.rejouer = false;

    try {
      this.question = await this.openTriviaService.getQuestions(this.selectedDifficulty);
    } catch (error) {
      console.error('Erreur lors de la récupération des questions :', error);
      // Gérer l'erreur, par exemple afficher un message à l'utilisateur
    }
  }

  async answerIt(isCorrect: boolean) {
    this.classText = true;

    if (isCorrect) {
      this.score++
    } else {
      const toast = this.toastCtrl.create({
        message: "tu t'es trompé !",
        duration: 3500,
        position: 'middle'
      });
      (await toast).present();
    }

    if (this.number < (this.question.length - 1)) {
      this.answer = true;
    } else {
      const toast = this.toastCtrl.create({
        message: "ton score est de " + this.score,
        duration: 3500,
        position: 'middle'
      });
      (await toast).present();

      this.rejouer = true;
    }


  }

  nextQuestion() {
    this.number++
    this.answer = false;
    this.classText = false;
  }
}