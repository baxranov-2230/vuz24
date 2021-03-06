import {Injectable} from '@angular/core';
import {AttendService} from '../../services/attend.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdmProfileListDTO} from '../admin-user/dto/admProfileListDTO';
import {GeneralURL} from '../../util/generalUrl';
import {ProfileDetailDTO} from './dto/profileDetailDTO';
import {LocalStorageSecurity} from '../../util/localStorageSecurity';
import {catchError} from 'rxjs/internal/operators';
import {CommonKey} from '../../util/commonKey';
import {ServerResponceDTO} from "../../dto/serverResponceDTO";
import {ImageDto} from "../../dto/imageDto";

@Injectable()
export class AdminNavPanelService {

  constructor(private http: HttpClient, private attendService: AttendService) {
  }

  public getProfileDetail(): Observable<ProfileDetailDTO> {

    return this.http.get<ProfileDetailDTO>(GeneralURL.profileURL.concat('detail'), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('getProfileDetail', new ProfileDetailDTO()))
    );
  }

  public updateProfileDetail(json: string): Observable<ServerResponceDTO> {

    return this.http.put<ServerResponceDTO>(GeneralURL.profileURL.concat('update_detail'), json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('getProfileDetail', new ServerResponceDTO()))
    );
  }

  public createImage(file: File): Observable<ImageDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ImageDto>(GeneralURL.imageURL.concat('create'), formData);
  }

  public updateProfileImage(json: string): Observable<ServerResponceDTO> {

    return this.http.put<ServerResponceDTO>(GeneralURL.profileURL.concat('update_img'), json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    }).pipe(
      catchError(this.attendService.handleError('updateProfileImage', new ServerResponceDTO()))
    );
  }

}
