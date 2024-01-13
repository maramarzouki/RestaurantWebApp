import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HompepageComponent } from './hompepage/hompepage.component';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from './services/ArticleService/article.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { LoginComponent } from './login/login.component'
import {MatInputModule} from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { UnauthNavbarComponent } from './unauth-navbar/unauth-navbar.component';
import { MakeOrderComponent } from './make-order/make-order.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HompepageComponent,
    MenuComponent,
    NavbarComponent,
    ArticleDetailsComponent,
    LoginComponent,
    UnauthNavbarComponent,
    MakeOrderComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    // MatFormField
  ],
  providers: [
    ArticleService,
    { provide: fetch, useValue: globalThis.fetch }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
