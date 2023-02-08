import {get_all_user_data, find_users_by_colom} from './Read_file';
import { user_length} from "../questions_list";


export async function searchUserByID (answer:string ,user_map:Map<string,number>):Promise<void>{
    try {
      const data:string = await get_all_user_data(user_map.get(answer),user_length())
      let answer_split =  data.split(",");
      answer_split.forEach(element => {
        console.log(element);
      });
    }
    catch (err) {
        console.error(err);
    }
}

export async function searchUserNotByID (where_colem:string,where_value:string, colems: Array<string> | undefined = undefined){
  try {
  
    const data: Array<string> | undefined = await find_users_by_colom(where_colem,where_value)

    if(!data || data.length<1){
      console.log("There are no suitable users for this query");
      return
    }

   
    data.forEach(element => {

      let answer_split =  element.split(",");

      if (colems === undefined) {

        answer_split.forEach(element => {
          console.log(element);
        });

      }
      else{

        answer_split.forEach(element1 => {
          let colem_name:string = element1.split(":")[0].trim()
          if (colems.includes(colem_name)) {
            console.log(element1);
          }
          
        });

      }
      console.log("\n\n\n")
    });        
  }
  catch (err) {
      console.error(err);
  }
}