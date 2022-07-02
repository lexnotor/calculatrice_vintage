var nbr_to_show = 35;
var inserted = "|";
var my_droite = document.querySelector("#droite");
var my_gauche= document.querySelector("#gauche");

/***************************************************************************/ 
/***************************************************************************/ 
/***************************************************************************/ 
// Definition des fonctions aidant à deplacer le curseur sur l'afficheur
// cette fontion gere l'avancement du curseur
function avancer(texte="") {
    let myreg = /(?:\|)((\d)|(sin\(\d*\))|(\s*[*/\-+]\s*)|(\))|(\())/;
    return texte.replace(myreg, `$1|`);
}
// cette fontion gere le recule du curseur
function reculer(texte = "") {
    let myreg = /((\d)|(sin\(\d*\))|(\s*[*/\-+]\s*)|(\))|(\())(?:\|)/;
    return texte.replace(myreg, `|$1`);
}
// Cette fonction resoit un tableau contenant "|" et replace ce signe
// par <span class="clig">|</span>
function to_span(texte="") {
    return texte.replace("|", '<span class="clig">|</span>')
}
// cette fontion permet de modifier ce qui est ecrit sur le input en 
// se basant sur le contenu de la variable inserted
function appliquer(a) {
    let to_put = document.querySelector("#afficheur #input");
    inserted = a == 'r' ? avancer(inserted) : reculer(inserted);
    to_put.innerHTML = to_span(inserted);
    let clig = document.querySelector('.clig');
    clig.scrollIntoView()
}
// Ajout des evenement permettant de deplacer le curseur lors du maintien
let my_interval = [];
my_droite.addEventListener("mousedown", () => {
    my_interval.push(setInterval(appliquer, 200, ['r']))
}, false);
my_droite.addEventListener("mouseup", () => {
    my_interval.forEach(ele => { clearInterval(ele) })
}, false);
my_gauche.addEventListener("mousedown", () => {
    my_interval.push(setInterval(appliquer, 200, ['l']))
}, false);
my_gauche.addEventListener("mouseup", () => {
    my_interval.forEach(ele => { clearInterval(ele) })
}, false);

/***************************************************************************/
/***************************************************************************/
/***************************************************************************/


function insert_number(nbr = 0) {
    let to_put = document.querySelector("#afficheur #input");
    inserted = inserted.replace("|", nbr + "|");
    to_put.innerHTML = to_span(inserted);
}

function insert_operateur(signe = "+") {
    let to_put = document.querySelector("#afficheur #input");
    inserted = inserted.replace("|", " "+ signe + " |");
    to_put.innerHTML = to_span(inserted);
}
function effacer(quoi='one') {
    let myreg = /((\d)|(sin\(\d*\))|(\s*[*/\-+]\s*)|(\))|(\())(?=\|)/;
    let to_put = document.querySelector("#afficheur #input");
    if(quoi=="one")
        inserted = inserted.replace(myreg, "").trim();
    else
        inserted = "|";
    to_put.innerHTML = to_span(inserted);
}

function calculer() {
    let output = document.querySelector("#output");
    let reponse = "";
    console.log(inserted);
    try {
        reponse = eval(inserted.replace("|", ""));
    } catch(e) {
        reponse = "Error"
    }
    output.textContent = reponse;
    inserted = "|";
}