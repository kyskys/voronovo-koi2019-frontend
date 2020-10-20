import { Component, OnInit } from '@angular/core';
import { TestService } from '../shared/test.service';
import { SelectItem } from 'primeng/api';
import { TestAnswer } from '../../model/test-answer';
import * as _ from 'lodash';

@Component({
  selector: 'app-test-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class TestAnswerComponent implements OnInit {

  labels = {
    selectTest: 'Выберите тест',
    emptyRecords: 'Нет данных',
    selectTestAnswerKid: 'Выберите фамилию',
    showAnswers: 'Показать',
    infoDialogTitle: 'Подробности'
  };
  answerLabels = {
    questionLabel: 'Вопрос',
    percentText: 'Процент правильных ответов',
    timeToFinish: 'Время окончания теста',
    answersTitle: 'Список ответов',
    remainedTimeText: 'закончил за'
  };
  dialogLabels = {
    expression: 'Описание вопроса',
    correctAnswer: 'Правильный ответ',
    kidAnswer: 'Выбранный ответ'
  };
  testsNames: SelectItem[];
  selectedTestName: number;
  testAnswersKids: TestAnswer[];
  isLoading: boolean;
  totalRecords: number;
  pageSize: number;
  selectedTestAnswerKid: TestAnswer;
  testAnswersData: any;
  testTime: number;
  selectedAnswer: TestAnswer;
  isDialog: any;

  constructor(private testService: TestService) {
    this.testsNames = [];
    this.testAnswersKids = [];
    this.isLoading = false;
    this.pageSize = 20;
  }

  ngOnInit() {
    this.testService.getTestNames().subscribe(response => {
      this.testsNames = response.map(item => {
        return {value: item.id, label: item.name};
      });
    });
  }

  loadTestAnswersKids() {
    this.testService.getTestAnswers(this.selectedTestName).subscribe(response => {
      this.testAnswersData =
        _(response)
          .groupBy(x => x.name)
          .map((value, key) => ({name: key, answers: value}))
          .value();

      this.testAnswersKids = this.testAnswersData.map(value => {
        return {label: value.name, value: value.name};
      });
    });
    this.testService.getTestInfo(this.selectedTestName).subscribe(response => {
      this.testTime = Date.parse(response.startedAt);
    });
  }

  getAnswersArray(): TestAnswer[] {
    return this.testAnswersData.filter(row => row.name === this.selectedTestAnswerKid).map(row => row.answers)[0];
  }

  trackByIndex(index, item) {
    return index;
  }

  showAnswersForQuestion(answer?: any) {
    this.selectedAnswer = answer;
    this.isDialog = true;
  }

  getPercent(): number {
    return Math.round(this.getCorrectAnswersCount() /
      this.getAnswersArray().length * 100);
  }

  getCorrectAnswersCount(): number {
    return this.getAnswersArray().filter(row => row.correctAnswer === row.answer).length;
  }

  getFinishTime() {
    return this.getAnswersArray()[0].createDate;
  }

  getRemainedTime() {
    return this.getAnswersArray()[0].createDate - this.testTime - 10800000; // 3 hours
  }

  isCorrect(answer: TestAnswer) {
    return answer.correctAnswer === answer.answer;
  }
}
