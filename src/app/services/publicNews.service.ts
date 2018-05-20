import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GeneralURL } from '../util/generalUrl';
import { LocalStorageSecurity } from '../util/localStorageSecurity';
import { CommonKey } from '../util/commonKey';
import { CountDto } from '../dto/countDto';

@Injectable()
export class PublicNewsService {

  constructor(private http: HttpClient) { }

  public getNews(id: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(GeneralURL.newsPublic.concat("get_no/" + id), options);
  }

  public getNewsWithToken(id: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    };

    return this.http.get(GeneralURL.newsPublic.concat("get_token/" + id), options);
  }

  public getAllNewsList(count: CountDto) {
    let json = JSON.stringify(count);

    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.post(GeneralURL.newsPublic.concat("most_type_with/" + count.lang.key), json, options);
  }
}