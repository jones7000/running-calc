import { Component, OnInit } from '@angular/core';
import { CalcpaceComponent } from "./calcpace/calcpace.component";
import { CalcheartrateComponent } from "./calcheartrate/calcheartrate.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalcpaceComponent, CalcheartrateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}