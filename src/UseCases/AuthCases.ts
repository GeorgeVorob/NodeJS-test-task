import { UserRepository } from "../DataAccessLayer/UserRepository";
import { TokenToUserDTO } from "../Model/DTOs/TokenToUserDTO";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { User } from "../Model/models/user";
import { ValidateUserInfo } from "../Model/validators/UserInfoValidator";
import { JWTService } from "../Services/JWTService";

// Валидирует данные и регистрирует нового пользователя.
export const RegisterUserCase = async (userData: UserFromClientDTO): Promise<TokenToUserDTO> => {
    ValidateUserInfo(userData);
    var user: User;
    await UserRepository.AddUser(userData).then((res) => { user = res });
    return JWTService.CreateTokenDTO(user!.uid);
}

// Ищет пользователя по почте и паролю. Выдает исключение, если не находит пользователя.
export const LogInUserCase = async (userData: UserFromClientDTO): Promise<TokenToUserDTO> => {
    userData.nickname = undefined;

    if (!userData.email)
        throw new Error("No email provided!");
    if (!userData.password)
        throw new Error("No password provided!");

    var user: User;

    await UserRepository.FindUserExact({ ...userData })
        .then((result: User | null) => {
            if (!result)
                throw new Error("No such user");
            else
                user = result;
        })

    return JWTService.CreateTokenDTO(user!.uid);
}