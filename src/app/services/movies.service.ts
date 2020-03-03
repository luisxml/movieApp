import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private pupularesPage = 0;

  constructor(
    private _http: HttpClient
  ) { }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this._http.get<T>(query);
  }
  
  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const desde = `${hoy.getFullYear()}-${mesString}-01`;
    const hasta = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${desde}&primary_release_date.lte=${hasta}`);
  }

  getPupulares() {
    this.pupularesPage++;
    
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.pupularesPage}`;

    return this.ejecutarQuery<RespuestaMDB>(`${query}`);
    
  }


}
