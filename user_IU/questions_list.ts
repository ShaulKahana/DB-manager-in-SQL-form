import{Iquestion}from "../interfces"

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
user_length()

export function colem_length(colem_name:string):Array<number> | undefined{
    let user_length:number = 0;
    let return_array:Array<number> = [];
    let fleg: boolean = true

    for (const question of questions) {
        let new_name:string = question.name.slice(0,question.name.length-2);
        if (new_name !== colem_name) {
            user_length += question.name.length + question.length+1;
        }
        else{
            user_length += question.name.length;
            return_array.push(user_length)
            user_length += question.length;
            return_array.push(user_length)
            fleg = false
            break
        }
    }
    if(fleg){
        console.log(`there isn't a colom wite the name ${colem_name} in the tabel`)
        return undefined;
    } 
    return  return_array
}