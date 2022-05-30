import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionServiceService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


  public getEducacion(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(`${this.apiServerUrl}/view/educacion`);

  }

  public addEducacion(educacion: Educacion): Observable<Educacion> {
    return this.http.post<Educacion>(`${this.apiServerUrl}/new/educacion`, educacion);
  }

  public updateEducacion(educacion: Educacion): Observable<Educacion> {
    return this.http.put<Educacion>(`${this.apiServerUrl}/update/educacion`, educacion)
  }
  public deleteEducacion(idEdu: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/educacion/delete/${idEdu}`);
  }
}
