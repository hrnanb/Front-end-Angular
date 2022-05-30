import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';


import { HeaderComponent } from '../app/componentes/main/header/header.component';
import { MainComponent } from './componentes/main/main.component';
import { FooterComponent } from './componentes/main/footer/footer.component';
import { BannerComponent } from '../app/componentes/main/banner/banner.component';
import { InfoPersonalComponent } from './componentes/main/info-personal/info-personal.component';
import { EducacionComponent } from './componentes/main/educacion/educacion.component';
import { ExperienciaComponent } from './componentes/main/experiencia/experiencia.component';
import { SkillsComponent } from './componentes/main/skills/skills.component';
import { ProyectosComponent } from './componentes/main/proyectos/proyectos.component';
import { LoginComponent } from './componentes/main/login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule} from '@angular/router';
import { interceptorProvider } from './interceptors/educacion-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardPersonalComponent } from './componentes/main/card-personal/card-personal.component';
import {RegistroComponent} from './componentes/main/registro/registro.component';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    BannerComponent,
    InfoPersonalComponent,
    EducacionComponent,
    ExperienciaComponent,
    SkillsComponent,
    ProyectosComponent,
    RegistroComponent,
    LoginComponent,
    CardPersonalComponent,
    RegistroComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot(),
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,

  ],



  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
