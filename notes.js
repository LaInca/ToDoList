// Dans l'array toDo un valeur true signifie que cette action est accomplie, une valeur false signifie qu'elle est à faire
//JSON TJS chaîne de caractères, pas directement un objet
//utiliser json et transformer en objet
//constructor prendre infos objets et boucler sur ceci 
//methode pour instancier a partir de la boucle
//aller chercher infos soit dans constructor (objet en entier) soit dans la boucle 

//Création de la classe ancêtre Note
//Création du constructor avec les paramètres nécessaires(ici titre,dateCreation,couleur, dateRappel) va servir à mettre toutes les propriétés sur l'instance en train d'être créée
//vérification avec les typeof
class Note {
    constructor(titre, dateCreation, couleur, dateRappel = undefined) {

        if (typeof titre === "string") this._titre = titre;

        if (typeof dateCreation === "string") this._dateCreation = dateCreation;

        if (["rouge", "orange", "jaune", "vert"].includes(couleur.toLowerCase())) this._couleur = couleur.toLowerCase();

        if (typeof dateRappel === "string") this._dateRappel = dateRappel;
    }
//Création des getters(get)
/*La syntaxe get permet de lier une propriété d'un objet à une fonction
 qui sera appelée lorsqu'on accédera à la propriété.*/
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
    //création des setters (set)
    /*La syntaxe set permet de lier une propriété d'un objet
    à une fonction qui sera appelée à chaque tentative de modification de cette propriété 
    la vérification dans le setter sera fait quand l'objet a été créé */
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
    //ne doit pas se retrouver sur les instances mais sur la classe (avec le mot static)
    //la methode displayNotes va afficher les instances dans un élément html (container)
    static displayNotes(arrayInstance,containerHTML) {
        for (let instance of arrayInstance){
            containerHTML.insertAdjacentElement("beforeend",instance.render())
        }
    }


}
//Création de la classe fille TextNote avec un extends
//constructor avec les arguments de la classe ancêtre "Note" plus un argument texte
//le super appelle et lance le constructor de la classe parent
//vérification du type de texte - vérification double dans le constructor et le set  
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
      //afficher tout ce qui se trouve entre debut et fin de la balise div
    //entre les 2 étapes modifier div pour qu'il corresponde à ce que je veux afficher, L'objet note va avoir des propriétés qui seront utilisées pour créer le bon HTML
    //utilisation de .innerHTML pour customiser ma div  innerHTML = `rrrrrrr`  titre texte datecréation 
    //revoir les fonctions et la méthode displayNote innerHTML
    render() {
      let item = document.createElement("div")
      item.innerHTML = `${this.titre}
      ${this.texte}
      ${this.dateCreation}
      ${this.dateRappel}`;
      item.style.background = this.couleur;
      item.style.border = "2px solid black";
      item._noteReference_ = this;

      let colorsMapping = {
        rouge: "red",
        orange: "orange",
        jaune: "yellow",
        vert: "green"
    }
    //creation du html
    item.innerHTML= `

            <h3>Titre:</h3> <p>${this.titre}</p>
            <h3>Date de création:</h3> <p>${this.dateCreation}</p>
            <h3>Date de rappel:</h3> <p>${this.dateRappel}</p>
            <h3>Texte:</h3> <p>${this.texte}</p>
    `
        //attribuer la couleur du bacground avec la couleur de l instance.
        item.style.background = colorsMapping[this.couleur];
      return item;
    }
    
}
class CheckListNote extends Note {
    constructor(titre, toDo = [], dateCreation, couleur, dateRappel = undefined) {
        super(titre, dateCreation, couleur, dateRappel);
        this._toDo = toDo;
    }
    get toDo() {
        return this._toDo;
    }
    set toDo(toDo) {
        if (toDo instanceof Array) {
            this._toDo = toDo;
        }
    }
    render() {
        let item = document.createElement("div")
        item.style.background = this.couleur;
        item._noteReference_ = this;
        let colorsMapping = {
            rouge: "red",
            orange: "orange",
            jaune: "yellow",
            vert: "green"
        }
        //creation du html
        item.innerHTML= `
    
                <h3>Titre:</h3> <p>${this.titre}</p>
                <h3>Date de création:</h3> <p>${this.dateCreation}</p>
                <h3>Date de rappel:</h3> <p>${this.dateRappel}</p>
        `
        for (let tache of this.toDo){
            for (let champ in tache){
                item.innerHTML+=`<h3>${champ}</h3> <p>${tache[champ]}</p>`;
                //console.log(champ,tache[champ])
            }
            //console.log(item)
        }
            //attribuer la couleur du background avec la couleur de l instance.
            item.style.background = colorsMapping[this.couleur];
        return item;
      }
}
let noteArray = [];
let mesNotesParsees = JSON.parse(notesJSON);

//for of passe sur chacun des éléments d'un array tour à tour et les enregistre dans la variable à gauche du of
//for in lui passe sur les noms de propriétés d'un objet (for key in ...)
for (let note of mesNotesParsees) {
    if (note.texte !== undefined) {
        noteArray.unshift(new TextNote(note.titre, note.texte, note.date, note.couleur, note.dateRappel));
    }
    else if (note.toDo !== undefined) {
        noteArray.unshift(new CheckListNote(note.titre, note.toDo, note.date, note.couleur, note.dateRappel));
    }
    

}
Note.displayNotes(noteArray,document.querySelector("#container"))



