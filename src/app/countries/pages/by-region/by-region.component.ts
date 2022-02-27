import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
})
export class ByRegionComponent {

  regions: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  activeRegion: string = '';
  countries: Country[] = [];
  err: boolean = false;

  constructor(
    private countriesService: CountriesService 
  ) { }

  activateRegion( region: string ) {
    this.err = false;

    if ( region !== this.activeRegion ) {
      this.activeRegion = region;
      this.countries = []; //purgar paises para acelerar la vel de respuesta
      this.countriesService
      .searchCountriesByRegion( region )
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
      console.log('We are making a new request.');
    }
    
  }

  getCssClass( region: string):string {
    return (region !== this.activeRegion) 
      ? 'btn btn-outline-primary m-1' 
      : 'btn btn-primary';
  }

}
