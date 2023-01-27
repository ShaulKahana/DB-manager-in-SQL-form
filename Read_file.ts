import {createReadStream } from 'node:fs';
import {open} from 'node:fs/promises';
import { start } from 'node:repl';

async function read_the_id_file(user_line:number,map1:Map<string,number>,next:Function)
{
    const file =  await open("./id.txt");

    for await (const line of file.readLines()) {
      map1.set(line.split(" ")[0],Number(line.split(" ")[1]));
      user_line += parseInt(line.split(" ")[1])+1
    }

    await file.close();
       
    next(user_line,map1);
}

async function get_user_data(user_line: number| undefined, user_length:number){
    let start_bayts:number = user_line? user_line*user_length : 0;
    let end_bayts:number = start_bayts+user_length

    const createReader = createReadStream("./db.txt",{ start:  start_bayts, end:end_bayts });
  
    createReader.on("data", (data) => {
        let dataStr =  data.toString().split('\n').join("");
        let answer_split =  dataStr.split("  ,");
        answer_split.forEach(element => {
            console.log(element);
        });
    });
}


export {
    get_user_data,read_the_id_file
};
