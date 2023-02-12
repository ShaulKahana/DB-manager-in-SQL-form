import { check } from "./check_questions_ansers_input";
import { questions } from "./questions_list";
import{User_line, user_exist}from "../interfces"
import{addUser}from '../DB_model/add_User';
import{searchUserByID}from '../DB_model/search_User';
import{deleteUser}from '../DB_model/Delete_user';


export async function apdateUser(apdate_string:string,user_line:User_line,user_map:Map<string,number>):Promise<void>{
    
    if(apdate_string.trim().slice(0,15).trim().toLocaleLowerCase()!== "update file set"){
        console.log("The query is not a SQL standard!")
    }
    else{

        apdate_string = apdate_string.trim().slice(15).trim()
        let insert_array:Array<string> = apdate_string.split("where" || "WHERE")

        let where_colem:string = insert_array[1].split("=")[0].trim()
        let where_value:string = insert_array[1].split("=")[1].trim()

        if (where_colem === "id") {
            if (!user_exist(where_value, user_map)) {
                console.log(`The user with the id number ${where_value} are not exist in the DB`);
                return  
            }

            console.log("the exsiting data on this user is:")

            let user_data_string:string|void = await searchUserByID (where_value ,user_map)

            let answer_split: Array<string> = []

            if(user_data_string){answer_split =  user_data_string?.split(",");}

            let colem_and_values:Array<string> = insert_array[0].split(",")
            const answers: Array<string> = [];

            let colomes:Array<string> = []
            let values:Array<string> = []

            let flag = false;


            colem_and_values.forEach(element =>{
                if (element.split("=")[0].trim() === "id") {
                    console.log(`can't updaate a id`);
                        return                              
                }

                if(!colom_value_check(element.split("=")[0].trim(),element.split("=")[1].trim())) {

                    flag = true;
                }
                colomes.push(element.split("=")[0].trim())
                values.push(element.split("=")[1].trim())
            }) 
            if(flag) {return}
            
            for (const answer of answer_split) {

                let new_name:string = answer.split(":")[0];
               
                if (colomes.includes(new_name)){
                    let value = values[colomes.indexOf(new_name)]
                    answers.push(new_name + ": " +  value.padEnd(answer.split(":")[1].length-1));
                }
                else{
                    answers.push(new_name + ":" + answer.split(":")[1]);
                } 
            }
            await deleteUser(where_value,user_map,true)
            await addUser(answers.toString(),where_value,user_line,user_map,true)
            console.log(`User with id: ${where_value} was apdate successfully!!!`);
        }
        else{
            console.log("you can delete a user only if you insert a id!")
        } 
    }
}
 



function colom_value_check(colom:string,value:string):boolean{

    let fleg:boolean = true
    let temp: Array<string> = []
    for (const question of questions) {
        temp.push(question.name.slice(0,question.name.length-2));
    }

    if (!temp.includes(colom)) {
        console.log(`There is no ${colom} column in the table!`)
        fleg =  false;
    }
    
    if(!fleg) {return fleg}

    for (const question of questions) {
        let new_name:string = question.name.slice(0,question.name.length-2);
        let answer:string|void;

        if(new_name === colom){
            answer = check(question, value);
            if (!answer) {  fleg =  false  }
        }       
    }

    return fleg
}


//  let a = "Update file set First name = yaki, Family name = klein where id = 1234"