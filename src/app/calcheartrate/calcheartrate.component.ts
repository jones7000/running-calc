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
  hfMax: number | null = null;
  method: string = 'zones';
  zones: { name: string; percentage: string; range: string | null }[] = [];

  // Standardzonen für "Runners World"
  private runnersWorldZones = [
    { name: 'langsamer DL', percentage: '70 - 75%', minFactor: 0.7, maxFactor: 0.75 },
    { name: 'ruhiger DL', percentage: '75 - 80%', minFactor: 0.75, maxFactor: 0.8 },
    { name: 'lockerer DL', percentage: '80 - 85%', minFactor: 0.8, maxFactor: 0.85 },
    { name: 'zügiger DL', percentage: '85 - 90%', minFactor: 0.85, maxFactor: 0.9 },
  ];

  // Standardzonen für "Zones"
  private zoneBasedZones = [
    { name: 'Zone 1', percentage: '50 - 60%', minFactor: 0.5, maxFactor: 0.6 },
    { name: 'Zone 2 (GA1)', percentage: '60 - 70%', minFactor: 0.6, maxFactor: 0.7 },
    { name: 'Zone 3 (GA2)', percentage: '70 - 80%', minFactor: 0.7, maxFactor: 0.8 },
    { name: 'Zone 4', percentage: '80 - 90%', minFactor: 0.8, maxFactor: 0.9 },
    { name: 'Zone 5', percentage: '90 - 100%', minFactor: 0.9, maxFactor: 1.0 },
  ];

  constructor() {
    this.calculateZones(); // Tabelle wird beim Initialisieren der Komponente berechnet
  }

  calculateZones(): void {
    if (!this.hfMax || this.hfMax <= 0) {
      // Setze die Werte auf null, wenn keine gültige Eingabe erfolgt
      this.zones = this.getCurrentZones().map(zone => ({
        name: zone.name,
        percentage: zone.percentage,
        range: null,
      }));
      return;
    }

    // Berechnung basierend auf der ausgewählten Methode
    const currentZones = this.getCurrentZones();
    this.zones = currentZones.map(zone => ({
      name: zone.name,
      percentage: zone.percentage,
      range: this.calculateRange(zone.minFactor, zone.maxFactor),
    }));
  }

  private calculateRange(minFactor: number, maxFactor: number): string {
    const min = Math.round(this.hfMax! * minFactor);
    const max = Math.round(this.hfMax! * maxFactor);
    return `${min} - ${max}`;
  }

  private getCurrentZones() {
    return this.method === 'zones' ? this.zoneBasedZones : this.runnersWorldZones;
  }

  onMethodChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.method = target.value; // Methode aktualisieren
      this.calculateZones(); // Tabelle neu berechnen
    }
  }
  
}