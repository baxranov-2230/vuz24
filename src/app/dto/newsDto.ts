import {NewsTypeDto} from './newsTypeDto';

export class NewsDto {
  public id: number;
  public title: string;
  public state: number;
  public lang: string;
  public content: string;
  public subContent: string;
  public submitDate: string;
  public newsType: NewsTypeDto;
  public nlId: number;
  public likedCount: number;
  public commentCount: number;
  public viewedCount: number;
  public important: boolean;
  public imgSrc: string;
  public NEWS_ID: number;
  public profile: {
    isLiked: boolean;
    isCommented: boolean;
    isSaved: boolean;
  };

  constructor() {
  }
}
