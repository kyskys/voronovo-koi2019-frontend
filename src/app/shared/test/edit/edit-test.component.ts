import { Component, OnInit, ViewChild } from '@angular/core';
import { Test } from '../../model/test';
import { TestItem } from '../../model/test-item';
import { TestService } from '../shared/test.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {
  test: Test;
  testId: number;

  @ViewChild('questionForm', {static: false})
  questionForm: NgForm;

  labels = {
    title: 'Создать тест',
    name: 'Название',
    question: {
      title: 'Вопрос №',
      correctAnswer: 'Правильный ответ'
    }, subtitle: 'Список вопросов'

  };
  placeholders = {
    name: 'Название теста',
    expression: 'Введите описание вопроса',
    correctAnswer: 'Введите правильный ответ',
    option: 'Неправильный ответ'
  };
  buttons = {
    addItem: 'Добавить вопрос',
    deleteQuestion: 'Удалить',
    createTest: 'Создать тест'
  };

  constructor(private testService: TestService,
              private messageService: MessageService,
              private route: ActivatedRoute) {
    this.test = new Test();
  }

  ngOnInit() {
    const id = <number>this.route.snapshot.paramMap.get('id');
    if (id) {
      const aee = combineLatest(this.testService.getTestInfo(id),
        this.testService.getTestItems(id))
        .subscribe(res => {
          this.test = res[0]._embedded.test;
          this.test.items = res[1]._embedded.items;
        });
    }
  }

  createTest() {
    if (!this.questionForm.valid) {
      return;
    }

    this.test.active = false;
    this.testService.createTest(this.test).subscribe(test => {
      this.messageService.add({severity: 'success', summary: 'Тест успешно создан', detail: 'ID - ' + test.id});
    });
  }

  updateTest() {
    if (!this.questionForm.valid) {
      return;
    }

    this.testService.updateTest(this.testId, this.test).subscribe(test => {
      this.messageService.add({severity: 'success', summary: 'Тест успешно создан', detail: 'ID - ' + test.id});
    });
  }

  addTestItem() {
    this.test.items.push(new TestItem());
  }

  deleteOption(j: number, options: string[]) {
    options.splice(j, 1);
  }

  addOption(allOptions: string[]) {
    allOptions.push('');
  }

  trackByIndex(index, item) {
    return index;
  }

  deleteQuestion(i: number) {
    this.test.items.splice(i, 1);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  scrollToBottom() {
    window.scrollTo(0, document.documentElement.scrollHeight);
  }

  scrollbarVisible() {
    return document.documentElement.scrollHeight > document.documentElement.clientHeight;
  }

  scrollTo(k: number) {
    document.getElementById('item' + k).scrollIntoView();
    document.documentElement.scrollTop += -50;
  }
}
