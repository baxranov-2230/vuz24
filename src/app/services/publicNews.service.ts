import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GeneralURL } from '../util/generalUrl';
import { LocalStorageSecurity } from '../util/localStorageSecurity';
import { CommonKey } from '../util/commonKey';
import { CountDto } from '../dto/countDto';
import { NewsDto } from '../dto/newsDto';

@Injectable()
export class PublicNewsService {

  constructor(private http: HttpClient) { }

  public getNews(id: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<NewsDto>(GeneralURL.newsPublic.concat("get_no/" + id), options);
  }

  public getNewsWithToken(id: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    };

    return this.http.get<NewsDto>(GeneralURL.newsPublic.concat("get_token/" + id), options);
  }

  public getRecentNewsList(count: CountDto) {
    let json = JSON.stringify(count);

    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };

    return this.http.post<Array<NewsDto>>(GeneralURL.newsPublic.concat("resent_no/" + count.lang), json, options);
  }

  public getRecentNewsListWithToken(count: CountDto) {
    let json = JSON.stringify(count);

    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.post<Array<NewsDto>>(GeneralURL.newsPublic.concat("resent_with/" + count.lang), json, options);
  }

  public getMostReadNewsList(count: CountDto) {
    let json = JSON.stringify(count);

    let options = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        })
    };

    return this.http.post<Array<NewsDto>>(GeneralURL.newsPublic.concat("most_no/" + count.lang), json, options);
  }

  public getMostReadNewsListWithToken(count: CountDto) {
    let json = JSON.stringify(count);

    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.post<Array<NewsDto>>(GeneralURL.newsPublic.concat("most_with/" + count.lang), json, options);
  }

  public getNewsListByType(count: CountDto) {
    let json = JSON.stringify(count);

    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };

    return this.http.post<Array<NewsDto>>(GeneralURL.newsPublic.concat("type_no/" + count.lang), json, options);
  }

  public getNewsListByTypeWithToken(count: CountDto) {
    let json = JSON.stringify(count);

    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.post<Array<NewsDto>>(GeneralURL.newsPublic.concat("type_with/" + count.lang), json, options);
  }

  public getMostReadNewsListByType(count: CountDto) {
    let json = JSON.stringify(count);

    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };

    return this.http.post<Array<NewsDto>>(GeneralURL.newsPublic.concat("most_type_no/" + count.lang), json, options);
  }

  public getMostReadNewsListByTypeWithToken(count: CountDto) {
    let json = JSON.stringify(count);

    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.post<Array<NewsDto>>(GeneralURL.newsPublic.concat("most_type_with/" + count.lang), json, options);
  }

  public getImportantNewsList(lang: string) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<Array<NewsDto>>(GeneralURL.newsPublic.concat("important/" + lang), options);
  }
}