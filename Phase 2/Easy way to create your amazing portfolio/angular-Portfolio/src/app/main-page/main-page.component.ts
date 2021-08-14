import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import {StorageService} from "../fakeStorage.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  registerRef = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    user: new FormControl("", [Validators.required]),
    pass: new FormControl("", [Validators.required]),
  });

  loginRef = new FormGroup({
    logUser: new FormControl("", [Validators.required]),
    logPass: new FormControl("", [Validators.required]),
  });

  portRef = new FormGroup({
    contactName: new FormControl("", [Validators.required]),
    contactNumber: new FormControl("", [Validators.required]),
  });

  // for register part var
  regMsg:string ="";
  turnReg: boolean = true;

  // for login part var
  logMsg: string = "";
  turnLogin: boolean = false;

  // for portfolio part 
  username:any;
  fullName:any;
  contactList: Array<any> = [];
  turnTable:boolean = false;
  turnPortfolio: boolean = false;

  constructor(public acct: StorageService) {}

  ngOnInit(): void {}

  submit(): void {
    let newUser = this.registerRef.value;

    // call setter method 
    this.acct.name = newUser.user;
    this.acct.pass = newUser.pass;
    this.acct.firstName = newUser.firstName;
    this.acct.lastName = newUser.lastName;

    this.regMsg = this.acct.successRegMsg();

    this.registerRef.reset();
  }

  checkUser(): void {
    let login = this.loginRef.value;

    if(login.logUser != this.acct.name || login.logPass != this.acct.pass){
      this.logMsg = this.acct.errorMsg();
    } else {
      this.logMsg = "";
      this.turnLogin = !this.turnLogin;
      this.fullName = `${this.acct.firstName}  ${this.acct.lastName}`;
      this.username = this.acct.name;
      this.turnPortfolio = !this.turnPortfolio;
    }
    
    this.loginRef.reset();
  }

  addNewContact(): void {
    let add = this.portRef.value;

    this.acct.contacts.push({
      name: add.contactName,
      phone: add.contactNumber,
    });

    this.contactList = this.acct.contacts;
  }

  RegisterStatus(): void {
    this.turnReg = !this.turnReg;
    this.turnLogin = !this.turnLogin;
    this.regMsg = "";
  }

  LoginStatus(): void{
    this.turnLogin = !this.turnLogin;
    this.turnReg = !this.turnReg;
    this.logMsg = "";
  }

  showTable(): void {
    this.turnTable = !this.turnTable;
  }
}
