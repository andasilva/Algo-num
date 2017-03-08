
//Fonction qui abrège document.getElementById
function $(id){
  return document.getElementById(id);
}

function floatDecimalToBinaire()
{
	var nombreDecimal=document.getElementById("chiffreDecimal").value;
	var nBits=document.getElementById("nbBits").value;
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
		
		document.getElementById("signeBinaire").size=1;
		document.getElementById("exposantBinaire").size=tailleExposant;
		document.getElementById("mantisseBinaire").size=tailleMantisse;
		
		document.getElementById("signeBinaire").value=signe;
		document.getElementById("exposantBinaire").value=exposantBinaire;
		document.getElementById("mantisseBinaire").value=mantisseBinaire;
	}
}

function decimalToBinaire(nombreDecimal, nbBit)
{
	var nombreBinaire="";
	for(var i=nbBit-1;i>=0;i=i-1)
	{
		var puissanceDe2=Math.pow(2,i);
		if(puissanceDe2<=nombreDecimal)
		{
			nombreBinaire=nombreBinaire+"1";
			nombreDecimal=nombreDecimal-puissanceDe2;
		}
		else
		{
			nombreBinaire=nombreBinaire+"0";
		}
	}
	return nombreBinaire;
}