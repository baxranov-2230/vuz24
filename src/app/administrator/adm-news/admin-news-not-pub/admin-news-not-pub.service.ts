import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LocalStorageSecurity} from '../../../util/localStorageSecurity';
import {CommonKey} from '../../../util/commonKey';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AttendService} from '../../../services/attend.service';
import {GeneralURL} from '../../../util/generalUrl';
import {catchError} from 'rxjs/internal/operators';
import {AdmNewsNotPubDTO} from './dto/admNewsNotPubDTO';
import {ServerResponceDTO} from "../../../dto/serverResponceDTO";

@Injectable()
export class AdminNewsNotPubService {

  constructor(private http: HttpClient, private attendService: AttendService) {
  }

  public getNotPublishedNewsList(json: string): Observable<Array<AdmNewsNotPubDTO>> {
    return this.http.post<Array<AdmNewsNotPubDTO>>(GeneralURL.newsActURL.concat('n_pub_list'), json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('getNotPublishedNewsList', new Array<AdmNewsNotPubDTO>()))
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

  public disableNews(id: string, json: string): Observable<ServerResponceDTO> {

    return this.http.post<ServerResponceDTO>(GeneralURL.newsActURL.concat('disable/', id), json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('desableNews', new ServerResponceDTO()))
    );
  }

  public publishNews(id: string): Observable<ServerResponceDTO> {

    return this.http.get<ServerResponceDTO>(GeneralURL.newsActURL.concat('publish/', id), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('publishNews', new ServerResponceDTO()))
    );
  }
}
