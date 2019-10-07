import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeneralURL} from '../util/generalUrl';
import {NewsTypeDto} from '../dto/newsTypeDto';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class NewsTypeService {

  constructor(private http: HttpClient) {

  }

  public getNewsTypeList(lang: string): Observable<Array<NewsTypeDto>> {
    return this.http.get<Array<NewsTypeDto>>(GeneralURL.newsTypeURL.concat('all/' + lang), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
