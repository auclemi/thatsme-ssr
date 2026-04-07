import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { OfflineBannerComponent } from './components/offline-banner/offline-banner.component';
import { routeTransitionAnimations } from './app.animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, OfflineBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeTransitionAnimations]
})
export class AppComponent {
  title = 'test-ssr';

  @ViewChild(RouterOutlet) outlet!: RouterOutlet;

  getRouteAnimationData() {
    return this.outlet?.activatedRouteData?.['animation'];
  }
}
