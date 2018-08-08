import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GeneralURL } from '../util/generalUrl';
import { LocalStorageSecurity } from '../util/localStorageSecurity';
import { CommonKey } from '../util/commonKey';
import { CryptoSecurity } from '../util/cryptoSecurity';
import { ProfileDto } from '../dto/profileDto';
import { CountDto } from '../dto/countDto';
import { ImageDto } from '../dto/imageDto';
import { NewsDto } from '../dto/newsDto';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  private getToken(): string {
    // const token = LocalStorageSecurity.getItem(CommonKey.TOKEN);
    const token =  localStorage.getItem(CryptoSecurity.encrypte(CommonKey.TOKEN));
    return token ? token.toString() : '';
  }

  public authorization(profile: ProfileDto) {
    let json = JSON.stringify(profile);
    
    let options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<ProfileDto>(GeneralURL.profileURL.concat('auth'), json, options);
  }

  public registration(profile: ProfileDto) {
    let json = JSON.stringify(profile);
    
    let options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<ProfileDto>(GeneralURL.profileURL.concat('reg_user'), json, options);
  }

  public UpdateProfile(profile: ProfileDto) {
    let json = JSON.stringify(profile);
    
    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': this.getToken()
        }),
    };

    return this.http.put(GeneralURL.profileURL.concat('update_detail'), json, options);
  }

  public deleteProfile(id: number) {
    let options = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': this.getToken()
      })
    };

    return this.http.delete(GeneralURL.profileURL.concat('delete/' + id), options);
  }

  public updateMyImage(profile: ProfileDto) {
    let json = JSON.stringify(profile);
    
    let options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.put(GeneralURL.profileURL.concat('update_img'), json, options);
  }

  public getProfiles(count: CountDto) {
    let json = JSON.stringify(count);
    
    let options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.getToken()
        })
    };

    return this.http.post(GeneralURL.profileURL.concat('pagination'), json, options);
  }

  public saveNews(news: NewsDto) {
    let json = JSON.stringify(news);
    
    let options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.post<CountDto>(GeneralURL.profileURL.concat('save_nl'), json, options);
  }

  public deleteSavedNews(id: number) {
    let options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.delete<CountDto>(GeneralURL.profileURL.concat('delete_nl/' + id), options);
  }

  public getSavedNews(count: CountDto) {
    let json = JSON.stringify(count);
    
    let options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.post<Array<NewsDto>>(GeneralURL.profileURL.concat('saved_nll'), json, options);
  }

  public createImage(file: File) {
      let formData = new FormData();
      formData.append('file', file);

      return this.http.post<ImageDto>(GeneralURL.imageURL.concat('create'), formData);
  }

  public LikeNews(id: number) {
    let options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.get<CountDto>(GeneralURL.likeNewsURL.concat('create/' + id), options);
  }
}