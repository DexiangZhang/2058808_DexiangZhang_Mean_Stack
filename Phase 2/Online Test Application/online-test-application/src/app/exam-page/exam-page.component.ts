import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.css']
})
export class ExamPageComponent implements OnInit {

  questionGroup:FormGroup;

  exams: any= [];
  totalQ: number = 0;
  correctCount: number = 0;

  turnSubmitButton: boolean = true;
  turnResult: boolean = false;
  isPass: boolean = true;

  msg: string = "";


  constructor(public examSer: ExamService, public form:FormBuilder) {
    this.questionGroup = form.group({});
  }

  ngOnInit(): void {
    // data is the whole array of object that is from json file
    this.examSer.getQuestionsInfo().subscribe( data => {
     
      for(let eachQ of data) {
       this.questionGroup?.addControl(eachQ.question, this.form.control("", [Validators.required]));
       this.exams.push(eachQ);
       this.totalQ++;
      }
    });

  }
  
  // for submit button function
  calculateScore(): void {

   for(let q in this.questionGroup.value) {
    let index = this.exams.findIndex((i:any) => i.question == q);

    // check if the answer is correct or not 
    if(this.questionGroup.value[q] == this.exams[index].correct ) {
      this.correctCount++;

      // dynama style for check or failure icon
     let title = (<HTMLInputElement>document.querySelectorAll(".problem")[index]);
     title.style.color = "green";
     let dateSpan: any = document.createElement('span')
     dateSpan.innerHTML = "&#10004;";
     dateSpan.style.color = "green";
     dateSpan.style.marginLeft = "1em";
     title.appendChild(dateSpan); 

    } else {

       // dynama style for check or failure icon
      let title = (<HTMLInputElement>document.querySelectorAll(".problem")[index]);
      title.style.color = "red";
      let dateSpan: any = document.createElement('span')
      dateSpan.innerHTML = "&#10060;";
      dateSpan.style.color = "red";
      dateSpan.style.marginLeft = "1em";
      title.appendChild(dateSpan); 
    }
    
   }

   this.showResultMsg();
  }

  showResultMsg(): void {

    this.turnSubmitButton = false;
    this.turnResult = true;
 
    if(this.correctCount >= (this.totalQ/2)+1) {
     this.msg = "Congratulation! You Pass the Exam";
    } else {
     this.isPass = false;
     this.msg = "Fail! Please Try Again";
    }
  }

}
