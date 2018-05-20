import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { CommonKey } from '../util/commonKey';
import { LocalStorageSecurity } from '../util/localStorageSecurity';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private location: Location) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      return true;
    }

    this.router.navigate(['403']);
    return true;
  }
}