
//Fonction qui abrège document.getElementById
function $(id) {
    return document.getElementById(id);
}

function floatDecimalToBinaire()
{
    var floatDecimal = $("chiffreDecimal").value;
    var nBits = $("nbBits").value;
    
    var signe = 0;
    var exposant = 0;
    var exposantBinaire;
    var mantisse;
    var mantisseBinaire;

    if (floatDecimal && nBits)
    {
        //Calcul du nombre de bits de l'exposant et de la mantisse
        var tailleExposant;
        switch (nBits) {
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
        mantisse = (nombreDecimal - 1) * Math.pow(2, tailleMantisse);

        //Conversion de la mantisse en binaire
        mantisseBinaire = decimalToBinaire(mantisse, tailleMantisse);

        //Affichage des valeur
        $("exposantBinaire").setAttribute('maxlength', tailleExposant);
        $("mantisseBinaire").setAttribute('maxlength', tailleMantisse);

        $("signeBinaire").value = signe;
        $("exposantBinaire").value = exposantBinaire;
        $("mantisseBinaire").value = mantisseBinaire;
    }

}


function floatBinaireToDecimal()
{
    var nBits = $("nbBits").value;
    var exposantTaille = 0;
    var bitTemp = nBits;


    while (bitTemp >= 2)
    {
        bitTemp = bitTemp / 2;
        exposantTaille++;
    }
    exposantTaille = exposantTaille - 3;

    var tailleExposant = exposantTaille * 3 + 2;
    var tailleMantisse = nBits - tailleExposant - 1;

    var nombreDecimal;
    var signeBinaire = $("signeBinaire").value;
    var exposantBinaire = $("exposantBinaire").value;
    var mantisseBinaire = $("mantisseBinaire").value;

    var exposantDecimal = binaireToDecimal(exposantBinaire, tailleExposant);
    var mantisseDecimal = binaireToDecimal(mantisseBinaire, tailleMantisse);

    mantisseDecimal = mantisseDecimal + Math.pow(2, tailleMantisse);
    mantisseDecimal = mantisseDecimal / Math.pow(2, tailleMantisse);

    exposantDecimal = exposantDecimal - (Math.pow(2, tailleExposant - 1) - 1);

    nombreDecimal = Math.pow(2, exposantDecimal) * mantisseDecimal;

    if (signeBinaire == "1")
    {
        nombreDecimal = (-nombreDecimal);
    }

    $("chiffreDecimal").value = nombreDecimal;



}

/**
 * Retourne un String contenant la valeur binaire d'un chiffre.
 * @param {int} nombreDecimal Le chiffre à convertir
 * @param {int} nbBit Le nombre de bits qui sera utilisé pour coder le chiffre
 * @returns {String} Le chiffre converti en decimal selon nbBit bits
 */
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
        nombreDecimal += nombreBinaire[i] * Math.pow(2, i);
    }
    return nombreDecimal;

}
