// Dans l'array toDo un valeur true signifie que cette action est accomplie, une valeur false signifie qu'elle est à faire
let notesJSON = [
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
]
class Note{
    static nbrInstances = 0;
    static debug = true;
    constructor(titre,dateCreation,couleur,dateRappel){
        Note.nbrInstances++

        if(typeof titre === "string") this._titre = titre;

        if(dateCreation instanceof Date) this._dateCreation = dateCreation;

        if(["Rouge","Orange","Jaune","Vert"].includes(couleur.toLowerCase())) this._couleur = couleur.toLowerCase();

        if(dateRappel instanceof Date) this._dateRappel = dateRappel;
    }

    get titre(){
        return this._titre;
    }
    get dateCreation(){
        return this._dateCreation;
    }
    get couleur(){
        return this._couleur;
    }
    get dateRappel(){
        return this._dateRappel;
    }
    set titre(titre){
        if(typeof titre === "string") {
            if (Note.debug === true) console.log(this, `titre: ${this.titre} => ${titre}`);
            this._titre = titre;
        }
    }
    set dateCreation(dateCreation){
        if(dateCreation instanceof Date) {
            if (Note.debug === true) console.log(this, `dateCreation: ${this.dateCreation} => ${dateCreation}`);
            this._dateCreation = dateCreation;
        }
    }
    set couleur(couleur){
        if(["Rouge", "Orange", "Jaune","Vert"].includes(couleur.toLowerCase())) {
            if (Note.debug === true) console.log(this, `couleur: ${this.couleur} => ${couleur}`);
            this._couleur = couleur.toLowerCase();
        }
    }

    static validationCouleur(couleurRouge,couleurOrange,couleurJaune,couleurVerte ) {
        if(couleurRouge.couleur === "Rouge" ||
           couleurOrange.couleur === "Orange" ||
           couleurJaune.couleur === "Jaune" ||
           couleurVerte.couleur === "Vert") {
            return [couleurRouge,couleurOrange,couleurJaune,couleurVerte];
        }
        return false;
    }
}
