import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-view-country',
  templateUrl: './view-country.component.html',
})
export class ViewCountryComponent implements OnInit {

  country!: Country;

  constructor(
    //viene con todo lo necesario para suscribirnos
    //a cualquier cambio en la url
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService

  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        //permite recibir un observable y regresar uno tambien
        switchMap( ( { id } ) => this.countriesService.searchCountryById( id ) ),
        tap( console.log ) //toma el resultado del anterior comando y lo imprime
        
      )
      .subscribe( response => 
        this.country = response[0]
      );

  }
}
