export class User {
    uid: string;
    email: string;
    password: string;
    nickname: string;

    public constructor(
        _email: string,
        _password: string,
        _nickname: string,
        _uid: string,
    ) {
        this.email = _email;
        this.password = _password;
        this.nickname = _nickname;
        this.uid = _uid;
    }
}