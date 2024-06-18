import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {IonicModule, ToastController} from '@ionic/angular';
import { OpenTriviaService } from '../services/open-trivia.service';

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
  question: any[] = [];
  number: number = 0;

  constructor(private openTriviaService: OpenTriviaService, private toastCtrl: ToastController) { }

  ngOnInit() { }

  pseudoInvalid() {

    if(this.pseudo.length > 0 && this.pseudo.length < 3)
      this.isToast=true;
    else
    this.isToast=false;
  }

  async startGame() {
    if (this.pseudo.length >= 3) {
      this.gameStarted = true;
      this.isToast=false;
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
      this.isToast=true;
    }
  }

  async answerIt(isCorrect: boolean) {
    if(isCorrect){
      this.answer = true;
    } else {
      const toast = this.toastCtrl.create({
        message: "tu t'es trompé, essaie encore !",
        duration: 3500,
        position: 'middle'
      });
      (await toast).present();
    }

    
  }

  nextQuestion(){
    this.number++
    this.answer = false;

    if(this.number >= this.question.length)
      this.number=0;
  }
}
