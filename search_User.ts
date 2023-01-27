import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { check } from "./check_input";
import {get_user_data} from './Read_file';
import { user_length } from "./questions_list";


export async function searchUser (map1:Map<string,number>){
    try {
        const rl = readline.createInterface({ input, output, terminal: false });
        const answer = await rl.question("Whats the id of the user your looking for ? ");

        if (check('id', answer, answer.length)) {

            if (map1.get(answer)!== undefined) {       
              await get_user_data(map1.get(answer),user_length());
            }
            else{
              console.log("The user is not in the DB")
            }
        }
        rl.close();
    }
    catch (err) {
        console.error(err);
    }
}