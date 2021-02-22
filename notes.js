// Dans l'array toDo un valeur true signifie que cette action est accomplie, une valeur false signifie qu'elle est à faire
//JSON TJS chaîne de caractères, pas directement un objet
let notesJSON = `[
	{
		"titre": "Notes Javascript",
		"texte": "Une méthode est une fonction appartenant à un objet",
		"date": "15/01/2021",
		"couleur": "rouge",
		"dateRappel": "null"
	},
	{
		"titre": "Notes Javascript",
		"toDo": [
			{"Faire les courses": true},
			{"Payer le loyer": false}
		],
		"date": "18/01/2021",
		"couleur": "rouge",
		"dateRappel": "null"
	}
]`
class Note {
    constructor(titre, dateCreation, couleur, dateRappel = undefined) {

        if (typeof titre === "string") this._titre = titre;

        if (typeof dateCreation === "string") this._dateCreation = dateCreation;

        if (["rouge", "orange", "jaune", "vert"].includes(couleur.toLowerCase())) this._couleur = couleur.toLowerCase();

        if (typeof dateRappel === "string") this._dateRappel = dateRappel;
    }

    get titre() {
        return this._titre;
    }
    get dateCreation() {
        return this._dateCreation;
    }
    get couleur() {
        return this._couleur;
    }
    get dateRappel() {
        return this._dateRappel;
    }
    set titre(titre) {
        if (typeof titre === "string") {
            this._titre = titre;
        }
    }
    set dateCreation(dateCreation) {
        if (typeof dateCreation === "string") {
            this._dateCreation = dateCreation;
        }
    }
    set couleur(couleur) {
        if (["rouge", "orange", "jaune", "vert"].includes(couleur.toLowerCase())) {
            this._couleur = couleur.toLowerCase();
        }
    }
    set dateRappel(dateRappel) {
        if (typeof dateRappel === "string") {
            this._dateRappel = dateRappel;
        }
    }
}
class TextNote extends Note {
    constructor(titre, texte, dateCreation, couleur, dateRappel = undefined) {
        super(titre, dateCreation, couleur, dateRappel);
        if (typeof texte === "string") this._texte = texte;
    }
    get texte() {
        return this._texte;
    }
    set texte(texte) {
        if (typeof texte === "string") {
            this._texte = texte;
        }
    }
}
class Checklistnote extends Note {
    constructor(titre, toDo = [], dateCreation, couleur, dateRappel = undefined) {
        super(titre, dateCreation, couleur, dateRappel);
        this._toDo = toDo;
    }
    get toDo() {
        return this._toDo;
    }
    set toDo(toDo) {
        if (typeof toDo === "string") {
            this._toDo = toDo;
        }
    }
}