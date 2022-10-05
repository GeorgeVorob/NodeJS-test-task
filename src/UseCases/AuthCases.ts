import { UserRepository } from "../DataAccessLayer/UserRepository";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { ValidateUserInfo } from "../Model/validators/UserInfoValidator";

// Валидирует данные и регистрирует нового пользователя.
export const RegisterUserCase = async (userData: UserFromClientDTO): Promise<void> => {
    ValidateUserInfo(userData);
    await UserRepository.AddUser(userData);
}