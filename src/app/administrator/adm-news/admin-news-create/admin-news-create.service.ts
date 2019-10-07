import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommonKey} from "../../../util/commonKey";
import {LocalStorageSecurity} from "../../../util/localStorageSecurity";
import {GeneralURL} from "../../../util/generalUrl";
import {ServerResponceDTO} from "../../../dto/serverResponceDTO";
import {AttendService} from "../../../services/attend.service";
import {catchError} from "rxjs/internal/operators";

@Injectable()
export class AdminNewsCreateService {

  constructor(private http: HttpClient, private attendService: AttendService) {
  }

  public createNews(json: string): Observable<ServerResponceDTO> {
    return this.http.post<ServerResponceDTO>(GeneralURL.newsActURL.concat('create'), json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('createNews', new ServerResponceDTO()))
    );
  }

  public createTranslation(json: string): Observable<ServerResponceDTO> {
    return this.http.post<ServerResponceDTO>(GeneralURL.newsActURL.concat('create_trans'), json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('createTranslation', new ServerResponceDTO()))
    );
  }

  public updateNews(json: string): Observable<ServerResponceDTO> {
    return this.http.put<ServerResponceDTO>(GeneralURL.newsActURL.concat('update_news_lang'), json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('updateNews', new ServerResponceDTO()))
    );
  }


}
