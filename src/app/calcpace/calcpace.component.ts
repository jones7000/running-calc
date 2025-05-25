import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaceInfoModalComponent } from './pace-info-modal.component';

@Component({
  selector: 'app-calcpace',
  standalone: true,
  imports: [CommonModule, FormsModule, PaceInfoModalComponent],
  templateUrl: './calcpace.component.html',
  styleUrls: ['./calcpace.component.css'],
})
export class CalcpaceComponent {
  distance: number | null = null; // Eingabe für Distanz (in km)
  time: string = ''; // Eingabe für Zeit (im Format HH:MM:SS)
  pace: string = ''; // Eingabe für Pace (im Format MM:SS)
  showPaceInfo: boolean = false;

  timeError: string | null = null;
  paceError: string | null = null;

  formatTimeInput(event: any): void {
    // Remove any non-digit characters from input
    let value = event.target.value.replace(/\D/g, '');
    
    // Strictly limit to 6 digits (HHMMSS)
    if (value.length > 6) {
      value = value.slice(0, 6);
    }
    
    // Format based on length
    if (value.length >= 4) {
      // Format as HH:MM:SS
      const hours = value.slice(0, 2);
      const minutes = value.slice(2, 4);
      const seconds = value.slice(4);
      this.time = `${hours}:${minutes}${seconds.length ? ':' + seconds : ''}`;
    } else if (value.length >= 2) {
      // Format as MM:SS
      const minutes = value.slice(0, 2);
      const seconds = value.slice(2);
      this.time = `${minutes}${seconds.length ? ':' + seconds : ''}`;
    } else {
      this.time = value;
    }
    
    this.validateTime();
  }

  formatPaceInput(event: any): void {
    // Remove any non-digit characters from input
    let value = event.target.value.replace(/\D/g, '');
    
    // Strictly limit to 4 digits (MMSS)
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    
    // Format as MM:SS
    if (value.length >= 2) {
      const minutes = value.slice(0, 2);
      const seconds = value.slice(2);
      this.pace = `${minutes}${seconds.length ? ':' + seconds : ''}`;
    } else {
      this.pace = value;
    }
    
    this.validatePace();
  }

  calculate(): void {
    if (this.distance && this.time) {
      // Berechne Pace, wenn Distanz und Zeit vorhanden sind
      const totalSeconds = this.timeToSeconds(this.time, this.isTimeInHHMMSS(this.time));
      const paceSeconds = totalSeconds / this.distance;
      this.pace = this.secondsToTime(paceSeconds, false); // Always format pace as MM:SS
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
    this.timeError = null;
    this.paceError = null;
  }

  validatePace(): void {
    const paceRegex = /^\d{2}:\d{2}$/;
    if (this.pace && !paceRegex.test(this.pace)) {
      this.paceError = 'Pace muss im Format MM:SS sein';
    } else {
      this.paceError = null;
    }
  }

  validateTime(): void {
    const timeRegex = /^(\d{2}:\d{2}:\d{2}|\d{2}:\d{2})$/;
    if (this.time && !timeRegex.test(this.time)) {
      this.timeError = 'Zeit muss im Format HH:MM:SS oder MM:SS sein';
    } else {
      this.timeError = null;
    }
  }

  isFormValid(): boolean {
    const timeValid = !this.timeError && this.time.trim() !== '';
    const paceValid = !this.paceError && this.pace.trim() !== '';

    return timeValid || paceValid;
  }

  togglePaceInfo() {
    if (this.pace && !this.paceError) {
      this.showPaceInfo = !this.showPaceInfo;
    }
  }

  getPaceInSeconds(): number {
    if (!this.pace) return 0;
    return this.timeToSeconds(this.pace, false);
  }

  closePaceInfo() {
    this.showPaceInfo = false;
  }
}
