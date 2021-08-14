import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {

    // one object for user
    private accountHoder:{username:any, password:any, fName:any, lName:any} = {
        username: '',
        password: '',
        fName: '',
        lName: '',
    }

    // array of objects
    contacts: {name:any, phone:number}[] = [];

    constructor() {}

    errorMsg(): string {
        return "ERROR! Please Check Your Username & Password and Try Again!";
    }

    successRegMsg(): string {
        return "Register successfully, please remember your username and password";
    }

    // getter methods
    get name():any {
        return this.accountHoder.username;
    }

    get pass():any {
        return this.accountHoder.password;
    }

    get firstName():any {
        return this.accountHoder.fName;
    }

    get lastName():any {
        return this.accountHoder.lName;
    }

    // setter methods
    set name(userName: any) {
        this.accountHoder.username = userName;
    }

    set pass(pw: any) {
        this.accountHoder.password = pw;
    }

    set firstName(fname: any) {
        this.accountHoder.fName = fname;
    }

    set lastName(lname: any) {
        this.accountHoder.lName = lname;
    }
}