import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageSecurity} from '../../util/localStorageSecurity';
import {GeneralURL} from '../../util/generalUrl';
import {CommonKey} from '../../util/commonKey';
import {AdmModeratorDTO} from './dto/admModeratorDTO';
import {PageFilterDTO} from '../../dto/pageFilterDTO';
import {ServerResponceDTO} from '../../dto/serverResponceDTO';
import {AttendService} from '../../services/attend.service';
import {catchError} from 'rxjs/internal/operators';

@Injectable()
export class AdminModeratorService {

  startModeratorItemModalEmitter = new EventEmitter();

  constructor(private http: HttpClient, private attendService: AttendService) {
  }

  public moderatorList(filer: PageFilterDTO): Observable<Array<AdmModeratorDTO>> {
    const json = JSON.stringify(filer);

    return this.http.post<Array<AdmModeratorDTO>>(GeneralURL.moderatorURL.concat('pagination'), json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('moderatorList', new Array<AdmModeratorDTO>()))
    );
  }

  public createModerator(json: string): Observable<ServerResponceDTO> {
    return this.http.post<ServerResponceDTO>(GeneralURL.moderatorURL.concat('create'), json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('createModerator', new ServerResponceDTO()))
    );
  }

  public deleteModerator(id: string): Observable<ServerResponceDTO> {
    return this.http.delete<ServerResponceDTO>(GeneralURL.moderatorURL.concat('delete', '/', id), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('deleteModerator', new ServerResponceDTO()))
    );
  }
}
