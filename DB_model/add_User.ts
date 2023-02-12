import {write_to_file, write_id_to_file} from './File Handler/write_file';
import{User_line}from "../interfces"


export async function addUser(answersString:string, id: string, user_line:User_line,map1:Map<string,number>, update:boolean = false):Promise<void>{
    try {
        write_id_to_file(id, user_line.get())
        map1.set(id,user_line.get());
        user_line.set();
        
        write_to_file(answersString).then(() => {
            if(!update){
                console.log(`User with id: ${id} was added successfully!!!`);
            }
        })
    }
    catch (err) {
        console.error(err);
    }
}