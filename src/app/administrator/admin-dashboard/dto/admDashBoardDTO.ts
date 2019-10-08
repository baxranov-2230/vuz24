export class AdmDashBoardDTO {
  public data: string;
  public state: string;

  /* statistics detail */
  public moder_count: number;
  public pub_news_count: number;
  public pub_news_lang_count: number;
  public today_comment_count: number;
  public today_like_count: number;
  public today_publish_nw_lang_count: number;
  public today_publish_nw_count: number;
  public user_count: number;

  constructor() {

  }
}
