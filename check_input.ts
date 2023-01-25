const isTypeID = (value:string):string|void => {
    try {
        if (isNaN(Number(value))) {
            return console.error("The answer must be of type 'number'");
        }
        if (value.length != 9) {
            return console.error("The id number must be only 9 digit");
        }
        return value;
    }
    catch (err) {
        console.error("The value is incorect", `${err}`);
    }
};

const isTypeGender = (value:string):string|void => {
    try {
        if (value!="Male" && value!="Female") {
            return console.error("The answer must be 'Male' or 'Female'");
        }
        return value;
    }
    catch (err) {
        console.error("The value is incorect", `${err}`);
    }
};

const isTypeNumber = (value:string, length:number):string|void => {
    try {
        if (isNaN(Number(value))) {
            return console.error("The answer must be of type 'number'");
        }
        const newValue:string|void = checkLength(value, length);
        if (newValue) {
            return newValue;
        }
    }
    catch (err) {
        console.error("The value is incorect", `${err}`);
    }
};

const isTypeString = (value:string, length:number):string|void => {
    try {
        if(value.match(/([^A-Z])([^a-z ]+)/g) != null) {
            return console.error("The answer must be of type 'string'");
        }
        const newValue:string|void = checkLength(value, length);
        if (newValue) {
            return newValue;
        }
    }
    catch (err) {
        console.error("The value is incorect", `${err}`);
    }
};


const checkLength = (value:string, length:number):string|void => {    
    if (!value) {
        return;
    }
    if (value.length > length) {
        console.error(`The value cant be more then ${length} CHARACTERS long!`);
        return;
    }
    return value;
};

export const check = (type:string, value:string, length:number) => {
    switch (type) {
        case "id":
            return isTypeID(value);
        case "string":
            return isTypeString(value, length);
        case "number":
            return isTypeNumber(value, length);
        case "gender":
            return isTypeGender(value);
    }
};