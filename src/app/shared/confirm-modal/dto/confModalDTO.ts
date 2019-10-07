export class ConfirmModalDTO {
  public title: string;
  public content: string;
  public result: boolean; // yes/no
  public id: number; // any id of action (simple use 1)

  public isInputRequired: boolean;
  public inputContent: string;

  constructor(title: string, content: string, id: number) {
    this.title = title;
    this.content = content;
    this.id = id;
    this.isInputRequired = false;
    this.inputContent = '';
  }

}
