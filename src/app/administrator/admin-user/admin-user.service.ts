import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeneralURL} from '../../util/generalUrl';
import {LocalStorageSecurity} from '../../util/localStorageSecurity';
import {CommonKey} from '../../util/commonKey';
import {PageFilterDTO} from '../../dto/pageFilterDTO';
import {AdmProfileListDTO} from './dto/admProfileListDTO';
import {ServerResponceDTO} from '../../dto/serverResponceDTO';
import {AttendService} from '../../services/attend.service';
import {catchError} from 'rxjs/internal/operators';

@Injectable()
export class AdminUserService {

  constructor(private http: HttpClient, private attendService: AttendService) {
  }

  public getUserList(filer: PageFilterDTO): Observable<AdmProfileListDTO> {
    const json = JSON.stringify(filer);

    return this.http.post<AdmProfileListDTO>(GeneralURL.profileURL.concat('pagination'), json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('getUserList', new AdmProfileListDTO()))
    );
  }

  public deleteUser(id: string): Observable<ServerResponceDTO> {
    return this.http.delete<ServerResponceDTO>(GeneralURL.profileURL.concat('delete', '/', id), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('deleteUser', new ServerResponceDTO()))
    );
  }

}
