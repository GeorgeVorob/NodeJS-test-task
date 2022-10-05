import { UserFromClientDTO } from "../DTOs/UserFromClientDTO"

//Проверяет переданный DTO пользователя на корректность хранимых данных.
//TODO: Добавить инструмент для валидации вместо этого самописного ужаса.
export function ValidateUserInfo(
    userInfo: UserFromClientDTO,
    ignoreEmptyFields: boolean = false): void {
    if (userInfo) {

        if (userInfo.email) {

            if (userInfo.email.length > 100) {
                throw new Error("Email is too long! Max length: 100.");
            }

        } else
            if (!ignoreEmptyFields) throw new Error("Email must be provided!");

        if (userInfo.password) {

            if (userInfo.password.length > 100) {
                throw new Error("Password is too long! Max length: 100.");
            }
            if (!(/\d/.test(userInfo.password))) {
                throw new Error("Password must contain at least one number!");
            }
            if (userInfo.password.toUpperCase() === userInfo.password) {
                throw new Error("Password must contain at least one lower case letter!");
            }
            if (userInfo.password.toLowerCase() === userInfo.password) {
                throw new Error("Password must contain at least one upper case letter!");
            }

        } else if (!ignoreEmptyFields) throw new Error("Password must be provided!");

        if (userInfo.nickname) {
            if (userInfo.nickname.length > 30) {
                throw new Error("Nickname is too long! Max length: 30");
            }
        } else if (!ignoreEmptyFields) throw new Error("Nickname must be provided!");

    } else if (!ignoreEmptyFields) throw new Error("No data provided!");
}