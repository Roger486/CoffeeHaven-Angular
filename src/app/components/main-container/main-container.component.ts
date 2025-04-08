// src/app/main-container/main-container.component.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { TitleComponent } from "../title/title.component";

@Component({
  selector: 'app-main-container',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, TitleComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.css'
})
export class MainContainerComponent {

}
