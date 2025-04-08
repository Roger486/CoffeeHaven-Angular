import { OrderItem } from "./order-item.interface";

export interface Order {
    tableId: number;
    orderItems: OrderItem[];
}
