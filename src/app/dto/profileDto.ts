export class ProfileDto {
    public login: string;
    public password: string;
    public state: number;
    public firstName: string;
    public lastName: string;
    public token: string;
    public phoneNumber: string;
    public email: string;
    public birthDate;
    public isAdmin: Boolean;
    public imgLink: string;
    public isModerator: Boolean;
    public roles: Array<{ name: string }>

    constructor() {}
}