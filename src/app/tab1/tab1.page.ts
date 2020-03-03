import { Component,  } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  peliculasRecientes: Pelicula[] = [];
  populares : Pelicula[] = [];

 

  constructor(
    private _movieService: MoviesService
  ) {}


  ngOnInit() {
    this._movieService.getFeature().subscribe(
      response => {
        //console.log(response);
        this.peliculasRecientes = response.results;
      }
    );

    this.getPopulares();

  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this._movieService.getPupulares().subscribe(
      response => {
        const arrTemp = [...this.populares, ...response.results];
        this.populares = arrTemp;
      } 
    );
  }

}
