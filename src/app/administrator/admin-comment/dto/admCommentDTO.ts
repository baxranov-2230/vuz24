import {AdmCommentProfileDTO} from './admCommentProfileDTO';
export class AdmCommentDTO {
  public id: number;
  public content: string;
  public newsId: number;
  public submitDate: string;
  public profile: AdmCommentProfileDTO;

  constructor() {

  }
}
