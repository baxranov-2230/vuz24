import { ProfileDto } from "./profileDto";

export class CommentDto {
    public id: number;
    public state: number;
    public content: string;
    public submitDate: string;
    public newsId: number;
    public time: string;
    public profile: ProfileDto;

    constructor() {}
}