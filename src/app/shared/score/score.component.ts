import {Component, OnInit} from '@angular/core';
import {Score} from './shared/model/score';
import {ScoreService} from './score.service';
import {LazyLoadEvent, MessageService} from 'primeng/api';
import {Page} from '../model/page';
import {pull} from 'lodash';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  scores: Score[];
  selectedScores: Score[];
  isLoading: boolean;
  isSelected: boolean;
  totalRecords: number;
  pageSize: number;

  cols = [
    {field: 'id', label: 'ID'},
    {field: 'name', label: 'Имя ученика'},
    {field: 'date', label: 'Дата прохождения'},
    {field: 'time', label: 'Время'},
    {field: 'percent', label: '%'},
    {field: 'category', label: 'Категория'}
  ];

  labels = {
    delete: "Удалить"
  };

  constructor(private scoreService: ScoreService,
              private messageService: MessageService) {
    this.isLoading = false;
    this.pageSize = 20;
  }

  ngOnInit() {
    this.scoreService.getScores({page: 0, size: this.pageSize, sort: ''}).subscribe(scores => {
      this.pageSize = scores.page.size;
      this.totalRecords = scores.page.totalElements;
      this.scores = scores._embedded.scores;
    });
  }

  getScores(event: LazyLoadEvent) {
    const page = <Page>{
      page: Math.floor(event.first / this.pageSize),
      size: 20,
      sort: ''
    };
    setTimeout(() => {
      this.isLoading = true;
      this.scoreService.getScores(page).subscribe(scores => {
        this.scores = scores._embedded.scores;
        this.isLoading = false;
      }, () => this.isLoading = false);
    }, 1000);
  }

  deleteSelected(event: any) {
    this.scoreService.deleteScores(this.selectedScores.map(score => score.id)).subscribe(response => {
      this.messageService.add({severity: 'success', summary: 'Удаление успешно'});
      pull(this.scores, ...this.selectedScores);
      this.selectedScores = [];
    });
  }

  percent(percent: number) {
    return percent ? percent / 100 : 0;
  }
}
