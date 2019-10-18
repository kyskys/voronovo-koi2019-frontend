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
    test: 'Тесты',
    score: 'Рейтинг'
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
        label: this.labels.test,
        routerLink: 'test'
      },
      {
        label: this.labels.score,
        routerLink: 'score'
      }
    ];
  }

}
