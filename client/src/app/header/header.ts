import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilityService } from '../services/utility.service';



@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
})

export class Header {
  constructor(
    public utilityService: UtilityService
  ) {}

  /**
   * jumps to main-content anchor and focus on it
   * @param $event
   */
  public doSkipLink(event: Event) {
    event.preventDefault();
    this.utilityService.gotoMainContent();
  }
}
