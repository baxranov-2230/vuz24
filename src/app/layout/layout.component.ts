import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { LangDto } from '../dto/langDto';
import { Location } from '@angular/common';
import { NewsTypeDto } from '../dto/newsTypeDto';
import { Router } from '@angular/router';
import { LocalStorageSecurity } from '../util/localStorageSecurity';
import { CommonKey } from '../util/commonKey';
import { ProfileDto } from '../dto/profileDto';
import { NewsType } from '../util/newsType';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [NewsService, NewsType]
})
export class LayoutComponent implements OnInit {

  public langs: Array<LangDto>;
  public newsTypes: Array<NewsTypeDto>;
  public isLoggedIn: Boolean = false;
  public user: ProfileDto;

  constructor(private newsTypeService: NewsType, private newsService: NewsService, private location: Location, private router: Router) {
    this.langs = [];
  }

  ngOnInit() {
    this.getLanguages();
    this.getNewsTypeList();
    this.getLang();

    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      this.isLoggedIn = true;
      this.user = new ProfileDto();
      this.user.firstName = LocalStorageSecurity.getItem(CommonKey.NAME);
      this.user.lastName = LocalStorageSecurity.getItem(CommonKey.SURNAME);
    }

    var flag = this;
    window.onscroll = (function() {
      if(document.getElementById('wrap').offsetHeight <= window.pageYOffset
                                                       + window.innerHeight) {
      }
    });
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
      },
      error => console.log(error)
    );
  }

  public goToTop(str: String) {
    if (str === "basic") {
      document.querySelector(".nav-link:first-child").classList.add("active-menu");
      this.router.navigate([LocalStorageSecurity.getItem(CommonKey.LANGUAGE)]);
    } else {
      document.querySelector(".nav-link:first-child").classList.remove("active-menu");
    }
    window.scrollTo(0, 0);
  }

  public saveLang(str: string) {
    LocalStorageSecurity.setItem(CommonKey.LANGUAGE, str);
    if (document.querySelector(".active") !== null) {
      document.querySelector(".active").classList.remove("active");
    }
    document.getElementById(str).classList.add("active");
    this.router.navigate(["/" + str + this.router.url.substring(4)]);
  }

  private getLang() {
    setTimeout(() => {
      if (LocalStorageSecurity.hasItem(CommonKey.LANGUAGE) && document.getElementById(LocalStorageSecurity.getItem(CommonKey.LANGUAGE)) !== null && !document.getElementById(LocalStorageSecurity.getItem(CommonKey.LANGUAGE)).classList.contains("active")) {
        if (document.querySelector(".active") !== null) {
          document.querySelector(".active").classList.remove("active");
        }
        document.getElementById(LocalStorageSecurity.getItem(CommonKey.LANGUAGE)).classList.add("active");
        this.router.navigate(["/" + LocalStorageSecurity.getItem(CommonKey.LANGUAGE) + this.router.url.substring(4)]);
      } else {
        this.getLang();
      }
      setTimeout(() => {
        if(document.querySelector(".nav-link.active-menu") === null) {
          document.querySelector(".nav-link:first-child").classList.add("active-menu");
        }
      }, 200);
    }, 300);
  }

  public checkWeatherEntered(isEntered: Boolean) {
    this.user = new ProfileDto();
    this.user.firstName = LocalStorageSecurity.getItem(CommonKey.NAME);
    this.user.lastName = LocalStorageSecurity.getItem(CommonKey.SURNAME);
    this.isLoggedIn = isEntered;
  }

  public showDropdown() {
    document.getElementById("profileddMenu").classList.toggle("show");
  }

  public logOut() {
    var lang = LocalStorageSecurity.getItem(CommonKey.LANGUAGE);
    localStorage.clear();
    LocalStorageSecurity.setItem(CommonKey.LANGUAGE, lang);
    this.isLoggedIn = false;
  }
}