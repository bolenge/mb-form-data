const validator = require('./index').Validator;

let data = {
	nom: 'b',
	email: 'dondedieuboleng',
	num: 1234
}

let rules = {
	nom: 'required|field:Nom|min:4',
	email: 'required|field:Adresse email|email',
	num: 'required'
}

validator.verify(data, rules, (success, errors) => {
	console.log(success);
	console.log(errors);
})