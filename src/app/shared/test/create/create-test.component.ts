import {Component} from '@angular/core';
import {Test} from '../../model/test';
import {TestItem} from '../../model/test-item';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent {
  test: Test;

  labels = {
    title: 'Создать тест',
    name: 'Название',
    question: {
      title: 'Вопрос №',
      correctAnswer: 'Правильный ответ'
    },
  };
  placeholders = {
    name: 'Название теста',
    expression: 'Введите описание вопроса',
    correctAnswer: 'Введите правильный ответ',
    option: 'Неправильный ответ'
  };
  buttons = {
    addItem: 'Добавить вопрос',
    deleteQuestion: 'Удалить'
  };

  constructor() {
    this.test = new Test();
  }

  createTest() {

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
}
