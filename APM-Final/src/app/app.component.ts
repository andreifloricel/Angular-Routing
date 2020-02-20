import { Component } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  RouterEvent,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  ChildActivationStart,
  ChildActivationEnd,
  ActivationEnd,
  ActivationStart
} from '@angular/router';

import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'msg Product Management';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    router.events
      .pipe(
        map(event => {
          const isRouterEvent = event instanceof RouterEvent;
          const isRouteConfigEvent =
            event instanceof RouteConfigLoadStart || event instanceof RouteConfigLoadEnd;
          const isActivationEvent =
            event instanceof ActivationStart || event instanceof ActivationEnd;
          const isChildActivationEvent =
            event instanceof ChildActivationStart || event instanceof ChildActivationEnd;

          return {
            event,
            isRouterEvent,
            isRouteConfigEvent,
            isActivationEvent,
            isChildActivationEvent
          };
        }),
        filter(eventInfo => {
          return true;
        })
      )
      .subscribe(eventInfo => {
        this.logEvent(eventInfo, true);
        this.checkRouterEvent(eventInfo.event);
      });
  }

  logEvent(
    {
      event,
      isRouterEvent,
      isRouteConfigEvent,
      isActivationEvent,
      isChildActivationEvent
    }: {
      event: Event;
      isRouterEvent;
      isRouteConfigEvent;
      isActivationEvent;
      isChildActivationEvent;
    },
    verbose: boolean
  ) {
    const eventColor = this.getConsoleColor(
      event,
      isRouterEvent,
      isRouteConfigEvent,
      isActivationEvent,
      isChildActivationEvent
    );


    false &&  console.log(`%c${event}`, `color:${eventColor}`);

  }

  private getConsoleColor(
    event: Event,
    isRouterEvent: any,
    isRouteConfigEvent: any,
    isActivationEvent: any,
    isChildActivationEvent: any
  ) {
    return isRouterEvent
      ? 'blue'
      : isRouteConfigEvent
      ? 'cyan'
      : isActivationEvent
      ? 'green'
      : isChildActivationEvent
      ? 'purple'
      : 'black';
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }

  displayMessages(): void {
    // Example of primary and secondary routing together
    // this.router.navigate(['/login', {outlets: { popup: ['messages']}}]); // Does not work
    // this.router.navigate([{outlets: { primary: ['login'], popup: ['messages']}}]); // Works
    this.router.navigate([{ outlets: { popup: ['messages'] } }]); // Works
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }
}
