
/*************************/
/* Fonctions principales */
/*************************/

function floatDecimalToBinaire(nbBitsID,chiffreID,resultatSigneID, resultatExposantID, resultatMantisseID)
{
  //chiffreDecimal, nbBits1, resultatSigne, resultatExposant, resultatMantisse
  let floatDecimal = $(nbBitsID).value;
  let nBits = $(chiffreID).value;

  let signe = 0;
  let exposant = 0;
  let exposantBinaire;
  let mantisse;
  let mantisseBinaire;

  if (floatDecimal && nBits && nBits>0)
  {
    //Calcul du nombre de bits de l'exposant et de la mantisse
    let tailleExposant = calculTailleExposant(nBits);
    let tailleMantisse = nBits - tailleExposant - 1;

    //Valeur du signe
    if (floatDecimal < 0)
    {
      signe = 1;
      floatDecimal = (-floatDecimal);
    }
    //Calcul de la valeur de l'exposant
    while (floatDecimal < 1)
    {
      floatDecimal = floatDecimal * 2;
      exposant--;
    }
    while (floatDecimal >= 2)
    {
      floatDecimal = floatDecimal / 2;
      exposant++;
    }

    exposant += Math.pow(2, tailleExposant - 1) - 1;

    // convertion de l'exposant en binaire
    exposantBinaire = decimalToBinaire(exposant, tailleExposant);

    //Calcul de la mantisse
    mantisse = (floatDecimal - 1) * Math.pow(2, tailleMantisse);

    //Conversion de la mantisse en binaire
    mantisseBinaire = decimalToBinaire(mantisse, tailleMantisse);

    //Affichage des valeur
    $(resultatSigneID).innerHTML = signe;
    $(resultatExposantID).innerHTML = exposantBinaire;
    $(resultatMantisseID).innerHTML = mantisseBinaire;
  }
}


function floatBinaireToDecimal(nbBitsID,signeID,exposantID,mantisseID,resultatID)
{
  //nbBits2, signeBinaire, exposantBinaire, mantisseBinaire, resultatFloat
  let nbBits = $(nbBitsID).value;
  let signeBinaire = $(signeID).value;
  let exposantBinaire = $(exposantID).value;
  let mantisseBinaire = $(mantisseID).value;

  let exposantTaille = calculTailleExposant(nbBits);
  let mantisseTaille = nbBits - exposantTaille -1;

  //On met à jours les champs
  $(exposantID).value = $(exposantID).value.slice(0,exposantTaille-$(exposantID.length));
  $(mantisseID).value = $(mantisseID).value.slice(0,mantisseTaille-$(mantisseID.length));
  $(exposantID).setAttribute("maxlength", exposantTaille);
  $(mantisseID).setAttribute("maxlength", mantisseTaille);

  if(nbBits && nbBits>0 && signeBinaire && exposantBinaire && mantisseBinaire){
    //Calcul du résultat final
    let resultat = convertBinaryToFloat(signeBinaire,exposantBinaire,exposantTaille,mantisseBinaire, mantisseTaille);

    $(resultatID).innerHTML = resultat;
  }
}

