import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule, ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../services/open-trivia.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';

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
  isAnswer: boolean = false;
  isNextQuestion: boolean= false;
  isToast: boolean = false;
  listQuestions: Question[] = [];
  currentQuestion: Question|undefined;
  number: number = 0;
  rejouer: boolean = false;
  score: number = 0;

  constructor(private openTriviaService: OpenTriviaService, private toastCtrl: ToastController) { }

  ngOnInit() { }

  pseudoInvalid() {

    if (this.pseudo.length > 0 && this.pseudo.length < 3)
      this.isToast = true;
    else
      this.isToast = false;
  }

  startGame() {
    if (this.pseudo.length >= 3) {
      this.gameStarted = true;
      this.isToast = false;
      // Logique supplémentaire pour sauvegarder les informations si nécessaire
      if (this.saveInfo) {
        localStorage.setItem('pseudo', this.pseudo);
        localStorage.setItem('difficulty', this.selectedDifficulty);
      }

      this.getListQuestion()

    } else {
      this.isToast = true;
    }
  }

  restartGame() {
    this.number = 0;
    this.score = 0;
    this.isAnswer = false;
    this.rejouer = false;
    this.listQuestions=[];

    this.getListQuestion()
  }

  async answerIt(isCorrect: boolean) {
    this.isAnswer = true;
    this.number++
    this.isNextQuestion= true;

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

console.log(this.number);
console.log(this.listQuestions.length);

    if (this.number >= (this.listQuestions.length)) {
      this.isNextQuestion=false;

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
    this.isAnswer = false;
    this.isNextQuestion=false;
    this.currentQuestion= this.listQuestions[this.number];
  }

  async getListQuestion() {
    // Récupèration des données du service
    const result = await this.openTriviaService.getQuestions(this.selectedDifficulty);

    console.log(result);
    // On parcourt le tableau de questions obtenu
    result.results.forEach((question: any) => {
      // On crée un tableau des réponses possibles pour la question
      let listAnswers = [];
      listAnswers.push( new Answer(question.correct_answer, true));
      question.incorrect_answers.forEach((ans: string) => {
        listAnswers.push(new Answer(ans));
      })
      // On mélange le tableau de réponses
      listAnswers.sort((a, b) => 0.5 - Math.random());
      // On ajoute la question au tableau de "Question"
      this.listQuestions.push(new Question(question.category, question.type, question.difficulty, question.question, listAnswers));

      this.currentQuestion= this.listQuestions[this.number];
   
    });
  }
}