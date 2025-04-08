// src/app/add-coffee/add-coffee.component.ts

import { Component } from '@angular/core';
import { Coffee } from '../../models/coffee.interface';
import { CoffeeService } from '../../services/coffee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-coffee',
  imports: [FormsModule],
  templateUrl: './add-coffee.component.html',
  styleUrl: './add-coffee.component.css'
})
export class AddCoffeeComponent {
  
  newCoffee: Coffee = { id: 0, title: '', description: '', image: 'nordicCoffeHavenLogo.jpg', ingredients: [] };
  newIngredient: string = '';
  displaySubmitErrorMessage = false;
  displaySubmitSuccessMessage = false;

  constructor(private coffeeService: CoffeeService) {}

  /**
   * Adds a new coffee to the list using the CoffeeService.
   */
  onAddCoffee(): void {
    const proceed: boolean = !this.IsanyFieldEmpty();

    this.displaySubmitErrorMessage = !proceed;
    this.displaySubmitSuccessMessage = proceed;

    if (proceed) {
      console.log(`[${this.newCoffee.title}]`);
      this.newCoffee.id = Date.now(); // Generate a unique id
      this.coffeeService.addCoffee(this.newCoffee);
      this.newCoffee = { id: 0, title: '', description: '', image: 'nordicCoffeHavenLogo.jpg', ingredients: [] }; // Clear the form
      this.newIngredient = '';

      console.log(`[${this.newCoffee.title}]`);
    }
  }

  /**
   * Adds an ingredient to the list of ingredients if the trimmed value of the new ingredient has length.
   */
  addIngredient(): void {
    this.newIngredient = this.newIngredient.trim();
    if (this.newIngredient) {
      this.newCoffee.ingredients.push(this.newIngredient);
      this.newIngredient = '';
    } else {
      
    }
  }

  /**
   * Removes an ingredient from the list of ingredients.
   * @param index {number} - The index of the ingredient to remove.
   */
  removeIngredient(index: number): void {
    this.newCoffee.ingredients.splice(index, 1);
  }

  /**
   * Trimps the title and the description of the this.newCoffee and checks if any of this values is empty.
   * @returns {boolean} true if any field is empty, false otherwise.
   */
  private IsanyFieldEmpty(): boolean {
    const isTitleEmpty = !this.newCoffee.title.trim();
    const isDescriptionEmpty = !this.newCoffee.description.trim();
    const areIngredientsEmpty = this.newCoffee.ingredients.length === 0;

    return isTitleEmpty || isDescriptionEmpty || areIngredientsEmpty;
  }
}
