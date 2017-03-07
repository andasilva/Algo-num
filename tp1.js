
function DisplayNumberToBinary(numberID,locationBinaryID){
    var number = document.getElementById(numberID).value;
    var numberOfBits = document.getElementById(locationBinaryID).getElementsByTagName('input').length;

    var numberOfBitsNecessary = Math.floor(Math.log(number) / Math.log(2)) + 1;  //Math.floor (arrondi vers le bas) et Math.ceil (arrondi vers le haut)
    //TODO: Traiter quand chiffre vaut zéro ou négatif
    if (numberOfBitsNecessary > numberOfBits) {
        for (var i = 0; i < numberOfBitsNecessary - numberOfBits; i++) {
            addByte(locationBinaryID);
        }
    } else if (numberOfBitsNecessary < numberOfBits) {
        for (var i = 0; i < numberOfBits - numberOfBitsNecessary; i++) {
            removeByte(locationBinaryID);
        }
    }
    convertNumberIntoBinary(number,locationBinaryID);
}

function convertBinaryIntoNumber(numberBinaryID, locationNumberID){ //number: binary number locationID; location: id de l'input du nombre
    var value = 0;
    for(var i = 0; i < document.getElementById(numberBinaryID).getElementsByTagName('input').length; i++){
       if(document.getElementById(numberBinaryID).getElementsByClassName('bit'+i)[0].checked){
           value += Math.pow(2,i);
       }
    }
    
    //TODO set value in locationNumberID
    document.getElementById(locationNumberID).value = value;
}

function convertNumberIntoBinary(number, location) { //number : le nombre à convertir et location: emplacement du nombre bnaire.
    for (var i = 0; i < Math.floor(Math.log(number) / Math.log(2)) + 1; i++) {
        if (number & Math.pow(2,i)) {
            document.getElementById(location).getElementsByClassName('bit'+i)[0].checked = true;
        } else {
            document.getElementById(location).getElementsByClassName('bit'+i)[0].checked = false;
        }
    }
}

function removeByte(location) {
    var list = document.getElementById(location).getElementsByTagName('input');
    document.getElementById(location).removeChild(list[0]);
}

function addByte(location) {
    var numberOfBits = document.getElementById(location).getElementsByTagName('input').length;
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "bit" + numberOfBits;
    checkbox.className = "bit" + numberOfBits;
    //checkbox.onchange = convertBinaryIntoNumber(location,'');
    var list = document.getElementById(location); //.appendChild(checkbox) permet de mettre au début
    list.insertBefore(checkbox, list.childNodes[0]);
}


