import { Component } from '@angular/core';
import { APP_CONSTANTS } from '../../config/app.constants';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  coffeShopName: string = APP_CONSTANTS.COFFEE_SHOP_NAME;
}
