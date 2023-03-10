import{Iquestion}from "../interfces"


function isTypeID(value:string, question_name:string):string|void {
    try {
        if (isNaN(Number(value))) {
            return console.error(`The id must be of type 'number'`);
        }
        if (value.length !== 9) {
            return console.error(`The id number must be only 9 digit`);
        }
        return value;
    }
    catch (err) {
        console.error("The value is incorect", `${err}`);
    }
};

function isTypeGender(value:string, question_name:string):string|void {
    try {
        if (value!=="male" && value!=="female") {
            return console.error(`The ${question_name} must be 'Male' or 'Female'`);
        }
        return value;
    }
    catch (err) {
        console.error("The value is incorect", `${err}`);
    }
};

function isTypeNumber(value:string, length:number, question_name:string):string|void {
    try {
        if (isNaN(Number(value))) {
            return console.error(`The ${question_name} must be of type 'number'`);
        }
        const newValue:string|void = checkLength(value, length, question_name);
        if (newValue) {
            return newValue;
        }
    }
    catch (err) {
        console.error("The value is incorect", `${err}`);
    }
};

function isTypeString(value:string, length:number, question_name:string):string|void {
    try {
        if(value.match(/([^A-Z])([^a-z ]+)/g) != null) {
            return console.error(`The ${question_name} must be of type 'string'`);
        }
        const newValue:string|void = checkLength(value, length, question_name);
        if (newValue) {
            return newValue;
        }
    }
    catch (err) {
        console.error("The value is incorect", `${err}`);
    }
};


function checkLength(value:string, length:number, question_name:string):string|void {    
    if (!value) {
        console.error(`The value of ${question_name} can't be empty!`);
        return;
    }
    if (value.length > length) {
        console.error(`The value of ${question_name} cant be more then ${length} CHARACTERS long!`);
        return;
    }
    return value;
};



export function check(question:Iquestion, value:string):string|void{
    switch (question.type) {
        case "id":
            return isTypeID(value, question.name);
        case "string":
            return isTypeString(value, question.length, question.name);
        case "number":
            return isTypeNumber(value, question.length, question.name);
        case "gender":
            return isTypeGender(value, question.name);
    }
};