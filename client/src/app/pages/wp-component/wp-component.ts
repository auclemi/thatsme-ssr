import { Component, signal, effect, computed, inject } from '@angular/core';
import { WpService } from '../../services/wpService';
import { LoaderComponent } from "../../components/loader/loader.component";
import { ErrorComponent } from "../../components/error/error.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';


@Component({
  selector: 'app-site-creation',
  imports: [LoaderComponent, ErrorComponent],
  templateUrl: './wp-component.html',
  styleUrl: './wp-component.scss',
  standalone: true,
})
export class WpComponent {

  public slug: string
  public page;
  public loading;
  public error;

  constructor(
    private router: Router,
    private wp: WpService
  ) {
    this.slug = this.getSlug(this.router.url);
    this.page = toSignal(this.wp.page$, { initialValue: null });
    this.loading = toSignal(this.wp.loading$, { initialValue: false });
    this.error = toSignal(this.wp.error$, { initialValue: null });
  }
  ngOnInit() {
    this.wp.loadBySlug(this.slug)
  }

  getSlug(routerUrl: string) {
    switch (routerUrl) {
      case '/developpement-front-end-angular':
        return 'developpement-front-end-angular'
        break;
      case '/site-creation':
        return 'creation-sites-internet'
        break;
      case '/audit-accessibility':
        return 'audit-accessibilite'
        break;
      case '/mise-en-conformite-accessibilite-wacg':
        return 'mise-en-conformite-accessibilite-wacg'
        break;
      case '/formation-action':
        return 'formation-action'
        break;
    }
    return 'unknown'
  }
}
