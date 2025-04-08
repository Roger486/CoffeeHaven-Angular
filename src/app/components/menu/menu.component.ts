// /app/menu/menu.component.ts

import { Component } from '@angular/core';
import { CoffeeService } from '../../services/coffee.service';
import { Coffee } from '../../models/coffee.interface';
import { CoffeeListComponent } from "../coffee-list/coffee-list.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CoffeeListComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  
  coffeeList: Coffee[] = [];

  constructor(private coffeeService: CoffeeService, private router: Router) {}

  ngOnInit(): void {
    this.coffeeService.coffeeList$.subscribe((data) => {
      this.coffeeList = data;
      }
    );
  }
  
  /*
IMPORTANT:
For this function to be passed to a child component and work as intended, it must be an Arrow function.
This is because when working with "=>", the "this." will refer to the parent (where the function is defined).
In this case it's important because of the this.router property is in this component, not in the child where the function will be executed.
If the function was not defined as arrow function, "this" would refer to the child component (where it will be called), causing non intended behaviour.
  */
  openCoffeeDetails = (coffee: Coffee): void => {
    this.router.navigate(['/menu', coffee.id]);
  };
}
