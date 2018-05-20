import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GeneralURL } from '../util/generalUrl';
import { LocalStorageSecurity } from '../util/localStorageSecurity';
import { CommonKey } from '../util/commonKey';
import { CountDto } from '../dto/countDto';
import { LangDto } from '../dto/langDto';
import { NewsDto } from '../dto/newsDto';
import { NewsTypeDto } from '../dto/newsTypeDto';

@Injectable()
export class NewsService {

  constructor(private http: HttpClient) { }

  public getLanguages() {
    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };

    return this.http.get<Array<LangDto>>(GeneralURL.langURL.concat('all'), options);
  }

  public getNewsTypeList(lang: string) {
    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };

    return this.http.get<Array<NewsTypeDto>>(GeneralURL.newsTypeURL.concat("all/" + lang), options);
  }

  public createNews(news: NewsDto) {
    let json = JSON.stringify(news);

    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.post<CountDto>(GeneralURL.newsActURL.concat('create'), json, options);
  }

  public addNewsTranslation(news: NewsDto) {
    let json = JSON.stringify(news);

    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.post<CountDto>(GeneralURL.newsActURL.concat('create_trans'), json, options);
  }

  public getNotPublishedNewsList(count: CountDto) {
    let json = JSON.stringify(count);

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    };

    return this.http.post<Array<NewsDto>>(GeneralURL.newsActURL.concat('n_pub_list'), json, options);
  }

  public publishNews(id: number) {
    let options = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    };

    return this.http.get<CountDto>(GeneralURL.newsActURL.concat('publish/' + id), options);
  }
}