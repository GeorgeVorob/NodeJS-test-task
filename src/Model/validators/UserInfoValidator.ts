import { UserFromClientDTO } from "../DTOs/UserFromClientDTO"

//Проверяет переданный DTO пользователя на корректность хранимых данных.
export function IsUserDataValid(userInfo: UserFromClientDTO): string {
    var err: string = "";

    if (userInfo.email.length > 100) {
        err = "Email is too long! Max length: 100.";
        return err;
    }

    if (userInfo.password.length > 100) {
        err = "Password is too long! Max length: 100.";
        return err;
    }
    if (!(/\d/.test(userInfo.password))) {
        err = "Password must contain at least one number!";
        return err;
    }
    if (userInfo.password.toUpperCase() === userInfo.password) {
        err = "Password must contain at least one lower case letter!";
        return err;
    }
    if (userInfo.password.toLowerCase() === userInfo.password) {
        err = "Password must contain at least one upper case letter!";
        return err;
    }

    if (userInfo.nickname.length > 30) {
        err = "Nickname is too long! Max length: 30";
        return err;
    }

    return err;
}