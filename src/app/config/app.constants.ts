// src/app/constants/app.constants.ts

export const APP_CONSTANTS = {
    API_URL: 'https://api.sampleapis.com/coffee/hot',
    LOCAL_STORAGE_COFFEE_LIST_KEY: 'coffees',
    LOCAL_STORAGE_ORDER_LIST_KEY: 'orders',
    COFFEE_SHOP_NAME: 'Nordic Coffee Haven',
    SERVICEABLE_TABLES: 6,
    DEVELOPER: 'Roger Navarro',
    // Array with no orders placed, when an order has ID=0 it will mean that there is no order placed.
    DEFAULT_TABLES_STATE: Array.from({ length: 6 }, (_, i) => ({
        tableId: i + 1,
        orderItems: []
    })),
    NO_ORDER_PLACED: 0
}