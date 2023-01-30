import{Iquestion}from "./interfces"

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

export function user_length():number{
    let user_length:number = 0;
    for (const question of questions) {
        user_length += question.name.length + question.length+1;
    }
    return user_length-1
}