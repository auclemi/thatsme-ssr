import { Component } from '@angular/core';
import { MaterialFullModule } from '../../shared/material/material-module';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.html',
  imports: [MaterialFullModule],
})
export class LoaderComponent {}
