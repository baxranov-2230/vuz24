import { LangDto } from "./langDto";

export class CountDto {
    public state: number;
    public from: number;
    public to: number;
    public lang: LangDto;
    public type: string;
    public key: number;

    constructor() {}
}