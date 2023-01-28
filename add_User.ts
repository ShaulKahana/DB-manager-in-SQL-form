import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { check } from "./check_input";
import { questions } from "./questions_list";
import {write_to_file, write_id_to_file} from './write_file';
import {open} from 'node:fs/promises';


let user_line:number = 0;



export async function addUser(map1:Map<string,number>){
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
                if (map1.get(id)!== undefined) {
                    console.log("The user already exist in the DB");
                    return
                }
            }
            answers.push(question.name+answer.padEnd(question.length));
        }
        
        let answersString = answers.toString()        
        write_id_to_file(id, user_line)
        map1.set(id,user_line);
        user_line ++;
        
        write_to_file(answersString).then(() => {
            console.log(`User with id: ${id} was added successfully!!!`);
        })
        rl.close();
    }
    catch (err) {
        console.error(err);
    }
}

export async function insert_to_map(map1:Map<string,number>){

    const file =  await open("./id.txt");

    for await (const line of file.readLines()) {
      map1.set(line.split(" ")[0],Number(line.split(" ")[1]));
      user_line ++
    }

    await file.close();
}
