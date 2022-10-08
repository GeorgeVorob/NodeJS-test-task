import * as bcrypt from "bcrypt"

export class StringsEncryptHelper {
    // Возаращает строку в зашифрованном виде.
    public static readonly EncryptString = (string: string): string => {
        return bcrypt.hashSync(string, process.env.PASSWORD_SALT as string);
    }
}