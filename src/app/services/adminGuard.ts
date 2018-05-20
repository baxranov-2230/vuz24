import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { CommonKey } from '../util/commonKey';
import { LocalStorageSecurity } from '../util/localStorageSecurity';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (LocalStorageSecurity.getItem(CommonKey.ROLE) === "admin") {
      return true;
    } else if(LocalStorageSecurity.getItem(CommonKey.ROLE)) {
      this.router.navigate(['403']);
      return true;
    }

    this.router.navigate(['log-in']);
    return true;
  }
}