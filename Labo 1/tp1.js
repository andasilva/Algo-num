
/*************************/
/* Fonctions principales */
/*************************/

function floatDecimalToBinaire(nbBitsID, chiffreID, resultatSigneID, resultatExposantID, resultatMantisseID)
{
  let floatDecimal = $(nbBitsID).value;
  let nBits = $(chiffreID).value;

  let signe = 0;
  let exposant = 0;
  let exposantBinaire;
  let mantisse;
  let mantisseBinaire;

  if (floatDecimal && nBits) // Nombre dénormalisé pas traité...
  {
    if(nBits < 3){
      alert("Nombre de bits doit être supérieur ou égal 3");
      return;
    }
    //Calcul du nombre de bits de l'exposant et de la mantisse
    let tailleExposant = calculTailleExposant(nBits);
    let tailleMantisse = nBits - tailleExposant - 1;

    //Cas zero et infini
    if(floatDecimal === "0" || floatDecimal === "Infinity" || floatDecimal==="-Infinity"){
      $(resultatSigneID).innerHTML = "0";
      //SI -infini, signe -1
      if(floatDecimal == "-Infinity"){
        $(resultatSigneID).innerHTML = "1";
      }
      //Exposant
      let exposantFinal = "";
      for(let i = 0 ; i < tailleExposant; i++)
      {
        if(floatDecimal == "Infinity" || floatDecimal == "-Infinity"){
          exposantFinal += "1";
        }else{
          exposantFinal += "0";
        }
      }
      $(resultatExposantID).innerHTML = exposantFinal;

      //Mantisse
      let mantisseFinal = "";

      for(let i = 0 ; i < tailleMantisse; i++)
      {
        mantisseFinal += "0";
      }

      $(resultatMantisseID).innerHTML = mantisseFinal;
      return;
    }

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


function floatBinaireToDecimal(nbBitsID, signeID, exposantID, mantisseID, resultatID)
{
  //nbBits2, signeBinaire, exposantBinaire, mantisseBinaire, resultatFloat
  let nbBits = $(nbBitsID).value;
  let signeBinaire = $(signeID).value;
  let exposantBinaire = $(exposantID).value;
  let mantisseBinaire = $(mantisseID).value;

  let exposantTaille = calculTailleExposant(nbBits);
  let mantisseTaille = nbBits - exposantTaille - 1;
  //Cas spéciaux
  let specialDetected = true;
  let infinitDetected = true;
  for(let i =0 ; i<exposantTaille; i++){
    //Recherche de 1 dans l'exposant
    if(exposantBinaire[i] === '1'){
      specialDetected = false;
    }
    //Recherche de 0 dans l'exposant
    if(exposantBinaire[i] == '0'){
      infinitDetected = false;
    }
  }
  //Recherche de 1 dans la mantisseID
  for(let i =0 ; i<mantisseTaille; i++){
    //Recherche de 1 dans l'exposant
    if(mantisseBinaire[i] === '1'){
      specialDetected = false;
      infinitDetected = false;
    }
  }

  //On met à jours les champs
  if(infinitDetected){
    if(signeBinaire === '0'){
      $(resultatID).innerHTML = 'Infinity';
    }else{
      $(resultatID).innerHTML = '-Infinity';
    }
    return ;
  }
  if(specialDetected){
    $(resultatID).innerHTML = 0;
    return;
  }

  $(exposantID).value = $(exposantID).value.slice(0, exposantTaille - $(exposantID.length));
  $(mantisseID).value = $(mantisseID).value.slice(0, mantisseTaille - $(mantisseID.length));
  $(exposantID).setAttribute("maxlength", exposantTaille);
  $(mantisseID).setAttribute("maxlength", mantisseTaille);

  //Vérification de la saisie de tout les champs
  if (nbBits && nbBits > 0 && signeBinaire && exposantBinaire && mantisseBinaire) {
    //affichage du résultat
    $(resultatID).innerHTML = convertBinaryToFloat(signeBinaire, exposantBinaire, exposantTaille, mantisseBinaire, mantisseTaille);
  }
}

function add() {
  //Infos Chiffre 1
  let binaireExposant1 = $("exposantBinaire1").value;
  let tailleExposant1 = calculTailleExposant('32');
  let binaireMantisse1 = "1" + $("mantisseBinaire1").value;
  let tailleMantisse1 = 32 - tailleExposant1 - 1;

  //Infos Chiffre 2
  let binaireExposant2 = $("exposantBinaire2").value;
  let tailleExposant2 = calculTailleExposant('32');
  let binaireMantisse2 = "1" + $("mantisseBinaire2").value;

  //Calcul de la valeur des deux exposants
  let valeurExposant1 = binaireToDecimal(binaireExposant1, tailleExposant1) - (Math.pow(2, tailleExposant1 - 1) - 1);
  let valeurExposant2 = binaireToDecimal(binaireExposant2, tailleExposant2) - (Math.pow(2, tailleExposant2 - 1) - 1);

  //On prend l'exposant le plus petit et on la ramnène a la même taille que l'autre
  if (valeurExposant1 < valeurExposant2) {
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
  //alert(binaireMantisse1 +"\n"+binaireMantisse2 );
  let mantisseResultat = addTwoBinaryNumber(binaireMantisse1, binaireMantisse2);

  //On test si la mantisse à toujours la même taille que départ... sinon c'est qu'il y a un bit excédentaire apparu lors de l'adition
  while(mantisseResultat.length > binaireMantisse1.length){
    mantisseResultat = deleteExcedant(mantisseResultat);
  }

  alert(mantisseResultat);


  //Calcul de la mantisse
  mantisseResultat = mantisseResultat.slice(1);

  //On affiche le resultat
  $("ResultatAddition").innerHTML = convertBinaryToFloat(0, exposantPlusGrand, tailleExposant1, mantisseResultat, tailleMantisse1);
}


/*************************/
/* Fonctions secondaires */
/*************************/

function deleteExcedant(binaryNumber){
  //Si le dernier bit est à 0. alors on le supprime. De même si dernier vaut 1 et l'avant dernier 0
  if(binaryNumber[binaryNumber.length-1] === '0' || ((binaryNumber[binaryNumber.length-1] ==='1') &&  binaryNumber[binaryNumber.length-2] ==='0')){
    return binaryNumber.slice(0,-1);
  }else{ //Si le dernier bit est à 1 et que ceux d'avant aussi alors on arrondie vers le haut
  binaryNumber = addTwoBinaryNumber(binaryNumber,"1");
}
}

function addTwoBinaryNumber(binaryNumber1, binaryNumber2) {
  let retenu = 0;
  let resultat = "";
  let addition;

  let plusGrandNombreBinaire;
  let plusPetitNombreBinaire;

  if (binaryNumber1 > binaryNumber2) {
    plusGrandNombreBinaire = binaryNumber1;
    plusPetitNombreBinaire = binaryNumber2;
  } else {
    plusPetitNombreBinaire = binaryNumber1;
    plusGrandNombreBinaire = binaryNumber2;
  }


  for (let i = 0; i < plusGrandNombreBinaire.length; i++) {
    if (i <= plusPetitNombreBinaire.length - 1) {
      addition = retenu + parseInt(plusGrandNombreBinaire[plusGrandNombreBinaire.length - i - 1 ]) + parseInt(plusPetitNombreBinaire[plusPetitNombreBinaire.length - i - 1]);
    } else {
      addition = retenu + parseInt(plusGrandNombreBinaire[plusGrandNombreBinaire.length - i - 1 ]);
    }


    //alert(addition);
    switch (addition) {
      case 0:
      resultat = "0" + resultat;
      retenu = 0;
      break;
      case 1:
      resultat = "1" + resultat;
      retenu = 0;
      break;
      case 2:
      resultat = "0" + resultat;
      retenu = 1;
      break;
      case 3:
      resultat = "1" + resultat;
      retenu = 1;
      break;
      default:
    }
  }
  if (retenu === 1) {
    resultat = "1" + resultat;
    console.log("Reste retenu");
  }

  return resultat;
}


function $(id) {
  return document.getElementById(id);
}


function convertBinaryToFloat(signeBinaire, exposantBinaire, exposantTaille, mantisseBinaire, mantisseTaille) {
  //calcul de la valeur de l'exposant et de la mantisse
  let exposantValeur = binaireToDecimal(exposantBinaire, exposantTaille) - (Math.pow(2, exposantTaille - 1) - 1);
  let mantisseValeur = (binaireToDecimal(mantisseBinaire, mantisseTaille) + Math.pow(2, mantisseTaille)) / Math.pow(2, mantisseTaille);// (valeur de la mantisse + valeur du bit caché / 2^taille de la mantisse)

  //Calcul du résultat final
  let resultat = (-2 * signeBinaire + 1) * Math.pow(2, exposantValeur) * mantisseValeur; // signe * 2^exposant * mantisse
  return resultat;
}

function calculTailleExposant(numberOfBits) {
  let tailleExposant;
  if(numberOfBits<16 && numberOfBits>=3){
    tailleExposant = Math.round(numberOfBits/3);
  }else if(numberOfBits > 15){
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
    nombreDecimal += nombreBinaire[nbBit - i - 1] * Math.pow(2, i);
  }
  return nombreDecimal;
}
