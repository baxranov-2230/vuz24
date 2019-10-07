export class AdmNewsNotPubDTO {

  public lang: string;
  public id: number;
  public newsType: {
    id: number;
    key: string;
  };
  public nlId: number;
  public title: string;
  public content: string;
  public subContent: string;
  public publish: boolean;
  public profile: {
    id: number
    firstName: string;
    lastName: string;
    imgLink: string;
  };
  public submitDate: string;

  constructor() {

  }
}
