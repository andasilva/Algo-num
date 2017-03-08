
function DisplayNumberToBinary(numberID, locationBinaryID) {
    var number = document.getElementById(numberID).value;
    var numberOfBits = document.getElementById(locationBinaryID).getElementsByTagName('input').length;
    var numberOfBitsNecessary = Math.floor(Math.log(number) / Math.log(2)) + 1;  //Math.floor (arrondi vers le bas) et Math.ceil (arrondi vers le haut)

    if (number > 0) {
        if (numberOfBitsNecessary > numberOfBits) {
            for (var i = 0; i < numberOfBitsNecessary - numberOfBits; i++) {
                addByte(locationBinaryID, numberID);
            }
        } else if (numberOfBitsNecessary < numberOfBits) {
            for (var i = 0; i < numberOfBits - numberOfBitsNecessary; i++) {
                removeByte(locationBinaryID);
            }
        }
        updateBinaryFromNumber(number, locationBinaryID);
    } else if (number < 0) {
        //Cocher la case négatif
        document.getElementById('negatifValue1').getElementsByClassName('negatif')[0].checked = true;
    }
}

function updateNumberFromBinary(numberBinaryID, locationNumberID) { //number: binary number locationID; location: id de l'input du nombre
    var value = 0;
    for (var i = 0; i < document.getElementById(numberBinaryID).getElementsByTagName('input').length; i++) {
        if (document.getElementById(numberBinaryID).getElementsByClassName('bit' + i)[0].checked) {
            value += Math.pow(2, i);
        }
    }
    document.getElementById(locationNumberID).value = value;
}

function updateBinaryFromNumber(number, location) { //number : le nombre à convertir et location: emplacement du nombre bnaire.
    for (var i = 0; i < Math.floor(Math.log(number) / Math.log(2)) + 1; i++) {
        if (number & Math.pow(2, i)) {
            document.getElementById(location).getElementsByClassName('bit' + i)[0].checked = true;
        } else {
            document.getElementById(location).getElementsByClassName('bit' + i)[0].checked = false;
        }
    }
}

function removeByte(locationBinaryID) {
    var list = document.getElementById(locationBinaryID).getElementsByTagName('input');
    document.getElementById(locationBinaryID).removeChild(list[0]);
}

function addByte(locationBinaryID, locationNumberID) {
    var numberOfBits = document.getElementById(locationBinaryID).getElementsByTagName('input').length;
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "bit" + numberOfBits;
    checkbox.className = "bit" + numberOfBits;
    checkbox.setAttribute("onchange", "updateNumberFromBinary('" + locationBinaryID + "','" + locationNumberID + "')");
    var list = document.getElementById(locationBinaryID); //.appendChild(checkbox) permet de mettre au début
    list.insertBefore(checkbox, list.childNodes[0]);
}


function addTwoBinaryNumber(locationBinaryID1, locationBinaryID2, locationReponseBinary, locationReponse) {
    //on clean d'abord l'ancienne réponse
    clearBinary('reponseBinaire', 'reponse');

    //Et on calcule
    var retenu = 0;
    var value1;
    var value2;
    var tailleBinary1 = document.getElementById(locationBinaryID1).getElementsByTagName('input').length;
    var tailleBinary2 = document.getElementById(locationBinaryID2).getElementsByTagName('input').length;
    for (var i = 0; i < Math.max(tailleBinary1, tailleBinary2) + 1; i++) {
        addByte(locationReponseBinary, locationReponse);
        if (i < tailleBinary1) {
            if (document.getElementById(locationBinaryID1).getElementsByClassName('bit' + i)[0].checked) {
                value1 = 1;
            } else {
                value1 = 0;
            }
        } else {
            value1 = 0;
        }
        if (i < tailleBinary2) {
            if (document.getElementById(locationBinaryID2).getElementsByClassName('bit' + i)[0].checked) {
                value2 = 1;
            } else {
                value2 = 0;
            }
        } else {
            value2 = 0;
        }

        var result = value1 + value2 + retenu;

        switch (result) {
            case 0:
                retenu = 0;
                break;
            case 1:
                document.getElementById(locationReponseBinary).getElementsByClassName('bit' + i)[0].checked = true;
                retenu = 0;
                break;
            case 2:
                retenu = 1;
                break;
            default: //cas 3
                document.getElementById(locationReponseBinary).getElementsByClassName('bit' + i)[0].checked = true;
                retenu = 1;
                break;
        }
    }
    updateNumberFromBinary(locationReponseBinary, locationReponse);
}



function clearBinary(locationBinaryID, locationDecimalID) {
    document.getElementById(locationBinaryID).innerHTML = "";
    updateNumberFromBinary(locationBinaryID, locationDecimalID);
}
