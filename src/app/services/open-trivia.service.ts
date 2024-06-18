import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  constructor() { }

  getQuestions(difficulty: string): Promise<Array<any>> {


    return new Promise((resolve, reject) => {

      setTimeout(function () {

        switch (difficulty) {
          case "easy": resolve([{
            category: "Japanese Anime & Manga",
            type: "multiple",
            difficulty: "easy",
            question: "In 'Fairy Tail', what is the nickname of Natsu Dragneel?",
            correct_answer: "The Salamander",
            incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"]
           },
           {
            category: "Video Games",
            type: "boolean",
            difficulty: "easy",
            question: "'Return to Castle Wolfenstein' was the only game of the Wolfenstein series where you don't play as William.J.Blazkowicz",
            correct_answer: "False",
            incorrect_answers: ["True"]
           }
         ]);
            break;
          case "medium": resolve([{
            category: "Science",
            type: "multiple",
            difficulty: "medium",
            question: " Comment s'appelle le premier homme à avoir marché sur la lune ?",
            correct_answer: "Lance Amstrong",
            incorrect_answers: ["Buzz Aldrin", "Youri Gagarine", "Thomas Pesquet"]
           },
           {
            category: "Science",
            type: "boolean",
            difficulty: "medium",
            question: "Est-ce que la terre est ronde",
            correct_answer: "Vrai",
            incorrect_answers: ["Faux"]
           }]);
            break;
          case "hard": resolve([{
            category: "Histoire",
            type: "multiple",
            difficulty: "hard",
            question: "Comment s'appelle le roi soleil ?",
            correct_answer: "Louis XIV",
            incorrect_answers: ["Henry IV", "Louis XVI", "Charles III"]
           },
           {
            category: "Video Games",
            type: "multiple",
            difficulty: "medium",
            question: "Quel saga racontes les aventures de link ?",
            correct_answer: "Zelda",
            incorrect_answers: ["Elden Ring", "Mario", "Mass Effect"]
           }]);
            break;
        }

      }, 4000);

    });
  }
}
