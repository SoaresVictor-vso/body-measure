const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const username = /^[a-z0-9\._]{3,15}$/;
const name = /^[a-zA-Zà-ÿÀ-Ÿ\s]{4,50}$/;
const alphanumericSpace = /^([a-zA-Z0-9\u00C0-\u017F]).{1,}$/;

export const RegExHelper = {
    alphanumericSpace,
    name,
    password,
    username
}