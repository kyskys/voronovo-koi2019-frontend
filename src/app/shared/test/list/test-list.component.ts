import { Component } from '@angular/core';
import { Test } from '../../model/test';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { TestService } from '../shared/test.service';
import { pull } from 'lodash';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent {
  tests: Test[];
  isLoading: false;
  totalRecords: number;
  pageSize: number;
  selectedTests: Test[];

  cols = [
    {field: 'id', label: 'ID'},
    {field: 'name', label: 'название теста'},
    {field: 'status', label: 'Статус'},
    {field: 'timeToComplete', label: 'Время'},
    {field: 'startedAt', label: 'Дата начала'}
  ];

  labels = {
    delete: 'Удалить',
    edit: 'Редактировать',
    start: 'Начать',
    modal: {
      title: 'Запустить тест',
      date: 'Дата начала',
      time: 'Время на решение'
    },
    cancel: 'Отменить'
  };
  showModal: boolean;

  constructor(private testService: TestService,
              private messageService: MessageService) {
    this.isLoading = false;
    this.pageSize = 20;
  }

  getTests(event: LazyLoadEvent) {
    this.testService.getTests({page: 0, size: this.pageSize, sort: ''}).subscribe(tests => {
      this.pageSize = tests.page.size;
      this.totalRecords = tests.page.totalElements;
      this.tests = tests._embedded.tests;
    });
  }

  deleteSelected(event) {
    this.testService.deleteTests(this.selectedTests.map(score => score.id)).subscribe(response => {
      this.messageService.add({severity: 'success', summary: 'Удаление успешно'});
      pull(this.tests, ...this.selectedTests);
      this.selectedTests = [];
    });
  }

  editSelected() {

  }

  startSelected() {
    this.showModal = true;
  }

  updateTest() {
    this.showModal = false;
  }


  cancel() {
    this.showModal = false;
  }
}
