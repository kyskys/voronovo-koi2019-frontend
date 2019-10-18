import { Component, OnInit } from '@angular/core';
import { Score } from './model/score';
import { ScoreService } from './score.service';
import { LazyLoadEvent } from 'primeng/api';
import { Page } from '../model/page';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  scores: Score[];
  isLoading: boolean;
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

  constructor(private scoreService: ScoreService) {
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
}
