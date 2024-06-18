import { Answer } from "./answer";

export class Question {

    category: string = "";
    type: string = "";
    difficulty: string = "";
    question: string = "";
    answers: Answer[]=[];

    constructor(category: string,
        type: string,
        difficulty: string,
        question: string,
        answers: Answer[],) {
        this.category = category;
        this.type = type;
        this.difficulty = difficulty;
        this.question = question;
        this.answers=answers;
    }
}
