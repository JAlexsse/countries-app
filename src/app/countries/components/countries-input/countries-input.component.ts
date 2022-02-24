import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-countries-input',
  templateUrl: './countries-input.component.html',
})
export class CountriesInputComponent implements OnInit{

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() searchType: string = '';

  //la idea del debouner es que se emita cuando se deja de escribir
  debouncer: Subject<string> = new Subject();

  query: string = '';

  //se dispara una unica vez cuanod el componente es creado
  ngOnInit(): void {
    this.debouncer
      .pipe(
        //no emitas un valor con el suscribe hasta que pase cierta
        //cantidad de tiempo sin actividad despues de que el usuario
        //deje de escribir
        debounceTime(300) 
      )
      .subscribe( 
        value => this.onDebounce.emit( value )
      );
  }

  search() {
    this.onEnter.emit(this.query);
  }

  keyPressed( ) {
    this.debouncer.next( this.query );
  }
}
