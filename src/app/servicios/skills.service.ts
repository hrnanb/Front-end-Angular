import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Skills } from '../models/skills';


@Injectable({
  providedIn: 'root'
})
export class SkillsService {


  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


  public getSkills(): Observable<Skills[]> {
    return this.http.get<Skills[]>(`${this.apiServerUrl}/view/skills`);

  }

  public addSkills(skills: Skills): Observable<Skills> {
    return this.http.post<Skills>(`${this.apiServerUrl}/new/skills`, skills);
  }

  public updateSkills(skills: Skills): Observable<Skills> {
    return this.http.put<Skills>(`${this.apiServerUrl}/update/skills`, skills)
  }
  public deleteSkills(idSkill: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/skills/delete/${idSkill}`);
  }

}
