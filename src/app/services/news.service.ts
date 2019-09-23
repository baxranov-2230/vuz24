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

  public getNewsWithToken(count: CountDto) {
    let json = JSON.stringify(count);

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    };

    return this.http.post<NewsDto>(GeneralURL.newsPublic.concat("get_by_parent_with/" + count.lang), json, options);
  }

  public getNewsWithTokenNew(count: CountDto) {
    let json = JSON.stringify(count);

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    };

    return this.http.post<NewsDto>(GeneralURL.newsActURL.concat("get_by_parent/" + count.lang), json, options);
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

  public deleteNews(id: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    };

    return this.http.delete<CountDto>(GeneralURL.newsActURL.concat('delete_news_lang/' + id), options);
  }

  public disableNews(disableDTO: CountDto) {
    let json = JSON.stringify(disableDTO);

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    };

    return this.http.post<CountDto>(GeneralURL.newsActURL.concat('disable/' + disableDTO.newsId), json, options);
  }

  public getNewsLangTree(count: CountDto) {
    let json = JSON.stringify(count);

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    };

    return this.http.post<Array<NewsDto>>(GeneralURL.newsActURL.concat('lang_tree'), json, options);
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