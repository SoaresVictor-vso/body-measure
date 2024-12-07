const EMPTY_FIELD = (field: string) => `O campo "${field}" não pode ser vazio`;
const ALPHANUMERIC_FIELD = (field: string) => `O campo "${field}" deve ser preenchido com letras, números e/ou espaços`;
const ALPHABETIC_FIELD = (field: string) => `O campo "${field}" deve ser preenchido com letras e espaços`;
const INT_FIELD = (field: string) => `O campo "${field}" deve ser um número inteiro`;
const DATE_FIELD = (field: string) => `O campo "${field}" deve ser uma data`;
const ARRAY_FIELD = (field: string) => `O campo "${field}" deve ser um conjunto de dados`;
const ISO_DATE_FIELD = (field: string) => `O campo "${field}" deve seguir o padrão de data ISO 8601`;

export const MessageHelper = {
    ALPHABETIC_FIELD,
    ALPHANUMERIC_FIELD,
    ARRAY_FIELD,
    BAD_CREDENTIALS: `Login e/ou senha inválidos.`,
    DATE_FIELD,
    EMPTY_FIELD,
    INT_FIELD
}