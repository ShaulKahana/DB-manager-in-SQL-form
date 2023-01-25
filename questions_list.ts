import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { check } from "./check_input";

interface Iquestion {
    
        question: string,
        name: string,
        type: string,
        length: number,
}


export const questions:Array<Iquestion> = [
    {
        question: "Enter your ID: ",
        name: "id: ",
        type: "id",
        length: 9,
    },
    {
        question: "Enter your First name: ",
        name: "First name: ",
        type: "string",
        length: 20,
    },
    {
        question: "Enter your Family name: ",
        name: "Family name: ",
        type: "string",
        length: 20,
    },
    {
        question: "Enter your your Age: ",
        name: "Age: ",
        type: "number",
        length: 2,
    },
    {
        question: "Enter your Country name: ",
        name: "Country name: ",
        type: "string",
        length: 20,
    },
    {
        question: "Enter your City name: ",
        name: "City name: ",
        type: "string",
        length: 20,
    },
    {
        question: "Enter your Street name: ",
        name: "Street name: ",
        type: "string",
        length: 20,
    },
    {
        question: "Enter your House number: ",
        name: "House number: ",
        type: "number",
        length: 3,
    },
    {
        question: "Enter your Gender(Male/Female): ",
        name: "Gender: ",
        type: "gender",
        length: 6,
    },
    {
        question: "Enter the Number of kids: ",
        name: "Number of kids: ",
        type: "number",
        length: 2,
    },
];

async function run(){
    
    const rl = readline.createInterface({ input, output, terminal: false });
    const answers: Array<string> = [];
    
    for (const question of questions) {
        let answer = await rl.question(`${question.question}`).then((data) => check(question.type, data, question.length));
        while (!answer) {
            answer = await rl
            .question(`${question.question}`)
            .then((data) => check(question.type, data, question.length));
        }
        
        answers.push(question.name + answer + "  ");
    }
    
    console.log( answers.toString())
}

run()