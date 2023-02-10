import {get_all_user_data, find_users_by_colom} from './File Handler/Read_file';
import { user_length} from "../user_IU/questions_list";
import{ user_exist}from "../interfces"


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


export async function searchUserNotByID (where_colem:string,where_value:string, user_map:Map<string,number>, colems: Array<string> | undefined = undefined){

  try {
  
    const data: Array<string> | undefined = await find_users_by_colom(where_colem,where_value)
    let fleg:boolean = true

    if(!data || data.length<1){
      console.log("There are no suitable users for this query");
      return
    }

    data.forEach(element => {
      let id = element.slice(4,13)

      if (user_exist(id, user_map)){

        fleg = false;

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
      }
    });

    if(fleg){
      console.log("There are no suitable users for this query");
      return
    }


  }
  catch (err) {
      console.error(err);
  }
}