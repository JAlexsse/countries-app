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
  suggestedCountries: Country[] = [];
  showSuggested: boolean = false;
  searchType: string = 'Search country by name...'

  constructor(
    private countryService: CountriesService
  ) { }

  search( query: string ) {
    this.err = false;
    this.query = query;
    this.showSuggested = false;

    this.countryService
      .searchCountry( this.query )
      .subscribe(
        {
          next: ( response ) => {
            this.countries = response;
          },
          error: ( error ) => {
            this.err = true;
            this.countries = [];
            console.error( error );
          }
        }
      );
  }

  suggestions( query:string ) {
    this.err = false;
    this.showSuggested = true;
    this.query = query;

    this.countryService.searchCountry( query )
      .subscribe( 
        {
          next: ( response ) => {
            this.suggestedCountries = response.splice(0,5);
          },
          error: ( error ) => {
            this.suggestedCountries = [];
            console.error( error );
          }
        }
      );
  }
}
