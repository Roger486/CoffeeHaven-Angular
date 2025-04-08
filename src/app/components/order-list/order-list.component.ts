import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../models/order.interface';
import { APP_CONSTANTS } from '../../config/app.constants';

@Component({
  selector: 'app-order-list',
  imports: [],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

  @Input() orderList: Order[] = APP_CONSTANTS.DEFAULT_TABLES_STATE;
  @Output() orderClicked = new EventEmitter<Order>();

  onOrderClick(order: Order) {
    this.orderClicked.emit(order);
  }
}
