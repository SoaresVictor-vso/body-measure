const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const username = /^[a-z0-9\._]{3,15}$/;
const name = /^[a-zA-Zà-ÿÀ-Ÿ\s]{4,50}$/;
const alphanumericSpace = /^([a-zA-Z0-9\u00C0-\u017F]).{1,}$/;
const ISO_date = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+/;

export const RegExHelper = {
    alphanumericSpace,
    ISO_date,
    name,
    password,
    username
}