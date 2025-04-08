// src/app/coffee-list/coffee-list.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Coffee } from '../../models/coffee.interface';

@Component({
  selector: 'app-coffee-list',
  imports: [],
  templateUrl: './coffee-list.component.html',
  styleUrl: './coffee-list.component.css'
})
export class CoffeeListComponent {

  // The coffee list will be passed to the component by its parent component
  @Input() coffeeList: Coffee[] = [];
  // A function with specified parameter can be also passed throught @Input
  // if no funtion is passed, it will be a default empty function that does nothing
  @Input() action: (coffee: Coffee) => void = () =>{};
  // If the parent wants to get the data, an @Output decorator can be used
  @Output() coffeeClicked = new EventEmitter<Coffee>();

  onCoffeeClick(coffee: Coffee): void {
    // This executes the passed function or the default empty function
    this.action(coffee);
    // This emits the coffee to the parent component
    this.coffeeClicked.emit(coffee);
  }

}
