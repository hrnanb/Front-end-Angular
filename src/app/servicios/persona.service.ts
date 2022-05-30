import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Persona } from 'src/app/models/persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiServerUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) {}
    public getPersona(): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiServerUrl}/view/persona/1`)

    }

    public updatePersona(persona:Persona):Observable<Persona>{
      return this.http.put<Persona>(`${this.apiServerUrl}/update/persona`,persona);
    }

    public addPersona(persona: Persona): Observable<Persona> {
      return this.http.post<Persona>(`${this.apiServerUrl}/new/persona`, persona);
    }
  public deletePersona(idPersona: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/persona/delete/${idPersona}`);
  }
}
