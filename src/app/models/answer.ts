export class Answer {

    label: string="";
    isCorrect: boolean= false;

    constructor(label: string, isCorrect: boolean = false){
        this.label=label;
        this.isCorrect=isCorrect;
    }
}
