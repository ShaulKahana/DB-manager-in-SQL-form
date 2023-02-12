import{ user_exist}from "../interfces"
import{deleteUser}from '../DB_model/Delete_user';



export async function delete_User(delete_string:string,user_map:Map<string,number>):Promise<void>{

    delete_string = delete_string.toLocaleLowerCase()

    if(delete_string.trim().slice(0,22).trim()!== "delete from file where")
        console.log("The query is not a SQL standard!")
    else{

        delete_string = delete_string.trim().slice(22).trim()
        let where_colem:string = delete_string.split("=")[0].trim()
        let where_value:string = delete_string.split("=")[1].trim()

        if (where_colem === "id") {
            if (!user_exist(where_value, user_map)) {
                console.log(`The user with the id number ${where_value} are not exist in the DB`);
                return  
            }
            await deleteUser(where_value,user_map)
        }
        else{
            console.log("you can delete a user only if you insert a id!")
        }   
    }
}



let a = "Delete from file where id = 1234"