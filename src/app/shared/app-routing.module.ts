import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTestComponent } from './test/create/create-test.component';
import { QuestionComponent } from './question/question.component';
import { ScoreComponent } from './score/score.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestListComponent } from './test/list/test-list.component';

const appRoutes: Routes = [
  {
    path: 'score',
    component: ScoreComponent
  },
  {
    path: 'test/create',
    component: CreateTestComponent
  },
  {
    path: 'test/list',
    component: TestListComponent
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
