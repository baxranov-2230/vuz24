import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router, CanActivate, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
import { CommonKey } from '../util/commonKey';
import { LocalStorageSecurity } from '../util/localStorageSecurity';
import { LangDto } from '../dto/langDto';
import { GeneralURL } from '../util/generalUrl';

@Injectable()
export class LangGuard implements CanActivate {

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private http: HttpClient
    ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkLanguages();
  }

  private checkLanguages() {
    let hasTrueLang: boolean = false;

    try {
      this.getLanguages().subscribe(
        (data) => {
          for(let lang of data) {
            if (lang.name === window.location.pathname.split("/")[1]) {
              hasTrueLang = true;
            }
          }
        },
        error => console.log(error)
      );
    } catch (error) {
      hasTrueLang = false;
    }

    if (!hasTrueLang && window.location.pathname.split("/").length === 2 &&
                            window.location.pathname.split("/")[1] === "") {
      this.router.navigate(['uzl']);
      console.log(window.location.pathname.split("/"));
      hasTrueLang = true;
    }
    return hasTrueLang;
  }

  private getLanguages() {
    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };

    return this.http.get<Array<LangDto>>(GeneralURL.langURL.concat('all'), options);
  }
}