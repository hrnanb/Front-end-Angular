import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Persona } from  'src/app/models/persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebaServiciosService {
  private apiServeUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
    public getUser(): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiServeUrl}/view/persona/1`)

    }

    public updateUsuario(persona:Persona):Observable<Persona>{
      return this.http.put<Persona>(`${this.apiServeUrl}/new/persona/`,persona);
    }
  }


