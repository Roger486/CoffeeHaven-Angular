import { Component } from '@angular/core';
import { APP_CONSTANTS } from '../../config/app.constants';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
  coffeShopName: string = APP_CONSTANTS.COFFEE_SHOP_NAME;
}
