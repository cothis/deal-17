import { RouteInfo } from '../../types';
import View from './view';
import Store from './store';

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
  private history: string[];
  private routeTable: Map<string, View>;
  private defaultRoute: View | null;
  private store: Store;

  constructor(store: Store) {
    this.routeTable = new Map();
    this.history = [];
    this.defaultRoute = null;
    this.store = store;

    new RouterEvent();
    this.registerRouteEvent();
    this.registerPopstateEvent();
  }

  private registerRouteEvent() {
    document.body.addEventListener(EVENT_NAME, (e) => {
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
      const lastpath = this.history.pop();
      if (lastpath) {
        const newPath = this.history.length > 0 ? this.history[this.history.length - 1] : '/';
        history.replaceState({}, 'view', newPath);
        this.routeTable.get(lastpath)?.remove();
      }
    });
  }

  private routeDefault() {
    if (this.defaultRoute) {
      history.replaceState({}, 'home', '/');
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

    const lastSlashIndex = path.lastIndexOf('/');
    let url = path;
    let remainUrl = '';
    if (lastSlashIndex > 0) {
      url = path.substr(0, lastSlashIndex);
      remainUrl = path.substr(lastSlashIndex);
    }

    console.log(url, remainUrl);

    const page = this.routeTable.get(url);
    if (page) {
      if (isReplace) {
        history.replaceState({}, 'view', url);
      } else history.pushState({}, 'view', url);
      page.render(remainUrl);
      this.history.push(url);
    } else throw new Error('해당 경로에 매칭되는 View Element가 없습니다.');
  }

  setDefaultPage(page: View): void {
    this.defaultRoute = page;
  }

  addRoutePath(path: string, page: View): void {
    this.routeTable.set(path, page);
  }
}
