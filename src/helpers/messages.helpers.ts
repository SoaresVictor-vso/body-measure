// const EMPTY_FIELD = (field: string) => `O campo "${field}" não pode ser vazio`;
// const ALPHANUMERIC_FIELD = (field: string) => `O campo "${field}" deve ser preenchido com letras, números e/ou espaços`;
// const ALPHABETIC_FIELD = (field: string) => `O campo "${field}" deve ser preenchido com letras e espaços`;
// const INT_FIELD = (field: string) => `O campo "${field}" deve ser um número inteiro`;
// const DATE_FIELD = (field: string) => `O campo "${field}" deve ser uma data`;
// const ARRAY_FIELD = (field: string) => `O campo "${field}" deve ser um conjunto de dados`;
// const ISO_DATE_FIELD = (field: string) => `O campo "${field}" deve seguir o padrão de data ISO 8601`;

const EMPTY_FIELD = (field: string) => `Invalid Value-${field}-notEmpty`;
const ALPHANUMERIC_FIELD = (field: string) => `Invalid Value-${field}-only:uppercase,lowercase,numberany`;
const ALPHABETIC_FIELD = (field: string) => `Invalid Value-${field}-only:uppercase,lowercase`;
const INT_FIELD = (field: string) => `Invalid Value-${field}-only:numberint`;
const DATE_FIELD = (field: string) => `Invalid Value-${field}-only:date`;
const ARRAY_FIELD = (field: string) => `Invalid Value-${field}-only:array`;
const ISO_DATE_FIELD = (field: string) => `Invalid Value-${field}-only:date`;
const EMAIL_FIELD = (field: string) => `Invalid Value-${field}-only:email`;
const MATCHES = (field: string, matchPattern: string) => `Invalid Value-${field}-match:${matchPattern}`

export const MessageHelper = {
    ALPHABETIC_FIELD,
    ALPHANUMERIC_FIELD,
    ARRAY_FIELD,
    BAD_CREDENTIALS: `Login e/ou senha inválidos.`,
    DATE_FIELD,
    EMAIL_FIELD,
    EMPTY_FIELD,
    ISO_DATE_FIELD,
    INT_FIELD,
    MATCHES
}