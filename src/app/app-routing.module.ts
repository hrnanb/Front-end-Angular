import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './componentes/main/registro/registro.component';
import { LoginComponent } from './componentes/main/login/login.component';
import { MainComponent } from '../app/componentes/main/main.component';



const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },


];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)


  ],
})
export class AppRoutingModule { }
