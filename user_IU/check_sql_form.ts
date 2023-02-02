
import { check } from "./check_input";
import { questions } from "../questions_list";

function insertUser(insert_string:string){

    if(!insert_string.includes(" values ") || insert_string.slice(0,Math.min(insert_string.indexOf("("),insert_string.indexOf("values"))).trim().toUpperCase()!== "INSERT INTO FILE")
        console.log("go to ell")
    else{
        insert_string = insert_string.trim().slice(17).trim()
        let insert_array:Array<string> = insert_string.split("values")
        const answers: Array<string> = [];
        if (insert_array[0].trim() == "") {

            let values:Array<string> = cleer(insert_array[1].trim())
            let indexs: number = 0
            for (let v of values) {
                let answer:string|void = check(questions[indexs].type, v, questions[indexs].length);
                if (answer) {
                    answers.push(questions[indexs].name + answer.padEnd(questions[indexs].length));
                }
                indexs ++
            }
            let answersString:string = answers.toString() 
            console.log(answersString);

        } else {
            let colomes:Array<string> = cleer(insert_array[0].trim())
            let values:Array<string> = cleer(insert_array[1].trim())
            if (colomes.includes("id")){
                for (const question of questions) {
                    let new_name:string = question.name.slice(0,question.name.length-2);
                    if (colomes.includes(new_name)){
                        let answer:string|void = check(question.type, values[colomes.indexOf(new_name)], question.length);
                        if (answer) {
                            answers.push(question.name + answer.padEnd(question.length));
                        }
                    }
                    else{
                        let answer = "";
                         answers.push(question.name+answer.padEnd(question.length));
                    }
                }
                let answersString:string = answers.toString() 
                console.log(answersString);           
            }else{
                console.log("Most to insert a id")
            }
                 
        }
    }
}


function cleer(input:string):Array<string>{
    input = input.slice(1,-1).trim()
    let input_array:Array<string> = input.split(",")
    for (let index:number = 0; index < input_array.length; index++) {
        input_array[index] = input_array[index].trim()
    }
    return input_array
}


