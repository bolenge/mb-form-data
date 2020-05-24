# mb-form-data

> C'est un module Javascript (NodeJS) gérant les formatages, mise en place des contraintes de validation des types de données

## Installation

Ceci est un [Node.js](https://nodejs.org/en/) module disponible sur
[npm registry](https://www.npmjs.com/).

```bash
$ npm install mb-form-data
```

## API

```js
let mbFormData = require('mb-form-data')
let validator = mbFormData.Validator

let donnees = {
	nom: 'Etokila',
	prenom: 'Diani',
	age: '',
	email: 'diani'
}

let rules = {
	nom: 'required|min:3|max:30',
	prenom: 'min:3|max:30',
	email: 'required|email'
}

validator.verify(datas, rules, (success, errors) => {
	if (success) {
		console.log("Ok")
	}else {
		console.log(errors)
	}
})
```

### mbFormData.Validator

> Est un objet qui comporte plusieurs méthode qui sont exécutées en background lors de la vérification des contraintes (rules) sur les données

#### mbFormData.Validator.verify(datas, rules = null, callback)

Cette méthode est celle qui lance toutes les monoeuvres, elle reçoit 3 paramètres :
1. `datas` réçoit l'objet de littéral des données sous forme `key`: `value` (clé: valeur)

2. `rules` les règles sur les éléments de données à vérifier la validité, ce paramètre est par défaut `null` parce qu'il y a deux manières à envoyer les données et les règles : 

Soit par association de données et des règles dans le premier paramètre (`datas`) sous la forme suivante :

```js
let datas = {
	nom: {
		value: 'Etokila',
		rules: 'required|min:3|max:30'
	},
	prenom: {
		value: 'Diani',
		rules: 'min:3|max:30'
	},
	email: {
		value: 'diani',
		rules: 'required|email'
	}
}
```

Soit par séparémment, sous la forme suivante :

```js
let donnees = {
	nom: 'Etokila',
	prenom: 'Diani',
	age: '',
	email: 'diani'
}

let rules = {
	nom: 'required|min:3|max:30',
	prenom: 'min:3|max:30',
	email: 'required|email'
}
```

3. `callback(success, errorrs)` Le troisième parmètre est la fonction callback à appeler, qui recoit en retour deux paramètres.
* `success` : Vaut `true` si tout est correct et qu'il n'y a pas d'erreur et `false` au cas contraire
* `errors` : Objet, contenant la liste des erreurs dont le nom de la clé est le nom de la donnée et la valeur est le message d'erreur (`errors.nom`)

### Les règles disponibles

* `required` : Le champ est requis, obligatoire
* `email` : La valeur du champ doit être une adresse email valide
* `min:n` : `n` réprésente le nombre minimum de caractères que doit avoir ce champ
* `max:n` : `n` réprésente le nombre maximum de caractères que doit avoir ce champ
* `int` : La valeur du chmap doit être un entier
* `alpha:n` : La valeur du chmap doit être une chaine de caractère `n` (facultatif) réprésente le nombre de caractères que doit avoir ce champ
* `tel` : La valeur du champ doit être un numéro de téléphone valide

## Features

Les fonctionnalités à rajouter dans les futures versions :

* La localisation (internationnalisation ou utlisation des plusieurs langues pour les messages d'erreur)

* Inclusion de ce module comme middleware sous [ExpressJS](http://expressjs.com/) pour injecter l'objet `errors` dans les `req` ou `res`

## Pour tout contact

* Emailc : dondedieubolenge@gmail.com
* Facebook : [Don de Dieu Bolenge](http://facebook.com/dondedieu.bolenge)
* Github : [bolenge](http://github/bolenge)