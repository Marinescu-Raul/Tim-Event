import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mainpageComponent } from './mainpage/mainpage.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { AttractionsComponent } from './attractions/attractions.component';
import { AboutComponent } from './about/about.component';
import { EventDetailsComponent } from './event-details/event-details.component';

const routes: Routes = [
{  path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'mainpage', component: mainpageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent},
  {path: 'attractions', component: AttractionsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'eventDetails', component: EventDetailsComponent},
  // other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
