const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const username = /^[a-z0-9\._]{3,15}$/;
const name = /^[a-zA-Zà-ÿÀ-Ÿ\s]{4,50}$/;

export const RegExHelper = {
    name,
    password,
    username
}