import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeneralURL} from '../util/generalUrl';
import {LangDto} from '../dto/langDto';

@Injectable()
export class NewsLangService {

  constructor(private http: HttpClient) {

  }

  public getLanguages(): Observable<Array<LangDto>> {
    return this.http.get<Array<LangDto>>(GeneralURL.langURL.concat('all'), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
