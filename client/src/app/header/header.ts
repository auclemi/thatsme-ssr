import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
})

export class Header {
  curPage = '';
constructor(private router: Router) {
  this.router.events
  .pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd)
  )
  .subscribe(event => {
    console.log('Route changée :', event.urlAfterRedirects);
    this.curPage = event.urlAfterRedirects;
  });
}

}
