import { check } from "./check_input";
import { questions } from "../questions_list";
import{User_line, user_exist}from "../interfces"
import{addUser}from '../DB_model/add_User';


export async function insertUser(insert_string:string,user_line:User_line,user_map:Map<string,number>):Promise<void>{

    if(!insert_string.includes("values") || insert_string.trim().slice(0,17).trim().toLocaleLowerCase()!== "insert into file")
        console.log("The query is not a SQL standard!")
    else{
        
        insert_string = insert_string.trim().slice(17).trim()
        let insert_array:Array<string> = insert_string.split("values")

        if (brackets_check(insert_array[1].trim())) {return};

        if (insert_array[0].trim() == "") {

            let answersString:Array<string>|undefined = []
            answersString = only_values_check(insert_array[1],user_map)
            if(answersString === undefined){return}
            await addUser(answersString[1],answersString[0],user_line,user_map)

        } else {

            if (brackets_check(insert_array[0].trim())) {return};

            let answersString:Array<string>|undefined = colems_with_values_check(insert_array[0].trim(),insert_array[1].trim(), user_map)
            if(answersString === undefined){return}
            await addUser(answersString[1],answersString[0],user_line,user_map)
        }
    }
}

function only_values_check(values_string:string, user_map:Map<string,number>):Array<string> | undefined{

    const answers: Array<string> = [];
    let id:string = ""
    let return_array: Array<string> = []; 
    let values:Array<string> = cleer_brackets(values_string.trim())
    let indexs: number = 0

    for (let v of values) {
        let answer:string|void = check(questions[indexs], v);
        if (answer) {
            if (questions[indexs].name === "id: ") {
                id = answer
                if (user_exist(id, user_map)) {
                    console.log(`The user with the id number ${id} already exist in the DB`);
                     return undefined 
                }
                return_array.push(id)
            }
            answers.push(questions[indexs].name + answer.padEnd(questions[indexs].length));
        }
        else{return undefined}
        indexs ++
    }
    return_array.push(answers.toString() )
    return return_array
}

function colems_with_values_check(coloms_string:string,values_string:string, user_map:Map<string,number>):Array<string> | undefined{

    const answers: Array<string> = [];
    let id:string = ""
    let return_array: Array<string> = []; 

    let colomes:Array<string> = cleer_brackets(coloms_string.trim())

    if (!colomes.includes("id")) {
        console.log("most enter a id numbr!")
        return undefined
    }

    if (coloms_check(colomes)) {return undefined}

    let values:Array<string> = cleer_brackets(values_string.trim())

    for (const question of questions) {
        let new_name:string = question.name.slice(0,question.name.length-2);
        let answer:string|void;
        if (colomes.includes(new_name)){
            answer = check(question, values[colomes.indexOf(new_name)]);
            if (answer) {
                if (question.name === "id: ") {
                    id = answer
                    if (user_exist(id, user_map)) {
                        console.log(`The user with the id number ${id} already exist in the DB`);
                        return undefined 
                    }
                    return_array.push(id)
                }
                answers.push(question.name + answer.padEnd(question.length));
            }
            else{return undefined}
        }
        else{
            answer = "";
                answers.push(question.name+answer.padEnd(question.length));
        }
    }
    return_array.push(answers.toString() )
    return return_array
}


function cleer_brackets(input:string):Array<string>{
    input = input.slice(1,-1).trim()
    let input_array:Array<string> = input.split(",")
    input_array = input_array.map(element => {
        return element.trim();
    });
    return input_array
}

function brackets_check(input:string):boolean{
    if (!input.trim().startsWith("(") || !input.trim().endsWith(")")) {
        console.log("The query is not a SQL standard!")
        return true
    }
    return false
}



export function coloms_check(input:Array<string>):boolean{
    let fleg:boolean = false
    let temp: Array<string> = []
    for (const question of questions) {
        temp.push(question.name.slice(0,question.name.length-2));
    }
    input.forEach(element => {
        if (!temp.includes(element)) {
            console.log(`There is no ${element} column in the table!`)
            fleg =  true;
        }
    });
    return fleg
}



let a = " insert into file   values ( 123456789  , yaki , klein, 43, israel, jerusalem, jontan, 22, Male, 3  )"
let k = " INSERT INTO file    ( First name , id , Family name ) values (yaki , 123111119, klein ) "
let r = "insert into file (id,  First name, Family name) values (123456846, yaki, klein)"