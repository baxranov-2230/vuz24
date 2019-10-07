import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {SharedToasterService} from '../shared/shared-toaster/shared-toaster.service';
import {SharedToasterDTO} from '../shared/shared-toaster/dto/sharedToasterDTO';

@Injectable()
export class AttendService {

  constructor(private http: HttpClient, private router: Router, private sharedToasterSrv: SharedToasterService) {

  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 401) {  // UNAUTHORIZED
        this.sharedToasterSrv.startSharedToasterEmitter.emit(new SharedToasterDTO('Ваша сессия закончилась', 'Пожалуйста авторизуйтесь заного', 'warning'));
        this.router.navigate(['log-in']); // ROUTER REDIRECT
      }
      return of(result as T);
    };
  }
}
