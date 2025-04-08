import { Component } from '@angular/core';
import { APP_CONSTANTS } from '../../config/app.constants';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  coffeShopName: string = APP_CONSTANTS.COFFEE_SHOP_NAME;
  developerName: string = APP_CONSTANTS.DEVELOPER;
}
