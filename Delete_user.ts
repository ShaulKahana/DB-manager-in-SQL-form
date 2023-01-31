import { createWriteStream ,createReadStream ,appendFile } from 'node:fs';
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { check } from "./check_input";
import { delete_user_from_file } from "./Read_file";


export async function deleteUser (user_map:Map<string,number>){
    try {

        const rl = readline.createInterface({ input, output, terminal: false });
        const answer = await rl.question("What's the id of the user you want to delete? ");

        if (check('id', answer, answer.length)) {

            if (user_map.get(answer)) {
                await delete_user_from_file(answer);
                user_map.delete(answer);
                console.log(`User with id: ${answer} was deleted successfully!!!`);
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



