let count = 0
const myBtn = document.getElementById('myBtn') ;
const cntClic = document.getElementById('cntClic')

// Consigne : Utilisez un « addEventListener » sur « myBtn » pour développer la fonction. Ajoutez un « console.log » sur « nbClic » dans la fonction afin de pouvoir contrôler le résultat dans la console.
myBtn.addEventListener('click', function() {
    count++
    cntClic.innerHTML = count
    console.log(count)
})

// Objectif : À chaque clic de l'utilisateur sur le bouton « btn-flip », le contenu de la div « result-flip » affiche aléatoirement soit « Heads », soit « Tails ».
const btnFlip = document.getElementById('btn-flip')
const resultFlip = document.getElementById('result-flip')
const heads = 'Heads'
const tails = 'Tails'
const tab = [heads, tails]
btnFlip.addEventListener('click', function() {
    TailsorHeads()
})

function TailsorHeads(){
    let subrandom= Math.random() * tab.length
    let random = Math.floor(subrandom)
    console.log("subrandom", subrandom);
    console.log("random", random)
    console.log("tab", tab[random])
    resultFlip.innerHTML = tab[random]
}

//Objectif : Lorsque l'utilisateur entre un mot de passe, il est masqué par défaut. L'idée est de lui proposer une option pour afficher/masquer son mot de passe.

const input = document.getElementById('input'); 
const display = document.getElementById('display'); 
const checkbox = document.getElementById('checkbox') ;

checkbox.addEventListener('click', function() {
    if (checkbox.checked) {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
});

//Objectif : Lorsque l'utilisateur re-tape son mot de passe au moment d’une l'inscription, le script indique si les deux mots de passe saisis se correspondent.
let password = document.getElementById("password") ;
let checkPassword = document.getElementById("check-password") ;
let alertmsg = document.getElementById("message") ;

checkPassword.addEventListener('keyup', function() {
    if (password.value === checkPassword.value) {
        alertmsg.innerHTML = "Les mots de passe correspondent";
        alertmsg.style.color = "green";
    } else {
        alertmsg.innerHTML = "Les mots de passe ne correspondent pas";
        alertmsg.style.color = "red";
    }
});

//[5] Calcul de distance
// Objectif : Ecrire un programme qui, connaissant un ensemble de villes et la distance les séparant d'un point de référence, soit capable de dire, après que l'utilisateur ait saisi une distance parcourue depuis le point de référence, quelles villes auraient pu être atteintes.
let villes = ["Bordeaux", "Nantes", "Lyon", "Marseille", "Monptellier","Paris","Rennes","Strasbourg"]; 
let distance = [950,850,450,800,1000,460,840,0];
let distanceParcourue = document.getElementById("check-distance");
let btnDistance = document.getElementById("btn-distance");
let resultDistance = document.getElementById("result-distance");

btnDistance.addEventListener('click', function() {
    let distanceParcourueValue = distanceParcourue.value;
    let distanceParcourueValueInt = parseInt(distanceParcourueValue);
    let villesAtteintes = [];
    for (let i = 0; i < distance.length; i++) {
        if (distance[i] <= distanceParcourueValueInt) {
            villesAtteintes.push(villes[i]);
        }
    }
    resultDistance.innerHTML = "Villes atteintes : " + villesAtteintes.join(", ");
});


// [6] Convertisseur d'unités de temps
// Objectif : L'utilisateur entre un nombre d'années, le script convertit ce nombre en secondes, en minutes, en heures et en nombre de jours.

let convert = document.getElementById("convert") ;
let resultSeconds = document.getElementById("resultSeconds"); 
let resultMinutes = document.getElementById("resultMinutes");
let resultHours = document.getElementById("resultHours");
let resultDays = document.getElementById("resultDays");

const secondsInMinute = 60;
const minutesInHour = 60;
const hoursInDay = 24;
const daysInYear = 365;

convert.addEventListener("click", () => {
let numberOfYears = document.getElementById("numberOfYears").value ;
// Votre code ici
let numberOfSeconds = numberOfYears * daysInYear * hoursInDay * minutesInHour * secondsInMinute;
let numberOfMinutes = numberOfSeconds /secondsInMinute;
let numberOfHours = numberOfMinutes / minutesInHour;
let numberOfDays = numberOfHours / hoursInDay;

resultSeconds.innerHTML = numberOfSeconds + " secondes";
resultMinutes.innerHTML = numberOfMinutes + " minutes";
resultHours.innerHTML = numberOfHours + " heures";
resultDays.innerHTML = numberOfDays + " jours";
});

// [7] Roue de chargement
// Objectif : Au lancement de la page, une roue de chargement tourne durant 3 secondes avant de disparaître pour laisser la place au contenu de la page.

let loading = document.getElementById("loadingAnimation") ;
let content = document.getElementById("displayContent") ;
setTimeout(() => {
    loading.style.display = "none";
    content.style.display = "block";
}, 3000);