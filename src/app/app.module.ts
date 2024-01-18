import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { mainpageComponent } from './mainpage/mainpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { AttractionsComponent } from './attractions/attractions.component';
import { AboutComponent } from './about/about.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import { EventDetailsComponent } from './event-details/event-details.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    mainpageComponent,
    ContactComponent,
    RegisterComponent,
    AttractionsComponent,
    AboutComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
