import {createReadStream, createWriteStream, WriteStream, ReadStream } from 'node:fs';
import {open,appendFile, FileHandle} from 'node:fs/promises';
import{User_line}from "../../interfces"
import { user_length, colem_length } from "../../user_IU/questions_list";


export async function create_id_indexs(user_line:User_line,user_map:Map<string,number>):Promise<void>{

    const file: FileHandle =  await open("./DB_model/DB/id.txt");

    for await (const line of file.readLines()) {
      user_map.set(line.split(" ")[0],Number(line.split(" ")[1]));
      user_line.set()
    }

    await file.close();
}


export function get_all_user_data(user_line: number | undefined, user_length:number):Promise<string>{
    let start_bayts:number = user_line? user_line*user_length+user_line : 0;
    let end_bayts:number = start_bayts+user_length

    const createReader: ReadStream = createReadStream("./DB_model/DB/db.txt",{ start:  start_bayts, end:end_bayts });
    
    return new Promise(res => {
        createReader.on("data", (data) => {
            let dataStr =  data.toString().split('\n').join("");
            res(dataStr)
        });
    })   
}

export async function find_users_by_colom(where_colem:string,where_value:string):Promise<Array<string> | undefined> {
    try {

        const file: FileHandle =  await open("./DB_model/DB/db.txt");
        let answer_array: Array<number> | undefined = colem_length(where_colem)
        if (answer_array === undefined) {return}
        let start_bayts:number = answer_array[0];
        let end_bayts:number = answer_array[1]
        let indexs:number = 0
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

    const createReader: ReadStream = createReadStream("./DB_model/DB/id.txt");   

    createReader.on("data", (data) => {

        let dataStr:string =  data.toString();
        dataStr = dataStr.replace(id,"         ")

        const createWriter: WriteStream = createWriteStream("./DB_model/DB/id.txt",{ start: 0 });
  
        createWriter.write("")

        createWriter.close()

        appendFile("./DB_model/DB/id.txt",dataStr)
    });    
}


