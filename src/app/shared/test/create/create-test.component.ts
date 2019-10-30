import { Component, ViewChild } from '@angular/core';
import { Test } from '../../model/test';
import { TestItem } from '../../model/test-item';
import { TestService } from '../shared/test.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent {
  test: Test;

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
              private messageService: MessageService) {
    this.test = new Test();
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
