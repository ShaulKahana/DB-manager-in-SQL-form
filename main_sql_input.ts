import * as readline from "node:readline/promises";
import {stdin as input, stdout as output } from "node:process";
import{User_line}from "./interfces"
import {insert_id_to_map} from './DB_model/Read_file';
import {insertUser } from './user_IU/check_sql_form'

let user_line:User_line = new User_line;
const user_map = new Map();




async function db_maneger() {

    const rl = readline.createInterface({ input, output, terminal: false });
    let inputQ:string ;
    let action:string ;

    setTimeout((function printName()
    {console.log("Hello and welcome, enter your SQL query")}),500)

    inputQ = await rl.question("");

    action = inputQ.trim().split(" ")[0].trim().toLowerCase()

    switch (action) {
        case "select":
            //add_user_input(user_line,user_map).then(() => {db_maneger(); })
            break;

        case "insert":
            insertUser(inputQ,user_line,user_map).then(() => {db_maneger(); })
            break;

        case "delete":
            //delete_user_input(user_map).then(() => {db_maneger(); })
            break;

        case "exit":
            console.log("Have a good day");
            rl.close();
            process.exit()

        default:
            console.error("The SQL query must begin wite 'select' or 'insert' or 'delete', or press 'exit' to finish!\n");
            db_maneger()
            break;
    }
}


insert_id_to_map(user_line,user_map).then(() => {db_maneger(); })