import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score/score.component';
import { QuestionComponent } from './question/question.component';
import { TestComponent } from './test/test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from "./app-routing.module";
import { MenubarModule } from 'primeng/menubar';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MenubarModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    ScoreComponent,
    QuestionComponent,
    TestComponent,
    PageNotFoundComponent,
    HeaderComponent
  ]
})
export class SharedModule {
}
