import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from './service/AdminService/admin.service';
import { ArticleService } from './service/ArticleService/article.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { DeleteAlertComponent } from './delete-alert/delete-alert.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list'
import { AdminsListComponent } from './admins-list/admins-list.component';
import { AddAdminComponent } from './add-admin/add-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    AddArticleComponent,
    ArticleDetailsComponent,
    UpdateArticleComponent,
    DeleteAlertComponent,
    AccountSettingsComponent,
    UpdateAccountComponent,
    AdminsListComponent,
    AddAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatListModule
  ],
  providers: [
    AdminService,
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
