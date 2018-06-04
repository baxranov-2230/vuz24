import { NewsTypeDto } from "./newsTypeDto";

export class NewsDto {
    public id: number;
    public title: string;
    public lang: string;
    public content: string;
    public subContent: String;
    public submitDate: string;
    public newsType: NewsTypeDto;
    public nlId: number;
    public likedCount: number;
    public important: boolean;
    public profile: {
        isLiked: boolean;
        isCommented: boolean;
    }

    constructor() {}
}