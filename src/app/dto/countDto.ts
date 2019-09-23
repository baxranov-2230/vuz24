import { LangDto } from "./langDto";

export class CountDto {
    public state: number;
    public from: number;
    public to: number;
    public lang: string;
    public type: string;
    public key: number;
    public newsId: number;
    public pId: number;
    public reason: string;

    constructor() {}
}