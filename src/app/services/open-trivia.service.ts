import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {
  listQuestions: Question[]=[];

  constructor(private http: HttpClient) { }

  getQuestions(difficulty: string): Promise<any> {

    return new Promise((resolve, reject) => {

      this.http.get('https://opentdb.com/api.php?amount=5&difficulty=' + difficulty).subscribe({
        next: (result: any) => {
          resolve(result);
        }, error: (err) => {
          reject(err);
        }, complete: () => { }
      });

    });
  }

  async setListQuestion(selectedDifficulty: string) {
    this.listQuestions=[];
    // Récupèration des données du service
    const result = await this.getQuestions(selectedDifficulty);

    // On parcourt le tableau de questions obtenu
    result.results.forEach((question: any) => {
      // On crée un tableau des réponses possibles pour la question
      let listAnswers = [];
      listAnswers.push(new Answer(question.correct_answer, true));
      question.incorrect_answers.forEach((ans: string) => {
        listAnswers.push(new Answer(ans));
      })
      // On mélange le tableau de réponses
      listAnswers.sort((a, b) => 0.5 - Math.random());
      // On ajoute la question au tableau de "Question"
      
      
      this.listQuestions.push(new Question(question.category, question.type, question.difficulty, question.question, listAnswers));
      console.log('setListQuestion')
      console.log(this.listQuestions);
    });
    return this.listQuestions;
  }
}
