import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calcheartrate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calcheartrate.component.html',
  styleUrls: ['./calcheartrate.component.css'],
})
export class CalcheartrateComponent {
  hfMax: number = 0; // Eingabe für die HFmax
  zones: { name: string; percentage: string; range: string | null }[] = [
    { name: 'langsamer DL', percentage: '70-75%', range: null },
    { name: 'ruhiger DL', percentage: '75-80%', range: null },
    { name: 'lockerer DL', percentage: '80-85%', range: null },
    { name: 'zügiger DL', percentage: '85-90%', range: null },
  ];

  calculateZones(): void {
    if (this.hfMax > 0) {
      this.zones = [
        { name: 'langsamer DL', percentage: '70-75%', range: this.calculateRange(0.7, 0.75)},
        { name: 'ruhiger DL', percentage: '75-80%', range: this.calculateRange(0.75, 0.8) },
        { name: 'lockerer DL', percentage: '80-85%', range: this.calculateRange(0.8, 0.85) },
        { name: 'zügiger DL', percentage: '85-90%', range: this.calculateRange(0.85, 0.9) },
      ];
    } else {
      // Setze die Werte auf null, wenn keine Eingabe erfolgt
      this.zones.forEach((zone) => (zone.range = null));
    }
  }

  private calculateRange(minFactor: number, maxFactor: number): string {
    const min = Math.round(this.hfMax * minFactor);
    const max = Math.round(this.hfMax * maxFactor);
    return `${min} - ${max}`;
  }
}
