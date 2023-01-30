import {open,appendFile} from 'node:fs/promises';


export async function write_to_file(user:string){
    appendFile("./db.txt",user + "\n")
}

export async function write_id_to_file(id:string,user_line: number){
    appendFile("./id.txt",id + " "+ user_line + "\n")
}