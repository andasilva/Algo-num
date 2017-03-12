<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>TP 1 Algo</title>
</head>
<body>
  <script src="tp1.js"></script>
  <script src="tp1-prelabo.js"></script>
  <h1>Codage et décodage binaire</h1>
  <h2>Pré-labo</h2>
  <!--
  <form action="javascript:void(0)">
  1er nombre: <input type="number" name="nbr1Decimal" value="0" id="nbr1Decimal"
  onchange="DisplayNumberToBinary('nbr1Decimal', 'nbr1Binaire')"><br>
  <span id="negatifValue1">
  négatif: <input type="checkbox" name="negatif" class="negatif" ><br>
</span>
en binaire:
<span id="nbr1Binaire">
<input type="checkbox" name="bit0" class="bit0" value="bit0" onchange="updateNumberFromBinary('nbr1Binaire', 'nbr1Decimal')">
</span><br>
<button type="button" onclick="addByte('nbr1Binaire', 'nbr1Decimal')"> ajouter un byte</button><br>

2ème nombre: <input type="number" name="nbr2Decimal" id="nbr2Decimal" value="0" onchange="DisplayNumberToBinary('nbr2Decimal', 'nbr2Binaire')"><br>
en binaire: <span id="nbr2Binaire"><input type="checkbox" name="bit0" class="bit0" value="bit0" onchange="updateNumberFromBinary('nbr2Binaire', 'nbr2Decimal')"></span><br>
<button type="button" onclick="addByte('nbr2Binaire', 'nbr2Decimal')"> Ajouter un byte</button><br><br>

<input type="submit" name="add" value="Addition" onclick="addTwoBinaryNumber('nbr1Binaire', 'nbr2Binaire','reponseBinaire','reponse')">
<input type="submit" name="add" value="Soustraction">
<input type="submit" name="add" value="Multiplication">
<br>
Résultat:
<input type="number" name="reponse" id="reponse"><br>
<br>en binaire:
<span id="reponseBinaire">

</span>
</form>
-->
<h2>Labo</h2>
<form action="javascript:void(0)">
  Nombre de bits : <input type="text" value="32" name="nbBits" class="nbBits" id="nbBits" onchange="floatDecimalToBinaire()" />
  <br/>
  Chiffre à convertir: <input type="text" name="chiffreDecimal" class="chiffreDecimal" id="chiffreDecimal" onchange="floatDecimalToBinaire()"/>
  <br/>
  <input type="text" maxlength="1" name="signeBinaire" class="signeBinaire"  id="signeBinaire" onchange="floatBinaireToDecimal()"/>
  <input type="text" name="exposantBinaire" class="exposantBinaire"  id="exposantBinaire" onchange="floatBinaireToDecimal()"/>
  <input type="text" name="mantisseBinaire" class="mantisseBinaire"  id="mantisseBinaire" onchange="floatBinaireToDecimal()"/>
</form>
</body>
</html>
