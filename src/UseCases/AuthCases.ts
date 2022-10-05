import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { UserInfoValidator } from "../Model/validators/UserInfoValidator";

//Валидирует данные и создает нового пользователя.
export const AddUser = async (userData: UserFromClientDTO): Promise<void> => {
    UserInfoValidator(userData);
}