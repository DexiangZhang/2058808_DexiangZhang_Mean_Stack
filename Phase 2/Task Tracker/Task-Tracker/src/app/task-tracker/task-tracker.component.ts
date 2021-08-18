import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.css']
})
export class TaskTrackerComponent implements OnInit {


  subRef = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    detail: new FormControl("", [Validators.required]),
    time: new FormControl("", [Validators.required]),
  });

  tasks: {id:number, name:string, detail:string, time:string}[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addNewTask(): void {
    let add = this.subRef.value;

    this.tasks.push({
      id: add.id,
      name: add.name,
      detail: add.detail,
      time: add.time,
    });

    console.log(this.tasks);
  }

}
