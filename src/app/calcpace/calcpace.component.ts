import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calcpace',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calcpace.component.html',
  styleUrls: ['./calcpace.component.css'],
})
export class CalcpaceComponent {
  distance: number | null = null; // Eingabe für Distanz (in km)
  time: string = ''; // Eingabe für Zeit (im Format HH:MM:SS)
  pace: string = ''; // Eingabe für Pace (im Format MM:SS)

  calculate(): void {
    if (this.distance && this.time) {
      // Berechne Pace, wenn Distanz und Zeit vorhanden sind
      const totalSeconds = this.timeToSeconds(this.time);
      const paceSeconds = totalSeconds / this.distance;
      this.pace = this.secondsToTime(paceSeconds, this.isTimeInHHMMSS(this.time));
    } else if (this.distance && this.pace) {
      // Berechne Zeit, wenn Distanz und Pace vorhanden sind
      const paceSeconds = this.timeToSeconds(this.pace, false);
      const totalSeconds = paceSeconds * this.distance;
      this.time = this.secondsToTime(totalSeconds, true);
    } else if (this.time && this.pace) {
      // Berechne Distanz, wenn Zeit und Pace vorhanden sind
      const totalSeconds = this.timeToSeconds(this.time, true);
      const paceSeconds = this.timeToSeconds(this.pace, false);
      this.distance = totalSeconds / paceSeconds;
    }
  }
  
  private isTimeInHHMMSS(time: string): boolean {
    // Prüfen, ob die Zeit im Format HH:MM:SS vorliegt
    return time.split(':').length === 3;
  }
  
  private timeToSeconds(time: string, includeHours: boolean = false): number {
    const parts = time.split(':').map((part) => parseInt(part, 10));
    if (includeHours) {
      // Zeit im Format HH:MM:SS
      const [hours = 0, minutes = 0, seconds = 0] = parts;
      return hours * 3600 + minutes * 60 + seconds;
    } else {
      // Zeit im Format MM:SS
      const [minutes = 0, seconds = 0] = parts;
      return minutes * 60 + seconds;
    }
  }
  
  private secondsToTime(seconds: number, includeHours: boolean): string {
    if (includeHours) {
      // Zeit im Format HH:MM:SS
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = Math.round(seconds % 60);
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`;
    } else {
      // Zeit im Format MM:SS
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.round(seconds % 60);
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  }  

  reset(): void {
    // Setze alle Eingabefelder zurück
    this.distance = null;
    this.time = '';
    this.pace = '';
  }
}
