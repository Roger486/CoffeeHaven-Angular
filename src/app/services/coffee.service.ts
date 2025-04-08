// src/app/services/coffee.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Coffee } from '../models/coffee.interface';
import { APP_CONSTANTS } from '../config/app.constants';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to get coffee data from the API and save it to Local Storage.
 */
export class CoffeeService {

  private apiUrl = APP_CONSTANTS.API_URL;
  private localStorageKey = APP_CONSTANTS.LOCAL_STORAGE_COFFEE_LIST_KEY;
  /*
  NOTAS en castellano:
  Vamos a crear un sistema por el cual la lista de cafés se comparta a tiempo real con todos los componentes que se suscriban.
  BehaviorSubject: tipo de subject que almacena el último valor emitido, de forma que si un componente se suscribe tarde, recibirá inmediatamente ese valor.
  Subject: tipo especial de Observable que permite decidir cuándo y con qué valores se emite la información con el método next(valor).
  next(valor): método que hace que el BehaviorSubject/Subject emita el valor parámetro a todos los suscritores (multicast).
  */
  private coffeeListSubject = new BehaviorSubject<Coffee[]>([]);
  /*
  NOTAS en castellano
  asObservable() devuelve un Observable basado en coffeeListSubject y lo almacenamos en coffeeList$ que quedará expuesto (público).
  Cualquiera que se suscriba a coffeeList$ recibirá el último valor que hayamos emitido con next(valor).
  Se expone coffeeList$ en lugar del BehaviorSubject/Subject para evitar acceso a sus métodos (next() por ejemplo)
  */
  coffeeList$ = this.coffeeListSubject.asObservable();
  

  constructor(private http: HttpClient) {
    this.loadCoffees();
  }

  /**
   * Gets the local storage infor, and if there is any, emits it.
   * Otherwise gets the coffees from the API, updates the local storage and emits the info.
   */
  private loadCoffees(): void {
    const storedCoffees = this.getCoffeesFromLocalStorage();

    if (storedCoffees.length > 0) {
      this.coffeeListSubject.next(storedCoffees); // emits the obtained coffees from local storage
    } else {
      this.getCoffeesFromApiAndUpdateOnLocalStorage().subscribe((coffees) => {
        this.coffeeListSubject.next(coffees); // emits the obtained coffees from the API
      });
    }
  }

  /**
   * Adds a new coffee to the list, updates Local Storage and updates subscribers
   * 
   * @param {Coffee} newCoffee The coffee object to add.
   */
  addCoffee(newCoffee: Coffee) {
    // get the last emited coffee list and add the new coffee to it
    const coffeeListCopy = this.coffeeListSubject.value;
    const updatedCoffeeList = [...coffeeListCopy, newCoffee]
    
    // store and emit the new list
    this.saveCoffeesToLocalStorage(updatedCoffeeList);
    this.coffeeListSubject.next(updatedCoffeeList);
  }

  /**
   * Get a specific coffee by its ID.
   * It first checks Local Storage for the data. If not found, it fetches from the API.
   *
   * @param {number} coffeeId The unique identifier of the coffee.
   * @returns {Observable<Coffee | null>} An observable with the coffee object or null if not found.
   */
  getCoffee(coffeeId: number): Observable<Coffee | null> {
      return this.coffeeList$.pipe(
        map((coffees) => coffees.find((coffee) => coffee.id === coffeeId) || null)
      );
  }

  /**
   * Get the list of coffees from the API and update Local Storage.
   *
   * @private
   * @returns {Observable<Coffee[]>} An observable emitting the list of coffees.
   */
  private getCoffeesFromApiAndUpdateOnLocalStorage(): Observable<Coffee[]> {
    return this.http.get<Coffee[]>(this.apiUrl).pipe(
      tap((data) => this.saveCoffeesToLocalStorage(data)) // save to Local Storage after loading API data
    );
  }

  /**
   * Save the provided list of coffees to Local Storage.
   *
   * @private
   * @param {Coffee[]} coffees - The list of coffees to save.
   */
  private saveCoffeesToLocalStorage(coffees: Coffee[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(coffees));
  }

  /**
   * Get the list of coffees from Local Storage.
   *
   * @private
   * @returns {Coffee[]} The list of coffees from Local Storage or an empty array if none are found.
   */
  private getCoffeesFromLocalStorage(): Coffee[] {
    const storedCoffees = localStorage.getItem(this.localStorageKey);
    return storedCoffees ? JSON.parse(storedCoffees) : [];
  }
}
