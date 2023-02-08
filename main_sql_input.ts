import * as readline from "node:readline/promises";
import {stdin as input, stdout as output } from "node:process";
import{User_line}from "./interfces"
import {create_id_indexs} from './DB_model/Read_file';
import {insertUser } from './user_IU/check_sql_insert_form'
import {selectUser } from './user_IU/check_sql_select_form'

let user_line:User_line = new User_line;
const user_map:Map<string,number> = new Map();
let flag:boolean = true



async function db_maneger():Promise<void> {
    const rl:readline.Interface = readline.createInterface({ input, output, terminal: false });

    while(flag){

        let input_query:string ;
        let action:string ;

        input_query = await rl.question("Hello and welcome, enter your SQL query\n");

        action = input_query.trim().split(" ")[0].trim().toLowerCase()

        switch (action) {
            case "insert":
                await insertUser(input_query,user_line,user_map)
                break;

            case "select":
                await selectUser(input_query,user_map)
                break;

            case "delete":
                //delete_user_input(user_map).then(() => {db_maneger(); })
                break;

            case "exit":
                console.log("Have a good day");
                rl.close();
                flag = false
                break;

            default:
                console.error("The SQL query must begin wite 'select' or 'insert' or 'delete', or press 'exit' to finish!\n");
                break;
        }

    }

}


create_id_indexs(user_line,user_map).then(() => {db_maneger(); })