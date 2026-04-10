import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkService } from './network.service';


@Component({
  selector: 'app-offline-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offline-banner.component.html',
  styles: [`
    .offline-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #ffcc00;
      color: #000;
      padding: 6px;
      text-align: center;
      font-weight: 600;
      z-index: 9999;
    }
  `]
})
export class OfflineBannerComponent {
  network = inject(NetworkService);
}
