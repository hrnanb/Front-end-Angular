import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {
  public apiUrl = environment.apiBaseUrl;
  public imagesUrl:string = this.apiUrl + '/images/'
  constructor() { }
}
