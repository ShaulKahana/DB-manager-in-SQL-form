import{searchUserByID, searchUserNotByID}from '../DB_model/search_User';
import{ user_exist}from "../interfces"
import {coloms_check} from './check_sql_insert_form'


export async function selectUser(select_string:string,user_map:Map<string,number>):Promise<void>{

    let select_string1 = select_string.toLocaleLowerCase()

    if(!select_string1.includes("=") ||  select_string1.slice(select_string1.indexOf("from"),select_string1.indexOf("where")+5).trim()!== "from file where")
        console.log("The query is not a SQL standard!")
    else{

        let colems:Array<string> = select_string.slice(select_string1.indexOf("select")+7,select_string1.indexOf("from")).split(",")

        colems = colems.map(element => {
            return element.trim();
        });

        let where_colem:string = select_string.slice(select_string1.indexOf("where")+6,select_string1.length).split("=")[0].trim()
        let where_value:string = select_string.slice(select_string1.indexOf("where")+6,select_string1.length).split("=")[1].trim()

        if (colems[0].trim() === "*" && colems.length<2) {

            if (where_colem === "id") {
                if (!user_exist(where_value, user_map)) {
                    console.log(`The user with the id number ${where_value} are not exist in the DB`);
                    return  
                }
                await searchUserByID(where_value,user_map)
            }
            else{
                await searchUserNotByID(where_colem,where_value,user_map)
            }   
        }
        else{
            if (coloms_check(colems)) {return}
            await searchUserNotByID(where_colem,where_value, user_map,colems)
        }
    }
}


let aa = "SELECT * FROM file WHERE id = 123456789"
let a = "SELECT id, First name, Family name FROM file WHERE id = 123456789"
let aaa = "SELECT id, Family name FROM file WHERE First name = yaki"
let aaaa = "SELECT * FROM file WHERE First name = yaki"

