const mbnumber = require('mbnumber')
const mbregex = require('mbregex')

/**
 * Permet de faire de vérification sur la validation des données
 */
class Validator {

	constructor() {
		this.errors = {}
		this.twoDotesRegex = /:/
	}

	verify(datas, rules = null, callback) {
		let donnees = datas

		if (rules) {
			let datasValues =  Object.values(datas)

			if (typeof datasValues[0] != 'object') {
				donnees = {}

				for (let field in datas) {
					donnees[field] = rules[field] 
								   ? {value: datas[field], rules: rules[field]}
								   : {value: datas[field]}
				}
			}else {
				throw "The elements values of datas can't be object if the rules paramater exist"
			}
		}

		this.parser(donnees, callback)
	}

	/**
	 * Permet de faire le parsing des données envoyées
	 * @param {Array} datas Les données à parser
	 */
	parser(datas, callback) {
		for (let key in datas) {
			let field = key
			let value = datas[field]
			let fieldValue = value.value
			let fieldRules = value.rules

			if (fieldRules) {
				let rules = fieldRules.split('|')
				let isRequired = rules.indexOf('required')

				rules.forEach((rule, index, tab) => {
					let ruleTab = rule.split(':')

					if (isRequired >= 0 || fieldValue) {
						if (ruleTab.length > 1) {
							let regle = ruleTab[0]
							let param = ruleTab[1]

							this[regle](field, fieldValue, param)
						}else {
							this[ruleTab[0]](field, fieldValue)
						}
					}
				})
			}
		}

		if (this.isValid()) {
			callback(true, null)
		}else {
			callback(false, this.errors)
		}
	}

	/**
	 * Vérifie si le champ n'est pa vide
	 * @param {String} field Le nom du champ en question
	 * @param {String} value La valeur du champ
	 * @return bool
	 */
	required(field, value) {
		value = value.trim()

		if (value.length <= 0) {
			this.addError(field, "champ obligatoire")

			return false
		}

		return true
	}

	/**
	 * Vérifie si le champ est max qu'il faut
	 * @param {String} field Le nom du champ en question
	 * @param {String} value La valeur du champ
	 * @param {Number} maxVal La valeur maximum que doit avoir le champ
	 * @return bool
	 */
	max(field, value, maxVal) {
		value = value.trim()

		if (value.length > maxVal) {
			let error = "maximum " + maxVal + " caractère" + this.make2Pluriel(maxVal)

			this.addError(field, error)
			
			return false
		}

		return true
	}

	/**
	 * Vérifie si le champ est max qu'il faut
	 * @param {String} field Le nom du champ en question
	 * @param {String} value La valeur du champ
	 * @param {Number} minVal La valeur maximum que doit avoir le champ
	 * @return bool
	 */
	min(field, value, minVal) {
		value = value.trim()

		if (value.length < minVal) {
			let error = "minimum " + minVal + " caractère" + this.make2Pluriel(minVal)
			
			this.addError(field, error)

			return false
		}

		return true
	}

	/**
	 * Vérifie si le champ est max qu'il faut
	 * @param {String} field Le nom du champ en question
	 * @param {String} value La valeur du champ
	 * @param {Number} minVal La valeur maximum que doit avoir le champ
	 * @return bool
	 */
	int(field, value) {
		value = value.toString()
		value = value.trim()

		if (!mbnumber.isIntValid(value)) {
			this.addError(field, "doit être un entier")

			return false
		}

		return true
	}

	/**
	 * Vérifie si c'est une adresse email valide
	 * @param {String} field Le champ à vérifier
	 * @param {String} value La valeur du champ
	 * @return {Boolean}
	 */
	email(field, value) {
		if (!mbregex.isEmail(value)) {
			this.addError(field, "doit être une adresse email valide")

			return false
		}

		return true
	}

	/**
	 * Permet de renvoyé un 's' si la valeur passé est > 1
	 * @param {Number} val
	 * @return {String}
	 */
	make2Pluriel(val) {
		return val > 1 ? 's' : ''
	}

	/**
	 * Permet d'ajouter une erreur
	 * @param {String} field Le champ ayant l'erreur
	 * @param {String} error L'erreur à ajouter
	 * @return {void}
	 */
	addError(field, error) {
		this.errors[field] = this.errors[field] 
						   ? this.errors[field] + ', ' + error 
						   :  field + ' ' + error
	}

	/**
	 * Vérifie si les données à vérifier sont valides
	 * @return {Boolean}
	 */
	isValid(callback) {
		if (Object.keys(this.errors).length == 0) {
			return true
		}

		return false
	}

	associateDataWithRules(datas, rules) {

	}
}

module.exports = Validator