import {createReadStream, createWriteStream } from 'node:fs';
import {open,appendFile} from 'node:fs/promises';
import{User_line}from "../interfces"
import { user_length, colem_length } from "../questions_list";


export async function insert_id_to_map(user_line:User_line,user_map:Map<string,number>){

    const file =  await open("./DB_model/id.txt");

    for await (const line of file.readLines()) {
      user_map.set(line.split(" ")[0],Number(line.split(" ")[1]));
      user_line.set()
    }

    await file.close();
}


export function get_all_user_data(user_line: number | undefined, user_length:number):Promise<string>{
    let start_bayts:number = user_line? user_line*user_length+user_line : 0;
    let end_bayts:number = start_bayts+user_length

    const createReader = createReadStream("./DB_model/db.txt",{ start:  start_bayts, end:end_bayts });
    
    return new Promise(res => {
        createReader.on("data", (data) => {
            let dataStr =  data.toString().split('\n').join("");
            res(dataStr)
        });
    })   
}

export async function find_users_by_colom(where_colem:string,where_value:string):Promise<Array<string> | undefined> {
    try {

        const file =  await open("./DB_model/db.txt");
        let answer_array = colem_length(where_colem)
        let start_bayts:number = answer_array[0];
        let end_bayts:number = answer_array[1]
        let indexs = 0
        let return_array: Array<string> = [];
    
        for await (const line of file.readLines()) {
    
          if(line.slice(start_bayts,end_bayts).trim()=== where_value){

              const data:string = await get_all_user_data(indexs,user_length())
              return_array.push(data);
          }
          indexs++
        }
        await file.close();
        
        return new Promise(res => {
            res(return_array)
        }) 
      }
      catch (err) {
          console.error(err);
      }
}


export async function delete_user_from_file(id:string){

    const createReader = createReadStream("./DB_model/id.txt");   

    createReader.on("data", (data) => {

        let dataStr =  data.toString();
        dataStr = dataStr.replace(id,"         ")

        const createWriter = createWriteStream("./DB_model/id.txt",{ start: 0 });
  
        createWriter.write("")

        createWriter.close()

        appendFile("./DB_model/id.txt",dataStr)
    });    
}