function add() {
  //Infos Chiffre 1
  let binaireExposant1 = $("exposantBinaire1").value;
  let tailleExposant1 = calculTailleExposant('32');
  let binaireMantisse1 = "1"+$("mantisseBinaire1").value;
  let tailleMantisse1 = 32 - tailleExposant1 - 1;

  //Infos Chiffre 2
  let binaireExposant2 = $("exposantBinaire2").value;
  let tailleExposant2 = calculTailleExposant('32');
  let binaireMantisse2 = "1"+$("mantisseBinaire2").value;

  //Calcul de la valeur des deux exposants
  let valeurExposant1 = binaireToDecimal(binaireExposant1, tailleExposant1) - (Math.pow(2, tailleExposant1 - 1) - 1);
  let valeurExposant2 = binaireToDecimal(binaireExposant2, tailleExposant2) - (Math.pow(2, tailleExposant2 - 1) - 1);

  //On prend l'exposant le plus petit et on la ramnène a la même taille que l'autre
  if (valeurExposant1 < valeurExposant2){
    //On shiffte la mantisse du chiffre1
    for (let i = 0; i < Math.abs(valeurExposant1 - valeurExposant2); i++) {
      //On supprime le dernier bit
      binaireMantisse1 = binaireMantisse1.slice(0, -1);
      binaireMantisse1 = "0" + binaireMantisse1;
    }
  } else if (valeurExposant2 < valeurExposant1) {
    //On shiffte la mantisse du chiffre2
    for (let i = 0; i < Math.abs(valeurExposant1 - valeurExposant2); i++) {
      //On supprime le dernier bit
      binaireMantisse2 = binaireMantisse2.slice(0, -1);
      binaireMantisse2 = "0" + binaireMantisse2;
    }
  }

  //On aditionne les mantisses
  let retenu = 0;
  let mantisseResultat = "";
  let addition;

  for (let i = binaireMantisse1.length-1; i >= 0; i--) {
    addition = retenu + parseInt(binaireMantisse1[i]) + parseInt(binaireMantisse2[i]);

    //alert(addition);
    switch (addition) {
      case 0:
      mantisseResultat = "0" + mantisseResultat;
      retenu = 0;
      break;
      case 1:
      mantisseResultat = "1" + mantisseResultat;
      retenu = 0;
      break;
      case 2:
      mantisseResultat = "0" + mantisseResultat;
      retenu = 1;
      break;
      case 3:
      mantisseResultat = "1" + mantisseResultat;
      retenu = 1;
      break;
      default:
    }
  }

  //Choisir l'exposant le plus grand
  let exposantPlusGrand = valeurExposant1 > valeurExposant2 ? binaireExposant1 : binaireExposant2;

  if(retenu ===1){
    mantisseResultat = "1" + mantisseResultat;
    mantisseResultat = mantisseResultat.slice(0, -1);
    //A améliorer
    //exposantPlusGrand++;
    alert("Mmmmhhhh embetant");
  }


  //Calcul de la mantisse
  mantisseResultat = mantisseResultat.slice(1);
  //let valeurMantisseResultat = binaireToDecimal(mantisseResultat, tailleMantisse1) / Math.pow(2, tailleMantisse1);

  //On affiche le resultat
  //let resultat = Math.pow(2, exposantPlusGrand) * valeurMantisseResultat; // signe * 2^exposant * mantisse
  let resultat = convertBinaryToFloat(0,exposantPlusGrand,tailleExposant1,mantisseResultat, tailleMantisse1);
  $("ResultatAddition").innerHTML = resultat;
  alert(resultat);
}






/*************************/
/* Fonctions secondaires */
/*************************/

function $(id) {
  return document.getElementById(id);
}


function convertBinaryToFloat(signeBinaire,exposantBinaire,exposantTaille,mantisseBinaire, mantisseTaille){
  //calcul de la valeur de l'exposant et de la mantisse
  let exposantValeur = binaireToDecimal(exposantBinaire, exposantTaille)-(Math.pow(2, exposantTaille-1) - 1);
  let mantisseValeur = (binaireToDecimal(mantisseBinaire, mantisseTaille)+Math.pow(2,mantisseTaille)) / Math.pow(2,mantisseTaille);// (valeur de la mantisse + valeur du bit caché / 2^taille de la mantisse)

  //Calcul du résultat final
  let resultat = (-2 * signeBinaire +1) * Math.pow(2, exposantValeur) * mantisseValeur; // signe * 2^exposant * mantisse
  return resultat;
}

function calculTailleExposant(numberOfBits){
  let tailleExposant;
  switch (numberOfBits) {
    case '16':
    tailleExposant = 5;
    break;
    case '32':
    tailleExposant = 8;
    break;
    default:
    tailleExposant = Math.round(4 * Math.log2(numberOfBits)) - 13;
    break;
  }
  return tailleExposant;
}

function decimalToBinaire(nombreDecimal, nbBit)
{
  let nombreBinaire = "";
  for (let i = 0; i < nbBit; i++) {
    if (nombreDecimal & Math.pow(2, i)) {
      nombreBinaire = "1" + nombreBinaire;
    } else {
      nombreBinaire = "0" + nombreBinaire;
    }
  }
  return nombreBinaire;
}

function binaireToDecimal(nombreBinaire, nbBit)
{
  let nombreDecimal = 0;
  for (let i = 0; i < nbBit; i++) {
    nombreDecimal += nombreBinaire[nbBit-i-1] * Math.pow(2, i);
  }
  return nombreDecimal;
}
