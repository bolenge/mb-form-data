const validator = require('./index').Validator;

let data = {
	nom: 'Bolenge',
	email: 'dondedieubolenge@gmail.com'
}

let rules = {
	nom: 'min:4',
	email: 'email'
}

validator.verify(data, rules, (success, errors) => {
	console.log(success);
	console.log(errors);
})