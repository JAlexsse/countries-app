import { Component } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
})
export class ByCountryComponent {

  query: string = '';
  err: boolean = false;
  countries: Country[] = [];
  searchType: string = 'Search country by name...'

  constructor(
    private countryService: CountriesService
  ) { }

  search( query: string ) {
    this.err = false;
    this.query = query;
    
    this.countryService
      .searchCountry( this.query )
      .subscribe(
        {
          next: ( response ) => {
            this.countries = response;
            console.log( response );
          },
          error: ( error ) => {
            this.err = true;
            this.countries = [];
            console.log( error );
          }
        }
      );
  }

  suggestions( query:string ) {
    this.err = false;
  }
}
