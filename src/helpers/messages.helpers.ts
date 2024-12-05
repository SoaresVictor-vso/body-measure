const EMPTY_FIELD = (field: string) => `O campo "${field}" não pode ser vazio`;
const ALPHANUMERIC_FIELD = (field: string)=> `O campo "${field}" deve ser preenchido com letras, números e/ou espaços`;
const ALPHABETIC_FIELD = (field: string)=> `O campo "${field}" deve ser preenchido com letras e espaços`;
export const MessageHelper = {
    ALPHABETIC_FIELD,
    ALPHANUMERIC_FIELD,
    BAD_CREDENTIALS: `Login e/ou senha inválidos.`,
    EMPTY_FIELD,
}