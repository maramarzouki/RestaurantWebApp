import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { AdminsListComponent } from './admins-list/admins-list.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'addModal', component: AddArticleComponent, canActivate: [AuthGuard] },
  { path: 'articleDetails/:articleID', component: ArticleDetailsComponent, canActivate: [AuthGuard] },
  { path: 'accountSettings/:adminID', component: AccountSettingsComponent, canActivate: [AuthGuard] },
  { path: 'updateAccount/:adminID', component: UpdateAccountComponent, canActivate: [AuthGuard] },
  { path: 'adminsList', component: AdminsListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
