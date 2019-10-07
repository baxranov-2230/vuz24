import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeneralURL} from '../../../util/generalUrl';
import {CommonKey} from '../../../util/commonKey';
import {PageFilterDTO} from '../../../dto/pageFilterDTO';
import {LocalStorageSecurity} from '../../../util/localStorageSecurity';
import {AdmNewsTreeListDTO} from './dto/admNewsTreeListDTO';
import {ServerResponceDTO} from '../../../dto/serverResponceDTO';
import {catchError} from 'rxjs/internal/operators';
import {AttendService} from '../../../services/attend.service';

@Injectable()
export class AdminNewsListService {

  constructor(private http: HttpClient, private attendService: AttendService) {

  }

  public getNewsList(filer: PageFilterDTO): Observable<AdmNewsTreeListDTO> {
    const json = JSON.stringify(filer);

    return this.http.post<AdmNewsTreeListDTO>(GeneralURL.newsActURL.concat('detail_tree'), json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('getNewsList', new AdmNewsTreeListDTO()))
    );
  }

  public deleteNews(id: string): Observable<ServerResponceDTO> {

    return this.http.delete<ServerResponceDTO>(GeneralURL.newsActURL.concat('delete_news_lang/', id), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('deleteNews', new ServerResponceDTO()))
    );
  }

  public desableNews(id: string, json: string): Observable<ServerResponceDTO> {

    return this.http.post<ServerResponceDTO>(GeneralURL.newsActURL.concat('disable/', id), json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('desableNews', new ServerResponceDTO()))
    );
  }
}
