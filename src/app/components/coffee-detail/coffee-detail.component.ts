// src/app/coffee-detail/coffee-detail.component.ts
import { Component } from '@angular/core';
import { Coffee } from '../../models/coffee.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoffeeService } from '../../services/coffee.service';

@Component({
  selector: 'app-coffee-detail',
  imports: [RouterLink],
  templateUrl: './coffee-detail.component.html',
  styleUrl: './coffee-detail.component.css'
})
export class CoffeeDetailComponent {
  coffee: Coffee | null = null;

  constructor(private activatedRoute: ActivatedRoute, private coffeeService: CoffeeService) {}

  ngOnInit() {
    const coffeeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.coffeeService.getCoffee(Number(coffeeId)).subscribe(data => this.coffee = data);
  }

  backToMenu() {
     
    }

}
