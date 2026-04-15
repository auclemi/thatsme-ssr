import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { OfflineBannerComponent } from './components/offline-banner/offline-banner.component';
import { routeTransitionAnimations } from './app.animations';
import { SkiplinkService } from './services/skiplink.service';

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
    private skiplinkService: SkiplinkService
  ) { }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // avoid focus after page load (goal is not to display the not nice frame)
        if (!this.firstNavigation) {
          // console.log('Route changée :', event.urlAfterRedirects, event);
          this.skiplinkService.gotoMainContent();
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
    this.skiplinkService.gotoMainContent();
  }
}
