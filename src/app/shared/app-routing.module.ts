import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { ScoreComponent } from './score/score.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestListComponent } from './test/list/test-list.component';
import { EditTestComponent } from './test/edit/edit-test.component';
import { TestAnswerComponent } from './test/answer/answer.component';

const appRoutes: Routes = [
  {
    path: 'score',
    component: ScoreComponent
  },
  {
    path: 'test/create',
    component: EditTestComponent
  },
  {
    path: 'test/edit/:id',
    component: EditTestComponent
  },
  {
    path: 'test/list',
    component: TestListComponent
  },
  {
    path: 'test/answer',
    component: TestAnswerComponent
  },
  {
    path: 'question',
    component: QuestionComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule {
}
