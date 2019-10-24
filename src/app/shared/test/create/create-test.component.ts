import { Component } from '@angular/core';
import { Test } from '../../model/test';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent {

  labels = {
    title: 'Создать тест',
    name: 'Название'
  };
  test: any;
  placeholders = {
    name: 'Название теста'
  };

  constructor() {
    this.test = new Test();
  }

  createTest() {

  }
}
