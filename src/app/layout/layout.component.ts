import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../services/news.service';
import { LangDto } from '../dto/langDto';
import { Location } from '@angular/common';
import { NewsTypeDto } from '../dto/newsTypeDto';
import { Router, NavigationEnd } from '@angular/router';
import { LocalStorageSecurity } from '../util/localStorageSecurity';
import { CommonKey } from '../util/commonKey';
import { ProfileDto } from '../dto/profileDto';
import { NewsType } from '../util/newsType';
import * as $ from 'jquery';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [NewsService, NewsType]
})
export class LayoutComponent implements OnInit, OnDestroy {

  public langs: Array<LangDto>;
  public newsTypes: Array<NewsTypeDto>;
  public isLoggedIn: Boolean = false;
  public user: ProfileDto;
  public defLang: string;
  public typeName: string;
  public navigationSubscription;
  public isUzl: boolean = false;
  public isUzk: boolean = false;
  public isRu: boolean = false;

  constructor(private newsTypeService: NewsType, private newsService: NewsService, private location: Location, private router: Router) {
    this.langs = [];
    this.newsTypes = [];
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        if (e.url.split("#").length > 1) {
          this.typeName = e.url.split("#")[1];
        } else if (e.url.split("/")[2] !== "topic") {
          this.typeName = null;
        }
      }
    });
  }

  ngOnInit() {

    if (location.pathname.split("/")[1] === 'uzl') {
      this.isUzl = true;
      this.isUzk = false;
      this.isRu = false;
    } else if (location.pathname.split("/")[1] === 'uzk') {
      this.isUzk = true;
      this.isUzl = false;
      this.isRu = false;
    } else if (location.pathname.split("/")[1] === 'ru') {
      this.isUzk = false;
      this.isUzl = false;
      this.isRu = true;
    }

    this.getLanguages();
    this.getNewsTypeList();
    this.getLang();

    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      this.isLoggedIn = true;
      this.user = new ProfileDto();
      this.user.firstName = LocalStorageSecurity.getItem(CommonKey.NAME);
      this.user.lastName = LocalStorageSecurity.getItem(CommonKey.SURNAME);
    }
    if (LocalStorageSecurity.hasItem(CommonKey.LANGUAGE)) {
      this.defLang = LocalStorageSecurity.getItem(CommonKey.LANGUAGE);
    } else {
      this.defLang = this.location.path().split('/')[1];
    }
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  onActivate(event) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera.
  }

  private getLanguages() {
    this.newsService.getLanguages().subscribe(
      (data) => {
        this.langs = data;
        this.langs.splice(2, 2);
      },
      error => console.log(error)
    );
  }

  private getNewsTypeList() {
    this.newsService.getNewsTypeList(this.location.path().split('/')[1]).subscribe(
      (data) => {
        this.newsTypes = data;
        this.newsTypeService.setNewsTypes(data);

        setTimeout(() => {
          for (let x of data) {
            $("#" + x.key).on('click', function() {
              if ($(window).width() < 992) {
                $("#toggButt").click();                
              }
            });
          }
        }, 1000);
      },
      error => console.log(error)
    );
  }

  public goToTop(str: string) {
    setTimeout(() => {
      if (str === "uzbekistan" && location.pathname.split("/")[2] !== "topic") {
        this.typeName = null;
        document.querySelector(".nav-link:first-child").classList.add("active-menu")
      } else if (location.pathname.split("/")[2] === "topic") {
        this.typeName = str;
        document.querySelector(".nav-link:first-child").classList.remove("active-menu")
      }
      
      // manashu settimeoutni ichi bez limit ishliyapti
      // document.body.scrollTop = 0; // For Safari
      // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, 1000);
  }

  public goToTop2() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.router.navigate(["/" + this.router.url.split('/')[1]]);
  }

  public saveLang(str: string) {
    LocalStorageSecurity.setItem(CommonKey.LANGUAGE, str);
    if (document.querySelector(".active") !== null) {
      document.querySelector(".active").classList.remove("active");
    }
    document.getElementById(str).classList.add("active");
    this.router.navigate(["/" + str + this.router.url.split('#')[0].substring(4)],  { preserveFragment: true });
  }

  private getLang() {
    setTimeout(() => {
      var smth = LocalStorageSecurity.getItem(CommonKey.LANGUAGE);
      if (smth && document.getElementById(smth) && !document.getElementById(smth).classList.contains("active")) {
        if (document.querySelector(".active") !== null) {
          document.querySelector(".active").classList.remove("active");
        }
        document.getElementById(smth).classList.add("active");
      } else {
        this.getLang();
      }
      if (this.router.url.split('/')[3]) {
        this.goToTop(this.router.url.split('/')[3]);
      }
    }, 100);
  }

  public checkWeatherEntered(isEntered: Boolean) {
    this.user = new ProfileDto();
    this.user.firstName = LocalStorageSecurity.getItem(CommonKey.NAME);
    this.user.lastName = LocalStorageSecurity.getItem(CommonKey.SURNAME);
    this.isLoggedIn = isEntered;
    this.refreshPage();
  }

  public showDropdown() {
    document.getElementById("profileddMenu").classList.toggle("show");
  }

  public removeDropdown() {
    // e.stopPropagation();
    document.getElementById("profileddMenu").classList.remove("show");
  }

  public logOut() {
    var lang = LocalStorageSecurity.getItem(CommonKey.LANGUAGE);
    localStorage.clear();
    LocalStorageSecurity.setItem(CommonKey.LANGUAGE, lang);
    this.isLoggedIn = false;
    if (location.pathname.split('/')[2] === 'my-profile') {
      this.router.navigate([location.pathname.split('/')[1]]);
    } else {
      this.refreshPage();
    }
  }

  private refreshPage() {
    this.router.navigate([this.router.url.split('#')[0]], { preserveFragment: true });
  }

  public opeenn() {
    setTimeout(() => {
      var baland;
      if (window.innerHeight > document.getElementById("modal-itself").offsetHeight) {
        baland = ((window.innerHeight - document.getElementById("modal-itself").offsetHeight) / 2) + "px";
        document.getElementById("modal-itself").style.marginTop = baland;
      }
    }, 200);
  }

  public greying() {
    document.body.classList.toggle("greying");
  }
}