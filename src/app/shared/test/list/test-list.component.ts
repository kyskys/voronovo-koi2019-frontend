import {Component} from '@angular/core';
import {Test} from '../../model/test';
import {LazyLoadEvent, MessageService} from 'primeng/api';
import {TestService} from '../shared/test.service';
import {pull, cloneDeep} from 'lodash';

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
  modalTest: Test;
  readonly defaultDate: Date = new Date(1970,1,1,0,0,0,0);

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
    cancel: 'Отменить',
    save: 'Сохранить',
    reset: 'Сбросить',
    notSet: 'Не выставлено'
  };
  showModal: boolean;

  constructor(private testService: TestService,
              private messageService: MessageService) {
    this.isLoading = false;
    this.pageSize = 20;
    this.selectedTests = [];
  }

  getTests(event?: LazyLoadEvent) {
    this.testService.getTests({page: 0, size: this.pageSize, sort: 'id'}).subscribe(tests => {
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
    this.modalTest = cloneDeep(this.selectedTests[0]);
    this.showModal = true;
  }

  updateTest() {
    const date: Date = new Date(this.modalTest.timeToComplete);
    const test = <Test>{
      active: true,
      timeToComplete: date.getHours() * 60 * 60000 + date.getMinutes() * 60000,
      startedAt: this.modalTest.startedAt
    };

    this.testService.updateTest(this.modalTest.id, test).subscribe(res => {
      this.messageService.add({severity: 'success', summary: 'Тест запущен'});
      this.refreshModalTest();
      this.getTests();
      this.selectedTests = [];
    }, () => {
      this.refreshModalTest();
    });
  }

  cancel() {
    this.showModal = false;
  }

  refreshModalTest() {
    this.modalTest = undefined;
    this.showModal = false;
  }

  resetActiveTest(id: number) {
    const test = <Test>{
      active: false,
      timeToComplete: null,
      startedAt: null
    };

    this.testService.updateTest(id, test).subscribe(res => {
      this.messageService.add({severity: 'success', summary: 'Время сброшено'});
      this.getTests();
    });
  }
}
