export class User {
    uid: number;
    email: string;
    password: string;
    nickname: string;

    public constructor(
        _email: string,
        _password: string,
        _nickname: string,
        _uid: number,
    ) {
        this.email = _email;
        this.password = _password;
        this.nickname = _nickname;
        this.uid = _uid;
    }
}