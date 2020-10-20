import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];

  labels = {
    question: 'Вопрос дня',
    score: 'Рейтинг',
    create: 'Создать тест',
    list: 'Список тестов',
    answers: 'Результаты тестов'
  };

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {
        label: this.labels.question,
        routerLink: 'question'
      },
      {
        label: this.labels.create,
        routerLink: 'test/create'
      },
      {
        label: this.labels.list,
        routerLink: 'test/list'
      },
      {
        label: this.labels.answers,
        routerLink: 'test/answer'
      },
      {
        label: this.labels.score,
        routerLink: 'score'
      }
    ];
  }

}
