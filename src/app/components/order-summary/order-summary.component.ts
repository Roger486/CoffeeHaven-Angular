import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../models/order.interface';

@Component({
  selector: 'app-order-summary',
  imports: [],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {

  @Input() order: Order = { tableId: 0, orderItems: [] };
  @Output() deleteOrderClicked = new EventEmitter<number>();

  onDeleteOrderClick() {
    this.deleteOrderClicked.emit(this.order.tableId);
  }
}
