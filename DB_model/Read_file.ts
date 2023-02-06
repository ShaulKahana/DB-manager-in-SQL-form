import {createReadStream, createWriteStream } from 'node:fs';
import {open,appendFile} from 'node:fs/promises';
import{User_line}from "../interfces"

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


