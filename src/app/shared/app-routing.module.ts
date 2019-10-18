import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { TestComponent } from "./test/test.component";
import { QuestionComponent } from "./question/question.component";
import { ScoreComponent } from "./score/score.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const appRoutes: Routes = [
  {
    path: 'score',
    component: ScoreComponent
  },
  {
    path: 'test',
    component: TestComponent
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
