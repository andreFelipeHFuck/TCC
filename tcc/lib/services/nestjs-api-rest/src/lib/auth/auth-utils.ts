import * as bcrypt from 'bcrypt';

export async function hashedPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

export async function comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}
