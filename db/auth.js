import { compare, hash } from 'bcryptjs';

export const hashPassword = async (password) => {
    return await hash(password, 12);
}

export const comparePassword = async (password, hashedPass) => {
    return await compare(password, hashedPass);
}