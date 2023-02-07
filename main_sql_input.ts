import * as readline from "node:readline/promises";
import {stdin as input, stdout as output } from "node:process";
import{User_line}from "./interfces"
import {create_id_indexs} from './DB_model/Read_file';
import {insertUser } from './user_IU/check_sql_insert_form'
import {selectUser } from './user_IU/check_sql_select_form'

let user_line:User_line = new User_line;
const user_map = new Map();




async function db_maneger() {

    const rl = readline.createInterface({ input, output, terminal: false });
    let input_query:string ;
    let action:string ;

    input_query = await rl.question("Hello and welcome, enter your SQL query\n");

    action = input_query.trim().split(" ")[0].trim().toLowerCase()

    switch (action) {
        case "insert":
            insertUser(input_query,user_line,user_map).then(() => {db_maneger(); })
            break;

        case "select":
            selectUser(input_query,user_map).then(() => {db_maneger(); })
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


create_id_indexs(user_line,user_map).then(() => {db_maneger(); })