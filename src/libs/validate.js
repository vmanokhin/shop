import emailValidator from "email-validator";
import dictionary from '../dictionary';

const { ru: { error } } = dictionary;

export function checkCheckbox(checkbox) {
	if (!checkbox) return error.confirm;
}

export function checkUsername(username) {
	if (!username) return error.username.required;
	else if (username.length < 3) return error.username.minLength;
}

export function checkEmail(email) {
	if (!email) return error.email.required;
	else if (!emailValidator.validate(email)) return error.email.valid;
}

export function checkRequired(value) {
	if (!value) return error.description.required;
}

export function checkPassword(pass) {
	if (!pass) return error.password.required;
	else if (pass.length < 6) return error.password.minLength;
	else if (pass.length > 16) return error.password.maxLength;
}