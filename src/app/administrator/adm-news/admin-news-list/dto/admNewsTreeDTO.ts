import {AdmNewsItemDTO} from './admNewsItemDTO';
export class AdmNewsTreeDTO {
  public news_id: number; // NEWS_ID
  public comment_count: number;
  public liked_count: number;
  public viewed_count: number;
  public submit_date: string;
  public update_date: string;
  public upd_prt_id: number; // news_update_delete_prtID
  public news_type_id: number;
  public key: string; // news_type_key

  public uzl: string;
  public uzk: string;
  public ru: string;
  public en: string;

  /**/
  public uzlDTO: AdmNewsItemDTO;
  public uzkDTO: AdmNewsItemDTO;
  public ruDTO: AdmNewsItemDTO;
  public enDTO: AdmNewsItemDTO;
  /**/

  constructor() {

  }
}
