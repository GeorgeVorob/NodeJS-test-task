import { UserRepository } from "../DataAccessLayer/UserRepository";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { User } from "../Model/models/user";
import { ValidateUserInfo } from "../Model/validators/UserInfoValidator";

// Валидирует данные и регистрирует нового пользователя.
export const RegisterUserCase = async (userData: UserFromClientDTO): Promise<void> => {
    ValidateUserInfo(userData);
    await UserRepository.AddUser(userData);
}

// Ищет пользователя по почте и паролю. Выдает исключение, если не находит пользователя.
export const LogInUserCase = async (userData: UserFromClientDTO): Promise<void> => {
    userData.nickname = undefined;

    if (!userData.email)
        throw new Error("No email provided!");
    if (!userData.password)
        throw new Error("No password provided!");

    UserRepository.FindUserExact(userData)
        .then((result: User | null) => {
            if (!result)
                throw new Error("No such user");
        })
}