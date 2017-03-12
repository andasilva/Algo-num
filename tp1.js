
//Fonction qui abrège document.getElementById
function $(id){
  return document.getElementById(id);
}

function floatDecimalToBinaire()
{
  var nombreDecimal=$("chiffreDecimal").value;
  var nBits=$("nbBits").value;
  var signe=0;
  var exposant=0;
  var exposantBinaire;
  var mantisseBinaire;

  if(nombreDecimal&&nBits)
  {
    var exposantTaille=0;
    var bitTemp=nBits;
    while(bitTemp>=2)
    {
      bitTemp=bitTemp/2;
      exposantTaille++;
    }
    exposantTaille=exposantTaille-3;

    var tailleExposant=exposantTaille*3+2;
    var tailleMantisse=nBits-tailleExposant-1;

    if(nombreDecimal<0)
    {
      signe=1;
      nombreDecimal=(-nombreDecimal);
    }
    while(nombreDecimal<1)
    {
      nombreDecimal=nombreDecimal*2;
      exposant--;
    }
    while(nombreDecimal>=2)
    {
      nombreDecimal=nombreDecimal/2;
      exposant++;
    }

    exposant=exposant+Math.pow(2,tailleExposant-1)-1;

    exposantBinaire=decimalToBinaire(exposant,tailleExposant);

    nombreDecimal=nombreDecimal*Math.pow(2,tailleMantisse);
    nombreDecimal=nombreDecimal-Math.pow(2,tailleMantisse);
    mantisseBinaire=decimalToBinaire(nombreDecimal,tailleMantisse);

    $("signeBinaire").size=1;
    $("exposantBinaire").size=tailleExposant;
    $("mantisseBinaire").size=tailleMantisse;

    $("signeBinaire").value=signe;
    $("exposantBinaire").value=exposantBinaire;
    $("mantisseBinaire").value=mantisseBinaire;
  }

}

function floatBinaireToDecimal()
{
  var nBits=$("nbBits").value;
  var exposantTaille=0;
  var bitTemp=nBits;


  while(bitTemp>=2)
  {
    bitTemp=bitTemp/2;
    exposantTaille++;
  }
  exposantTaille=exposantTaille-3;

  var tailleExposant=exposantTaille*3+2;
  var tailleMantisse=nBits-tailleExposant-1;

  var nombreDecimal;
  var signeBinaire=$("signeBinaire").value;
  var exposantBinaire=$("exposantBinaire").value;
  var mantisseBinaire=$("mantisseBinaire").value;

  var exposantDecimal=binaireToDecimal(exposantBinaire,tailleExposant);
  var mantisseDecimal=binaireToDecimal(mantisseBinaire,tailleMantisse);

  mantisseDecimal=mantisseDecimal+Math.pow(2,tailleMantisse);
  mantisseDecimal=mantisseDecimal/Math.pow(2,tailleMantisse);

  exposantDecimal=exposantDecimal-(Math.pow(2,tailleExposant-1)-1);

  nombreDecimal=Math.pow(2,exposantDecimal)*mantisseDecimal;

  if(signeBinaire=="1")
  {
    nombreDecimal=(-nombreDecimal);
  }

  $("chiffreDecimal").value=nombreDecimal;



}

function decimalToBinaire(nombreDecimal, nbBit)
{
  var nombreBinaire="";
  for (let i = 0; i < nbBit; i++) {
    if (nombreDecimal & Math.pow(2, i)) {
      nombreBinaire="1" + nombreBinaire;
    } else {
      nombreBinaire="0" + nombreBinaire;
    }
  }
  return nombreBinaire;
}

function binaireToDecimal(nombreBinaire, nbBit)
{
  var nombreDecimal=0;
  for(let i = 0; i < nbBit ; i++){
    nombreDecimal += nombreBinaire[i]*Math.pow(2,i);
  }
  return nombreDecimal;

}
