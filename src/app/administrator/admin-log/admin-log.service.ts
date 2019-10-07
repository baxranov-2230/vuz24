import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeneralURL} from '../../util/generalUrl';
import {LocalStorageSecurity} from '../../util/localStorageSecurity';
import {CommonKey} from '../../util/commonKey';
import {PageFilterDTO} from '../../dto/pageFilterDTO';
import {AdmLogListDTO} from './dto/admLogListDTO';
import {AttendService} from '../../services/attend.service';
import {catchError} from 'rxjs/internal/operators';

@Injectable()
export class AdminLogService {

  constructor(private http: HttpClient, private attendService: AttendService) {

  }

  public getLogList(filer: PageFilterDTO): Observable<AdmLogListDTO> {
    const json = JSON.stringify(filer);

    return this.http.post<AdmLogListDTO>(GeneralURL.logURL.concat('list'), json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('getLogList', new AdmLogListDTO()))
    );
  }


}


