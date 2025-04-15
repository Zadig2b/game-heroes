# projet:

création d'un jeu de combat tour par tour en html/css/javascript

requis: POO 

## éléments:

### 1 fichier main.js

responsable de la logique page d'accueil et lancement du jeu

### 1 fichier game.js

responsable de la logique du jeu (jeu de role tour par tour style pokémon)

### 1 fichier: characters.js

représentation des personnages jouables sous forme de classes/objet

chaque personnage a 4 sorts spéciaux et un style de combat qui lui est propre.

#### les personnes ont les propriétés suivantes:

# agilité:

permet d'éviter les attaques: on définit une valeur entre 0 et 100 ou 0= aucun évitement et 100 : 100% d'évitement

# force:

augmente les dégats des attaques d'un certain pourcentage: 0 force = 0% d'augmentation et 100 force: 100% augmentation de dégats

# défense:

permet de réduire l'impact des attaques reçues: taux de réduction. à 100%, aucun dégat reçu. ex: si attaque.value = 50 et ma défense est 50 je reçois 25 dégats

#### les sorts prennent plusieurs propriétés (cooldown, type): communes à tous les sorts

- type: représente le type de sort

  - attaque (inflige des dégâts à l'adversaire)
    prend propriétés supplémentaire:
    - "value" représentant les dégats infligés à l'adversaire;
  - bouclier (protège des dégâts en absorbant les dégâts infligés par l'adversaire (cumulable et non périssable))
    prend propriété supplémentaire:
    - "value" représentant les dégâts absorbés par le bouclier
  - malus (diminue une caractéristique de l'adversaire: sa force, son agilité, ou sa défense pendant un nb de tour défini)
    (par ex: empeche l'adversaire d'éviter les attaques pendant un nb de tour défini: on passe l'agilité adverse à zéro)

  - bonus (augmente une caractéristique du joueur: sa force, son agilité, ou sa défense pendant un nb de tour défini)

# Sorts des personnages:

## styleDom:

    type:  malus (agilité adverse à zéro)

    CD:  3tours de cooldown: peut etre lancé de nouveau dans 3 tours

    description:  l'adversaire se transforme en élément position sticky: il ne peut pas éviter les 2 prochaines attaques.

## camouflage de superCss:

type: bonus (agilité joueur à 100)
CD: 2 tours
description: rend innateignable pendant 1 tour

## responsiveAura:

type: bonus
CD: 3 tours
description: 50% de chance d'éviter les attaques pendant 3 tours

## grille magique:

type: attaque
value: 80 (inflige 80 dégâts à l'adversaire)
sideEffect:
inflige 50% de dégats supplémentaires aux adversaires touchés par styleDom

## userStory:

au lancement du jeu, chaque joueur rentre son pseudo et choisit son personnage.
une fois cette étape réalisée, on rentre dans le jeu en changenant de page, on passe de main à game.

## déroulement des combats

Les combats se déroulent au tour par tour:
le 1er joueur est définit aléatoirement
chaque joueur peut lancer un sort par tour.
une fois que le sort est lancé et l'animation faites (effets css avec des keyframes)
on passe le tour au joueur suivant
pour vaincre le joueur adverse, le joueur doit faire tomber ses points de vie à zéro

# UX/UI:

on affiche l'image du héros et le pseudo choisit en bas de page pour indiquer quel joueur doit joueur

en personnages jouables on a : SuperCss superHtml, DarkJs et LordPython

# Caractéristiques de base des héros:

SuperCss:
50 agilité
25 force
25 défentse

SuperHtml:
30 agilité
30 force
40 défense

DarkJs:
40 agilité
50 force
10 défense

LordPython:
10 agilité
80 force
10 défense
