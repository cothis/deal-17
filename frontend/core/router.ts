import { RouteInfo } from '../../types';
import View from './view';

const EVENT_NAME = 'route';

export class RouterEvent {
  constructor() {
    this.anchorToRouterEvent();
  }

  private anchorToRouterEvent() {
    document.body.addEventListener('click', (e) => {
      if (e.target instanceof HTMLElement) {
        const target = e.target.closest('a');
        if (!target) return;

        e.stopImmediatePropagation();
        e.preventDefault();
        RouterEvent.dispatchEvent(target.getAttribute('href'));
      }
    });
  }

  static dispatchEvent(pathname: string | null = '', isReplace: boolean = false) {
    if (pathname === null) {
      throw new Error('pathname이 null입니다. href 속성을 확인해보세요.');
    }

    document.body.dispatchEvent(
      new CustomEvent(EVENT_NAME, {
        detail: { pathname, isReplace },
      })
    );
  }
}

export class Router {
  private routeTable: Map<string, View>;
  private defaultRoute: View | null;

  constructor() {
    this.routeTable = new Map();
    this.defaultRoute = null;

    new RouterEvent();
    this.registerRouteEvent();
    this.registerPopstateEvent();
  }

  private registerRouteEvent() {
    window.addEventListener(EVENT_NAME, (e) => {
      const pathname: string = (<CustomEvent>e).detail.pathname;
      const isReplace: boolean = (<CustomEvent>e).detail.isReplace ?? false;
      if (this.isMethod(pathname)) {
        this.callMethod(pathname);
        return;
      }

      this.route(pathname, isReplace);
    });
  }

  private isMethod(pathname: string) {
    return pathname.startsWith('@');
  }

  private callMethod(pathname: string) {
    switch (pathname.substr(1)) {
      case 'back':
        history.back();
        break;
    }
  }

  private registerPopstateEvent() {
    window.addEventListener('popstate', (e) => {
      this.route(location.pathname);
    });
  }

  private routeDefault() {
    if (this.defaultRoute) {
      this.defaultRoute.render();
    } else {
      throw new Error('Default page가 없습니다');
    }
  }

  route(path: string, isReplace?: boolean) {
    if (path === '/' || path === '') {
      this.routeDefault();
      return;
    }

    const page = this.routeTable.get(path);
    if (page) page.render();
    else throw new Error('해당 경로에 매칭되는 View Element가 없습니다.');
  }

  setDefaultPage(page: View): void {
    this.defaultRoute = page;
  }

  addRoutePath(path: string, page: View): void {
    this.routeTable.set(path, page);
  }
}
