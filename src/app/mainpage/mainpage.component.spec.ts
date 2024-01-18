import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import { LoginComponent } from '../login/login.component';


const routes: Routes = [
  //{ path: 'events', component: MainEventComponent },
 { path: 'abou', component: LoginComponent },
  { path: 'contac', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

