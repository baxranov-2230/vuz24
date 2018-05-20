import { NewsTypeDto } from "./newsTypeDto";

export class NewsDto {
    public id: number;
    public title: string;
    public lang: string;
    public content: string;
    public subContent: String;
    public submitDate: string;
    public newsType: NewsTypeDto;

    constructor() {}
}