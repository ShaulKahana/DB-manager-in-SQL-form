
import { check } from "./check_input";
import { questions } from "../questions_list";
import{User_line}from "../interfces"
import{addUser}from '../DB_model/add_User';


export async function insertUser(insert_string:string,user_line:User_line,user_map:Map<string,number>){

    if(!insert_string.includes(" values ") || insert_string.slice(0,Math.min(insert_string.indexOf("("),insert_string.indexOf("values"))).trim().toUpperCase()!== "INSERT INTO FILE")
        console.log("go to ell")
    else{
        insert_string = insert_string.trim().slice(17).trim()
        let insert_array:Array<string> = insert_string.split("values")
        const answers: Array<string> = [];
        let id:string = ""

        if (insert_array[0].trim() == "") {

            let values:Array<string> = cleer(insert_array[1].trim())
            let indexs: number = 0
            for (let v of values) {
                let answer:string|void = check(questions[indexs].type, v, questions[indexs].length);
                if (answer) {
                    if (questions[indexs].name === "id: ") {
                        id = answer
                        if (user_map.get(id)!== undefined) {
                            console.log("The user already exist in the DB");
                            return
                        }
                    }
                    answers.push(questions[indexs].name + answer.padEnd(questions[indexs].length));
                }
                indexs ++
            }
            let answersString:string = answers.toString() 
            addUser(answersString,id,user_line,user_map)
            //console.log(answersString);

        } else {
            let colomes:Array<string> = cleer(insert_array[0].trim())
            let values:Array<string> = cleer(insert_array[1].trim())
            if (colomes.includes("id")){
                for (const question of questions) {
                    let new_name:string = question.name.slice(0,question.name.length-2);
                    if (colomes.includes(new_name)){
                        let answer:string|void = check(question.type, values[colomes.indexOf(new_name)], question.length);
                        if (answer) {
                            if (question.name === "id: ") {
                                id = answer
                                if (user_map.get(id)!== undefined) {
                                    console.log("The user already exist in the DB");
                                    return
                                }
                            }
                            answers.push(question.name + answer.padEnd(question.length));
                        }
                        else{
                            return
                        }
                    }
                    else{
                        let answer = "";
                         answers.push(question.name+answer.padEnd(question.length));
                    }
                }
                let answersString:string = answers.toString() 
                addUser(answersString,id,user_line,user_map)
            }else{
                console.log("Most to insert a id")
            }
                 
        }
    }
}


function cleer(input:string):Array<string>{
    input = input.slice(1,-1).trim()
    let input_array:Array<string> = input.split(",")
    input_array = input_array.map(element => {
        return element.trim();
    });
    return input_array
}


let a = " insert into file   values ( 123456789  , yaki , klein, 43, israel, jerusalem, jontan, 22, Male, 3  )"
let k = " INSERT INTO file    ( First name , id , Family name ) values (yaki , 123111119, klein ) "
let r = "insert into file (id, first_name, last_name) values (1234, yaki, klein)"