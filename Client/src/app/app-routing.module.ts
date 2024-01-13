import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HompepageComponent } from './hompepage/hompepage.component';
import { MenuComponent } from './menu/menu.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HompepageComponent },
  { path: 'menu/:category', component: MenuComponent },
  { path: 'articleDetails/:articleID', component: ArticleDetailsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
