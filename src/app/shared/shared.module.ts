import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score/score.component';
import { QuestionComponent } from './question/question.component';
import { TestListComponent } from './test/list/test-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ButtonModule} from 'primeng/button';
import { HeaderComponent } from './header/header.component';
import { PaginatorModule } from 'primeng/paginator';
import { CategoryNamePipe } from './pipe/category-name/category-name.pipe';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { EditTestComponent } from './test/edit/edit-test.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MenubarModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    DialogModule,
    CalendarModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    ScoreComponent,
    QuestionComponent,
    EditTestComponent,
    TestListComponent,
    PageNotFoundComponent,
    HeaderComponent,
    CategoryNamePipe
  ]
})
export class SharedModule {
}
