import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import {GeneralURL} from '../../util/generalUrl';
import {LocalStorageSecurity} from '../../util/localStorageSecurity';
import {CommonKey} from '../../util/commonKey';
import {AdmDashBoardDTO} from './dto/admDashBoardDTO';
import {AttendService} from '../../services/attend.service';

@Injectable()
export class AdminDashboardService {

  constructor(private http: HttpClient, private attendService: AttendService) {
  }


  public getDashBoardStatistics(): Observable<AdmDashBoardDTO> {

    return this.http.get<AdmDashBoardDTO>(GeneralURL.admDashboardURL.concat('adm/statistic'), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('getDashBoardStatistics', new AdmDashBoardDTO()))
    );
  }

}
