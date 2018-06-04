import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GeneralURL } from '../util/generalUrl';
import { LocalStorageSecurity } from '../util/localStorageSecurity';
import { CommonKey } from '../util/commonKey';
import { CountDto } from '../dto/countDto';
import { CommentDto } from '../dto/commentDto';

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }

  public createComment(comment: CommentDto) {
    let json = JSON.stringify(comment);

    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.post(GeneralURL.newsComment.concat('create'), json, options);
  }

  public updateComment(comment: CommentDto) {
    let json = JSON.stringify(comment);

    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.put(GeneralURL.newsComment.concat('update/' + comment.id), json, options);
  }

  public deleteNews(id: number) {
    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.delete(GeneralURL.newsComment.concat('delete/' + id), options);
  }

  public deleteNewsByAdmin(id: number) {
    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.delete(GeneralURL.newsComment.concat('delete_admin/' + id), options);
  }

  public getNewsComment(id: number) {
    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.get(GeneralURL.newsComment.concat('find/' + id), options);
  }

  public getNewsCommentList(id: number) {
    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };

    return this.http.post(GeneralURL.newsComment.concat('list_no/' + id), options);
  }

  public getNewsCommentListWithToken(id: number) {
    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': LocalStorageSecurity.getItem(CommonKey.TOKEN)
        })
    };

    return this.http.post(GeneralURL.newsComment.concat('list_token/' + id), options);
  }
}