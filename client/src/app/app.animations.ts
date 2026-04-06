import { trigger, transition, style, animate } from '@angular/animations';

export const routeTransitionAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ opacity: 0 }),
    animate('300ms ease-out', style({ opacity: 1 }))
  ])
]);
