import { Injectable } from '@angular/core';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  constructor() { }

  getQuestions(difficulty: string): Promise<Array<Question>> {


    return new Promise((resolve, reject) => {

      setTimeout(function () {

        switch (difficulty) {
          case "easy": resolve([new Question("Japanese Anime & Manga",
            "multiple",
            "easy",
            "In 'Fairy Tail', what is the nickname of Natsu Dragneel?",
            "The Salamander",
            ["The Dragon Slayer", "The Dragon", "The Demon"]
          ),
          new Question("Video Games",
            "boolean",
            "easy",
            "'Return to Castle Wolfenstein' was the only game of the Wolfenstein series where you don't play as William.J.Blazkowicz",
            "False",
            ["True"]
          )
          ]);
            break;
          case "medium": resolve([new Question("Science",
            "multiple",
            "medium",
            " Comment s'appelle le premier homme à avoir marché sur la lune ?",
            "Lance Amstrong",
            ["Buzz Aldrin", "Youri Gagarine", "Thomas Pesquet"]
          ),
          new Question("Science",
            "boolean",
            "medium",
            "Est-ce que la terre est ronde",
            "Vrai",
            ["Faux"]
          )]);
            break;
          case "hard": resolve([new Question(
            "Histoire",
            "multiple",
            "hard",
            "Comment s'appelle le roi soleil ?",
            "Louis XIV",
            ["Henry IV", "Louis XVI", "Charles III"]),
          new Question("Video Games",
            "multiple",
            "medium",
            "Quel saga racontes les aventures de link ?",
            "Zelda",
            ["Elden Ring", "Mario", "Mass Effect"]
          )]);
            break;
        }

      }, 4000);

    });
  }
}
