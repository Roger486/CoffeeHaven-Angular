import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '../config/app.constants';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Order } from '../models/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private localStorageKey: string = APP_CONSTANTS.LOCAL_STORAGE_ORDER_LIST_KEY;
  private tables: number = APP_CONSTANTS.SERVICEABLE_TABLES;


  // Observable setup with the orders info
  private orderListSubject = new BehaviorSubject<Order[]>([]);
  orderList$ = this.orderListSubject.asObservable();

  constructor() {
    this.loadOrders();
  }

  /**
   * If there are orders in the Local Storage, emits them throught orderListSubject, otherwise emits an empty array.
   */
  loadOrders(): void {
    const storedOrders = this.getOrdersFromLocalStorage();
    if ((storedOrders.length > this.tables) || !storedOrders) {
      this.saveCoffeesToLocalStorage(storedOrders);
      this.orderListSubject.next(storedOrders);
      console.log('Loading default orders.');
    } else {
      this.orderListSubject.next(storedOrders);
    }
  }

  /**
   * Gets a specific order from orderList$ by its ID.
   * @param {number} tableId The unique identifier of the coffee.
   * @returns {Observable<Order | null>} An observable with the coffee object or null if not found.
   */
  getOrder(tableId: number): Observable<Order | null> {
    return this.orderList$.pipe(
      map( orders => ( orders.find(order => order.tableId === tableId)) || null)
    );
  }

    /**
     * Save the provided list of orders to Local Storage.
     *
     * @private
     * @param {Order[]} orders - The list of orders to save.
     */
    private saveCoffeesToLocalStorage(orders: Order[]): void {
      localStorage.setItem(this.localStorageKey, JSON.stringify(orders));
    }

  /**
   * If there are orders in the Local Storage, returns them, otherwise returns an empty array.
   * @private
   * @returns 
   */
  private getOrdersFromLocalStorage(): Order[] {
    const storedOrders = localStorage.getItem(this.localStorageKey);
    return storedOrders ? JSON.parse(storedOrders) : APP_CONSTANTS.DEFAULT_TABLES_STATE;
  }

  updateOrder(order: Order): void {
    if (order.tableId > 0 && order.tableId <= APP_CONSTANTS.SERVICEABLE_TABLES) {
      const currentOrders = this.orderListSubject.value;
      const updatedOrders = currentOrders.map((currentOrder) => {
        if (currentOrder.tableId === order.tableId) return order;
        else return currentOrder;
      });
      this.saveCoffeesToLocalStorage(updatedOrders);
      this.orderListSubject.next(updatedOrders);
    }
  }
}
