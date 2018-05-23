import { NewsTypeDto } from "../dto/newsTypeDto";

export class NewsType {
    private static newsTypesList: Array<NewsTypeDto>;

    constructor(){}

    public setNewsTypes(types: Array<NewsTypeDto>) {
        NewsType.newsTypesList = types;
    }

    public getNewsTypes() {
        return NewsType.newsTypesList;
    }

    public getNewsTypeName(key: string) {
        for(var x of NewsType.newsTypesList) {
            if (x.key === key) {
                return x.name;
            }
        }
    }
}