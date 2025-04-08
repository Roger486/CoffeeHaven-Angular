import { Component } from '@angular/core';
import { CoffeeListComponent } from "../coffee-list/coffee-list.component";
import { OrderSummaryComponent } from "../order-summary/order-summary.component";
import { Coffee } from '../../models/coffee.interface';
import { CoffeeService } from '../../services/coffee.service';
import { OrderListComponent } from "../order-list/order-list.component";
import { Order } from '../../models/order.interface';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-new-order',
  imports: [CoffeeListComponent, OrderSummaryComponent, OrderListComponent],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent {

  coffeeList: Coffee[] = [];
  orderList: Order[] = [];
  order: Order = { tableId: 0, orderItems: [] };

  constructor(private coffeeService: CoffeeService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.coffeeService.coffeeList$.subscribe((data) => {
      this.coffeeList = data;
      }
    );
    this.orderService.orderList$.subscribe((data) => {
      this.orderList = data;
    });
    
  }

  /**
   * Adds a coffee to the order or increases its quantity if already present.
   *
   * @param coffee - The clicked coffee to add.
   */
  addToOrder = (coffee: Coffee) => {
    const existingItem = this.order.orderItems.find((item) => item.coffee.id === coffee.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.order.orderItems.push({ coffee, quantity: 1 });
    }
    this.updateOrders(this.order);
  }

  displayOrder(order: Order) {
    this.order = order;
  }

  deleteOrder(tableID: number) {
    this.orderList.map( order => {
      if (order.tableId === tableID) {
        order.orderItems = [];
        this.orderService.updateOrder(order);
      }
    });
  }

  private updateOrders(order: Order) {
    this.orderService.updateOrder(order);
  }
}
