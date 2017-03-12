
/*************************/
/* Fonctions principales */
/*************************/

function floatDecimalToBinaire()
{
    var floatDecimal = $("chiffreDecimal").value;
    var nBits = $("nbBits1").value;

    var signe = 0;
    var exposant = 0;
    var exposantBinaire;
    var mantisse;
    var mantisseBinaire;

    if (floatDecimal && nBits && nBits>0)
    {
        //Calcul du nombre de bits de l'exposant et de la mantisse
        var tailleExposant = calculTailleExposant(nBits);
        var tailleMantisse = nBits - tailleExposant - 1;

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
        $("resultatSigne").innerHTML = signe;
        $("resultatExposant").innerHTML = exposantBinaire;
        $("resultatMantisse").innerHTML = mantisseBinaire;
    }
}


function floatBinaireToDecimal()
{
    var nBits = $("nbBits2").value;
    var signeBinaire = $("signeBinaire").value;
    var exposantBinaire = $("exposantBinaire").value;
    var exposantTaille = calculTailleExposant(nBits);
    var exposantValeur;
    var mantisseBinaire = $("mantisseBinaire").value;
    var mantisseTaille = nBits - exposantTaille -1;
    var mantisseValeur;
    
    //calcul de la valeur de l'exposant et de la mantisse 
    exposantValeur = binaireToDecimal(exposantBinaire, exposantTaille)-(Math.pow(2, exposantTaille-1) - 1);
    mantisseValeur = binaireToDecimal(mantisseBinaire,mantisseTaille) / Math.pow(2,mantisseTaille)+1;
    
    //Calcul du résultat final
    var resultat = (-2 * signeBinaire +1) * Math.pow(2, exposantValeur) * mantisseValeur; // signe * 2^exposant * mantisse

    $("resultatFloat").innerHTML = resultat;
}

/*************************/
/* Fonctions secondaires */
/*************************/

function $(id) {
    return document.getElementById(id);
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
                tailleExposant = Math.round(4 * Math.log2(nBits)) - 13;
                break;
        }
    return tailleExposant;
}

function decimalToBinaire(nombreDecimal, nbBit)
{
    var nombreBinaire = "";
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
    var nombreDecimal = 0;
    for (let i = 0; i < nbBit; i++) {
        nombreDecimal += nombreBinaire[nbBit-i-1] * Math.pow(2, i);
    }
    return nombreDecimal;
}
