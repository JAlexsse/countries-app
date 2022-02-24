import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(
    private http: HttpClient
  ) { }

  searchCountry( query: string ):Observable<Country[]> {

    const url = `${ this.apiUrl }/name/${ query }`;

    return this.http.get<Country[]>( url );

  }

  searchCountryByCapital( query: string ):Observable<Country[]> {

    const url = `${ this.apiUrl }/capital/${ query }`;

    return this.http.get<Country[]>( url );

  }

  searchCountryById( query: string ):Observable<Country[]> {

    const url = `${ this.apiUrl }/alpha/${ query }`;

    return this.http.get<Country[]>( url );

  }

}
