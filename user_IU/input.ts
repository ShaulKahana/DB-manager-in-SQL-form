import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { check } from "./check_questions_ansers_input";
import { questions } from "./questions_list";
import{User_line}from "../interfces"
import{addUser}from '../DB_model/add_User';
import{searchUserByID}from '../DB_model/search_User';
import {deleteUser} from '../DB_model/Delete_user';


export async function add_user_input(user_line:User_line,user_map:Map<string,number>){
    const rl = readline.createInterface({ input, output, terminal: false });
    const answers: Array<string> = [];
    let id:string = "";
    
    for (const question of questions) {
        let answer = await rl.question(`${question.question}`).then((data) => check(question, data));
        while (!answer) {
            answer = await rl
            .question(`${question.question}`)
            .then((data) => check(question, data));
        }
        if (question.name === "id: ") {
            id = answer
            if (user_map.get(id)!== undefined) {
                console.log("The user already exist in the DB");
                return
            }
        }
        answers.push(question.name+answer.padEnd(question.length));
    }
    
    let answersString = answers.toString() 
    rl.close();
    await addUser(answersString,id,user_line,user_map)
}

export async function search_user_input(user_map:Map<string,number>){
    const rl = readline.createInterface({ input, output, terminal: false });
    const answer = await rl.question("Whats the id of the user your looking for ? ");

    if (check(questions[0], answer)) {

        if (user_map.get(answer)!== undefined) {       
            await searchUserByID(answer,user_map)
        }
        else{
            console.log("The user is not in the DB")
        }
    }
    rl.close();
}

export async function delete_user_input(user_map:Map<string,number>){
    const rl = readline.createInterface({ input, output, terminal: false });
    const answer = await rl.question("What's the id of the user you want to delete? ");

    if (check(questions[0], answer)) {

        if (user_map.get(answer)) {
            await deleteUser(answer,user_map)
        }
        else{
          console.log("The user is not in the DB")
        }
    }
    rl.close();
}
