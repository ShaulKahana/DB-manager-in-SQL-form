import { delete_user_from_file } from "./Read_file";


export async function deleteUser (answer:string, user_map:Map<string,number>){
    try {
        await delete_user_from_file(answer);
        user_map.delete(answer);
        console.log(`User with id: ${answer} was deleted successfully!!!`);
    }
    catch (err) {
        console.error(err);
    }
}



