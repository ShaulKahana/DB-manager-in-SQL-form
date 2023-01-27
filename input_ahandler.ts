import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import {read_the_id_file} from './Read_file';
import{addUser}from './add_User';
import{searchUser}from './search_User';

const map1 = new Map();

let user_line:number = 0;



async function db_maneger() {
    const rl = readline.createInterface({ input, output, terminal: false });
    let action:string ;

    setTimeout((function printName()
    {console.log("Hello and welcome, what would you like to do (add || search || exit || delete)? ")}),500)

    action = await rl.question("");

    switch (action) {
        case "add":
            addUser(user_line, map1).then(() => {db_maneger(); })
            break;

        case "search":
            await searchUser(map1)
            break;

        case "delete":
           // await deleteUser( user_line)
            break;

        case "exit":
            console.log("Have a good day");
            rl.close();
            process.exit()

        default:
            console.error("Must choose or 'add' or 'search' or 'exit'!\n");
            db_maneger()
            break;
    }
}




read_the_id_file( user_line, map1,async function next(user_line:number,map1:Map<string,number>) {
    if (map1 == undefined) {
      console.log("The DB is ampty you the first one yaaa\n");
    }   
    db_maneger();
})