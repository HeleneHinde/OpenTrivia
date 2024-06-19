import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../../services/open-trivia.service';
import { Question } from '../../models/question';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trivial',
  templateUrl: './trivial.page.html',
  styleUrls: ['./trivial.page.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule]
})

export class TrivialPage implements OnInit {
  pseudo: string = "";
  selectedDifficulty: string = "easy";
  gameStarted: boolean = false;
  isAnswer: boolean = false;
  isNextQuestion: boolean = false;
  listQuestions: Question[] = [];
  currentQuestion: Question | undefined;
  number: number = 0;
  rejouer: boolean = false;
  score: number = 0;

  constructor(private openTriviaService: OpenTriviaService, private toastCtrl: ToastController, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  async ngOnInit() {
    this.number = 0;
    this.score = 0;
    this.isAnswer = false;
    this.rejouer = false;
    this.listQuestions = [];

    this.pseudo = this.activatedRoute.snapshot.params['name'];
    this.selectedDifficulty = this.activatedRoute.snapshot.params['difficulty'];
    this.listQuestions = await this.openTriviaService.setListQuestion(this.selectedDifficulty)
    this.currentQuestion = this.listQuestions[this.number];
  }

  async answerIt(isCorrect: boolean) {
    this.isAnswer = true;
    this.number++
    this.isNextQuestion = true;

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
  }

  nextQuestion() {
    this.isAnswer = false;
    this.isNextQuestion = false;
    this.currentQuestion = this.listQuestions[this.number];

    if (this.number >= (this.listQuestions.length)) {
      this.router.navigate(['/score', this.score]);
    }
  }
}