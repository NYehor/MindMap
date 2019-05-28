import isEmail from './validators/isEmail';

export default {
    name: {
        name: {
            missing: (value) => value.length !== 0
        },
        email: {
            missing: (value) => value.length !== 0,
            valid: (value) => isEmail(value)
        },
        password: {
            missing: (value) => value.length !== 0,
            mustBeLatin: (value) => /[a-z]/gi.test(value),
            oneNumber: (value) => /[0-9]/g.test(value),
            specialCharacter: (value) => /~`"'!@#$%^&*()_+-={}[]<>,.|/g.test(value),
            minLength: (value) => (value.length >= 10) 
        }
    }
};