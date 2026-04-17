import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { UtilityService } from '../services/utility.service';
@Component({
  selector: 'app-footer',
 imports: [RouterModule, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  standalone: true,
})
export class Footer {
constructor(
  public utilityService: UtilityService
) {}
}
