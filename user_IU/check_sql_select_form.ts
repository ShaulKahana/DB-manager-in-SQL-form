import { check } from "./check_input";
import { questions } from "../questions_list";
import{User_line}from "../interfces"
import{searchUserByID, searchUserNotByID}from '../DB_model/search_User';
require('events').EventEmitter.defaultMaxListeners = 15;


export async function selectUser(select_string:string,user_map:Map<string,number>){

    if(!select_string.includes(" = ") ||  select_string.slice(select_string.indexOf("FROM"),select_string.indexOf("WHERE")+5).trim().toLowerCase()!== "from file where")
        console.log("go to ell")
    else{

        let colems = select_string.slice(select_string.indexOf("SELECT")+7,select_string.indexOf("FROM")).split(", ")
        if (colems[0].trim() === "*") {
            let where_colem:string = select_string.slice(select_string.indexOf("WHERE")+6,select_string.length).split(" = ")[0].trim()
            let where_value:string = select_string.slice(select_string.indexOf("WHERE")+6,select_string.length).split(" = ")[1].trim()
            if (where_colem === "id") {
                searchUserByID(where_value,user_map)
            }
            else{
                searchUserNotByID(where_colem,where_value)
            }

            
        }
        // for (let c of colems ){
        //     console.log (c.trim())
        // }

        //console.log(a.slice(a.indexOf("FROM"),a.indexOf("WHERE")+5).trim())

        // let where_colem = select_string.slice(select_string.indexOf("WHERE")+6,select_string.length).split(" = ")[0]
        // console.log(where_colem)

        //let where_value = select_string.slice(select_string.indexOf("WHERE")+6,select_string.length).split(" = ")[1]
        //console.log(where_value)
    }
}


let aa = "SELECT * FROM file WHERE id = 123456789"
let a = "SELECT id, first_name, last_name FROM file WHERE id = 12345"
let aaa = "SELECT id, last_name FROM file WHERE first_name = “yaki”"
let aaaa = "SELECT * FROM file WHERE First name = yaki"
