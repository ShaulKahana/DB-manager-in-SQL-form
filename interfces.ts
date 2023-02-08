export interface Iquestion {
    question: string,
    name: string,
    type: string,
    length: number,
}


export class User_line{
    user_line:number
    constructor(){
        this.user_line = 0
    }
    public get():number{
        return this.user_line
    }
    set():void{
        this.user_line ++
    }
}


export function user_exist(id:string, user_map:Map<string,number>):boolean{
    if (user_map.get(id)!== undefined) {
        return true
    }
    return false
}