import {get_all_user_data} from './Read_file';
import { user_length, colem_length } from "../questions_list";
import {createReadStream, createWriteStream } from 'node:fs';
import {open,appendFile} from 'node:fs/promises';
import{User_line}from "../interfces"

export async function searchUserByID (answer:string ,user_map:Map<string,number>){
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

export async function searchUserNotByID (where_colem:string,where_value:string){
  try {

    const file =  await open("./DB_model/db.txt");
    let answer_array = colem_length(where_colem)
    let start_bayts:number = answer_array[0];
    let end_bayts:number = answer_array[1]
    let indexs = 0

    for await (const line of file.readLines()) {

      if(line.slice(start_bayts,end_bayts).trim()=== where_value){
          const data:string = await get_all_user_data(indexs,user_length())
          let answer_split =  data.split(",");

          answer_split.forEach(element => {
            console.log(element);
          });
          console.log("\n\n\n")
      }
      indexs++
    }
    await file.close();
  }
  catch (err) {
      console.error(err);
  }
}