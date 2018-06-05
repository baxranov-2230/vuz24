import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { CommonKey } from '../util/commonKey';
import { LocalStorageSecurity } from '../util/localStorageSecurity';

@Injectable()
export class LangGuard implements CanActivate {
  
  constructor(private router: Router) { }

  canActivate() : boolean {
    if (LocalStorageSecurity.hasItem(CommonKey.LANGUAGE) && document.getElementById(LocalStorageSecurity.getItem(CommonKey.LANGUAGE)) !== null && !document.getElementById(LocalStorageSecurity.getItem(CommonKey.LANGUAGE)).classList.contains("active")) {
      if (document.querySelector(".active") !== null) {
        document.querySelector(".active").classList.remove("active");
      }
      document.getElementById(LocalStorageSecurity.getItem(CommonKey.LANGUAGE)).classList.add("active");
      this.router.navigate(["/" + LocalStorageSecurity.getItem(CommonKey.LANGUAGE) + this.router.url.substring(4)]);
    } else {
      // this.getLang();
    }
    setTimeout(() => {
      if(document.querySelector(".nav-link.active-menu") === null) {
        document.querySelector(".nav-link:first-child").classList.add("active-menu");
      }
    }, 200);
    return true;
  }
}