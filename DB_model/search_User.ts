import {get_user_data} from './Read_file';
import { user_length } from "../questions_list";


export async function searchUser (answer:string ,user_map:Map<string,number>){
    try {
      await get_user_data(user_map.get(answer),user_length());
    }
    catch (err) {
        console.error(err);
    }
}