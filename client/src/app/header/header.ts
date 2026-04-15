import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { SkiplinkService } from '../services/skiplink.service';



@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
})

export class Header {
  curPage = '';
  constructor(
    private router: Router,
    private skiplinkService: SkiplinkService
  ) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        // console.log('Route changée :', event.urlAfterRedirects);
        this.curPage = event.urlAfterRedirects;
      });
  }

  /**
   * jumps to main-content anchor and focus on it
   * @param $event
   */
  public doSkipLink(event: Event) {
    event.preventDefault();
    this.skiplinkService.gotoMainContent();
  }
}
