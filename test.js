const validator = require('./index').Validator;

let data = {
	nom: 'Bolenge',
	email: 'dondedieubolenge@gmail.com',
	num: 1234
}

let rules = {
	nom: 'min:4',
	email: 'email',
	num: 'required'
}

validator.verify(data, rules, (success, errors) => {
	console.log(success);
	console.log(errors);
})