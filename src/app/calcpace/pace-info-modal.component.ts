import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pace-info-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" (click)="close()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>Vorhersage Laufzeiten</h3>
          <button class="close-button" (click)="close()">×</button>
        </div>
        <div class="modal-body">
          <table>
            <thead>
              <tr>
                <th>Distanz</th>
                <th>Zeit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5K</td>
                <td>{{ calculateTime(5) }}</td>
              </tr>
              <tr>
                <td>10K</td>
                <td>{{ calculateTime(10) }}</td>
              </tr>
              <tr>
                <td>Halbmarathon</td>
                <td>{{ calculateTime(21.0975) }}</td>
              </tr>
              <tr>
                <td>Marathon</td>
                <td>{{ calculateTime(42.195) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      min-width: 300px;
      max-width: 90%;
      max-height: 90%;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 0 5px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f8f9fa;
    }
  `]
})
export class PaceInfoModalComponent {
  @Input() paceInSeconds: number = 0;

  close() {
    // This will be implemented in the parent component
  }

  calculateTime(distance: number): string {
    const totalSeconds = this.paceInSeconds * distance;
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }
} 