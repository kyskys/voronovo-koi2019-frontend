import {Component, OnInit} from '@angular/core';
import {Question} from "./shared/model/question";
import {ImageService} from "../service/image/image.service";
import {environment} from "../../../environments/environment";
import {QuestionService} from "./question.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question: Question;
  isUploaded: boolean;

  labels = {
    title: 'Создать задачу дня',
    description: 'Описание (необязательно)',
    answer: 'Правильный ответ',
    image: 'Изображение',
    chooseLabel: 'Выбрать',
    uploadLabel: 'Загрузить',
    cancelLabel: 'Отменить',
    successfullyUploaded: 'Файл успешно загружен!',
  };

  placeholders = {
    answer: 'Введите правильный ответ',
    description: 'Введите описание задачи дня'
  };

  buttons = {
    create: 'Создать'
  };

  constructor(private imageService: ImageService,
              private questionService: QuestionService,
              private messageService: MessageService) {
    this.question = new Question();
    this.isUploaded = false;
  }

  ngOnInit() {
  }

  createQuestion() {
    this.questionService.createQuestion(this.question).subscribe(response => {
      this.messageService.add({severity: 'success', summary: 'Задача дня создана', detail: `id=${response.id}`})
    });
  }

  uploadImage(event: any) {
    this.question.image = event.originalEvent.body.value;
    this.isUploaded = true;
    setTimeout(() => {
      this.isUploaded = false
    }, 1000);
  }

  uploadUrl() {
    return '/image';
  }
}
