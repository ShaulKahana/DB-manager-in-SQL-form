import{searchUserByID, searchUserNotByID}from '../DB_model/search_User';

export async function selectUser(select_string:string,user_map:Map<string,number>){

    if(!select_string.includes(" = ") ||  select_string.slice(select_string.indexOf("FROM"),select_string.indexOf("WHERE")+5).trim().toLowerCase()!== "from file where")
        console.log("go to ell")
    else{

        let colems:Array<string> = select_string.slice(select_string.indexOf("SELECT")+7,select_string.indexOf("FROM")).split(", ")

        colems = colems.map(element => {
            return element.trim();
        });

        let where_colem:string = select_string.slice(select_string.indexOf("WHERE")+6,select_string.length).split(" = ")[0].trim()
        let where_value:string = select_string.slice(select_string.indexOf("WHERE")+6,select_string.length).split(" = ")[1].trim()

        if (colems[0].trim() === "*") {

            if (where_colem === "id") {
                await searchUserByID(where_value,user_map)
            }
            else{
                await searchUserNotByID(where_colem,where_value)
            }   
        }
        else{
            await searchUserNotByID(where_colem,where_value,colems)
        }
    }
}


let aa = "SELECT * FROM file WHERE id = 123456789"
let a = "SELECT id, first_name, last_name FROM file WHERE id = 12345"
let aaa = "SELECT id, Family name FROM file WHERE First name = yaki"
let aaaa = "SELECT * FROM file WHERE First name = yaki"

