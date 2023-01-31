import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { check } from "./check_input";
import { questions } from "./questions_list";
import {write_to_file, write_id_to_file} from './write_file';
import{User_line}from "./interfces"


export async function addUser(user_line:User_line,user_map:Map<string,number>){
    try {
        const rl = readline.createInterface({ input, output, terminal: false });
        const answers: Array<string> = [];
        let id:string = "";
        
        for (const question of questions) {
            let answer = await rl.question(`${question.question}`).then((data) => check(question.type, data, question.length));
            while (!answer) {
                answer = await rl
                .question(`${question.question}`)
                .then((data) => check(question.type, data, question.length));
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
        write_id_to_file(id, user_line.get())
        user_map.set(id,user_line.get());
        user_line.set();
        
        write_to_file(answersString).then(() => {
            console.log(`User with id: ${id} was added successfully!!!`);
        })
        rl.close();
    }
    catch (err) {
        console.error(err);
    }
}