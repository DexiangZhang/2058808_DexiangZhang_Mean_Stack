import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExamTemplate } from './exam.model';

@Injectable({
  providedIn: 'root'
})

export class ExamService {

  constructor(public http:HttpClient) { }

  getQuestionsInfo():Observable<ExamTemplate[]> {
    return this.http.get<ExamTemplate[]>("/assets/questions.json");
  }
}
