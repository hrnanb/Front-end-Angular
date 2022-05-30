import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Proyectos } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {


  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


  public getProyectos(): Observable<Proyectos[]> {
    return this.http.get<Proyectos[]>(`${this.apiServerUrl}/view/proyectos`);

  }

  public addProyectos(proyectos: Proyectos): Observable<Proyectos> {
    return this.http.post<Proyectos>(`${this.apiServerUrl}/new/proyectos`, proyectos);
  }

  public updateProyectos(proyectos: Proyectos): Observable<Proyectos> {
    return this.http.put<Proyectos>(`${this.apiServerUrl}/update/proyectos/`, proyectos)
  }
  public deleteProyectos(idProyecto: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/proyectos/delete/${idProyecto}`);
  }

}
