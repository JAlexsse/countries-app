import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
})
export class ByCapitalComponent {

  query: string = '';
  err: boolean = false;
  countries: Country[] = [];
  searchType: string = 'Search country by capital...'

  constructor(
    private countryService: CountriesService
  ) { }

  search( query: string ) {
    this.err = false;
    this.query = query;
    
    this.countryService
      .searchCountryByCapital( this.query )
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
