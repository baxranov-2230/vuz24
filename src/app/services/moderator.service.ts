import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { LocalStorageSecurity } from '../util/localStorageSecurity';
import { CommonKey } from '../util/commonKey';
import { GeneralURL } from '../util/generalUrl';
import { ProfileDto } from '../dto/profileDto';
import { CountDto } from '../dto/countDto';

@Injectable()
export class ModeratorService {

  constructor(private http: HttpClient) { }

  public createModerator(moderator: ProfileDto) {
    let json = JSON.stringify(moderator);
    
    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.post<ProfileDto>(GeneralURL.moderatorURL.concat('create'), json, options);
  }

  public updateModerator(moderator: ProfileDto) {
    let json = JSON.stringify(moderator);
    
    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        }),
    };

    return this.http.put<CountDto>(GeneralURL.moderatorURL.concat('update_detail'), json, options);
  }

  public deleteModerator(id: number) {
    let options = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
      })
    };

    return this.http.delete<CountDto>(GeneralURL.moderatorURL.concat('delete/' + id), options);
  }

  public getModerators(count: CountDto) {
    let json = JSON.stringify(count);
    
    let options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.post<Array<ProfileDto>>(GeneralURL.moderatorURL.concat('pagination'), json, options);
  }
}