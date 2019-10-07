import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageSecurity} from '../../util/localStorageSecurity';
import {GeneralURL} from '../../util/generalUrl';
import {CommonKey} from '../../util/commonKey';
import {PageFilterDTO} from '../../dto/pageFilterDTO';
import {AdmCommentListDTO} from './dto/admCommentListDTO';
import {ServerResponceDTO} from '../../dto/serverResponceDTO';
import {AttendService} from '../../services/attend.service';
import {catchError} from 'rxjs/internal/operators';

@Injectable()
export class AdminCommentService {

  constructor(private http: HttpClient, private attendService: AttendService) {

  }

  public getCommentList(filer: PageFilterDTO): Observable<AdmCommentListDTO> {
    const json = JSON.stringify(filer);

    return this.http.post<AdmCommentListDTO>(GeneralURL.newsComment.concat('list'), json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('getCommentList', new AdmCommentListDTO()))
    );
  }

  public deleteComment(id: string): Observable<ServerResponceDTO> {
    return this.http.delete<ServerResponceDTO>(GeneralURL.newsComment.concat('delete_admin', '/', id), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('deleteComment', new ServerResponceDTO()))
    );
  }

}
