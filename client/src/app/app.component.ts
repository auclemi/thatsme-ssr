import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { OfflineBannerComponent } from './components/offline-banner/offline-banner.component';
import { routeTransitionAnimations } from './app.animations';
import { UtilityService } from './services/utility.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, OfflineBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeTransitionAnimations]
})
export class AppComponent {
  title = 'That\'s Me !';
  private firstNavigation = true;
  @ViewChild(RouterOutlet) outlet!: RouterOutlet;
  constructor(
    private router: Router,
    private utilityService: UtilityService
  ) { }
  ngOnInit() {
    if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.src = '/assets/stats.js';
    script.defer = true;
    document.body.appendChild(script);
  }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // avoid focus after page load (goal is not to display the not nice frame)
        if (!this.firstNavigation) {
          // console.log('Route changée :', event.urlAfterRedirects, event);
          this.utilityService.gotoMainContent();
        }
        this.firstNavigation = false;
      }
    });
  }
  getRouteAnimationData() {
    return this.outlet?.activatedRouteData?.['animation'];
  }

  goToTop(event: Event) {
    event.preventDefault();
    // console.log('Go to top clicked');
    this.utilityService.gotoMainContent();
  }
}
