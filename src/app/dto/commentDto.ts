export class CommentDto {
    public id: number;
    public state: string;
    public content: string;
    public submitDate: Date;
    public newsId: number;

    constructor() {}
}