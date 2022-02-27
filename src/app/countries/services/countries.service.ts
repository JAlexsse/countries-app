import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private fields: string = 'name,capital,flags,ccn3,population';
  
  get httpParams(): HttpParams {
    return new HttpParams().set('fields', this.fields);
  }

  constructor(
    private http: HttpClient
  ) { }

  searchCountry( query: string ):Observable<Country[]> {

    const url = `${ this.apiUrl }/name/${ query }?${ this.fields }`;

    return this.http.get<Country[]>( url, { params : this.httpParams } ); 
    // es redundante asignar el valor a la propiedad 
    //si estan en el mismo scope y tienen el mismo nombre { params: params }

  }

  searchCountryByCapital( query: string ):Observable<Country[]> {

    const url = `${ this.apiUrl }/capital/${ query }`;

    return this.http.get<Country[]>( url, { params : this.httpParams } );

  }

  searchCountriesByRegion( query: string ):Observable<Country[]> {

    const url = `${ this.apiUrl }/region/${ query }`;

    return this.http.get<Country[]>( url, { params : this.httpParams } );

  }

  searchCountryById( query: string ):Observable<Country[]> {

    const url = `${ this.apiUrl }/alpha/${ query }`;

    return this.http.get<Country[]>( url );

  }

}
