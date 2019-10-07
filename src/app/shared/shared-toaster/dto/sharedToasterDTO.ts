export class SharedToasterDTO {
  public id: string;
  public isUsed: boolean;

  public title: string;
  public content: string;
  public type: string; // success, warning, error


  constructor(title: string, content: string, type: string) {
    this.id = new Date().getTime().toString();
    this.isUsed = false;

    this.title = title;
    this.content = content;
    this.type = type;
  }
}
