import { RouteInfo } from '../../types';
import View from './view';

export default class Router {
  private routeTable: RouteInfo[];
  private defaultRoute: RouteInfo | null;

  constructor() {
    // window.onpopstate = () => {
      // console.log('onpopstate')
      // this.route.bind(this)
    // };
    window.addEventListener('hashchange', this.route.bind(this));

    this.routeTable = [];
    this.defaultRoute = null;
  }

  route() {
    const routePath = location.pathname;
    // const routePath = location.hash.substr(1);
    if (routePath === '/' && this.defaultRoute) {
      this.defaultRoute.page.render();
    }

    const target = this.routeTable.find((routeInfo) => routePath.indexOf(routeInfo.path) >= 0);

    if (target) {
      target.page.render();
    }
  }

  setDefaultPage(page: View): void {
    this.defaultRoute = { path: '', page };
  }

  addRoutePath(path: string, page: View): void {
    this.routeTable.push({ path, page });

  }
}
