import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
import { CommonKey } from '../util/commonKey';
import { LocalStorageSecurity } from '../util/localStorageSecurity';

@Injectable()
export class LangGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    console.log(location.pathname.split('/'));
    
    // if (LocalStorageSecurity.hasItem(CommonKey.LANGUAGE)) {
    //   this.router.navigate([LocalStorageSecurity.getItem(CommonKey.LANGUAGE)]);
    //   return true;
    // }

    // this.router.navigate(["uzl"]);
    return true;
  }
}