import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

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
}
