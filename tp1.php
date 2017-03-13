<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>TP 1 Algo</title>
</head>
<body>
  <script src="tp1.js"></script>
  <script src="tp1-prelabo.js"></script>
  <h1>Codage et décodage binaire (IEEE 754)</h1>

  <!--
  <h2>Pré-labo</h2>
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
<h2>Conversion</h2>
<form action="javascript:void(0)">
  <table border="1" width="100%">
    <thead>
      <tr>
        <th colspan="2" width="50%">Float en Binaire</th>
        <th colspan="2" width="50%">Binaire en Float</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td width="25%">Nombre de bits</td>
        <td><input type="text" value="32" name="nbBits" id="nbBits1" onchange="floatDecimalToBinaire('chiffreDecimal','nbBits1','resultatSigne', 'resultatExposant', 'resultatMantisse')" /></td>
        <td width="25%">Nombre de bits</td>
        <td><input type="text" value="32" name="nbBits" id="nbBits2" onchange="floatBinaireToDecimal('nbBits2','signeBinaire','exposantBinaire','mantisseBinaire','resultatFloat')" /></td>
      </tr>
      <tr>
        <td>Chiffre à convertir</td>
        <td><input type="text" name="chiffreDecimal" id="chiffreDecimal" onchange="floatDecimalToBinaire('chiffreDecimal','nbBits1','resultatSigne', 'resultatExposant', 'resultatMantisse')"/></td>
        <td>Valeur Binaire à convertir</td>
        <td>
          <input type="text" maxlength="1" name="signeBinaire"  id="signeBinaire" onchange="floatBinaireToDecimal('nbBits2','signeBinaire','exposantBinaire','mantisseBinaire','resultatFloat')"/>
          <input type="text" maxlength="8" name="exposantBinaire"  id="exposantBinaire" onchange="floatBinaireToDecimal('nbBits2','signeBinaire','exposantBinaire','mantisseBinaire','resultatFloat')"/>
          <input width="100%"  type="text" maxlength="23" name="mantisseBinaire"  id="mantisseBinaire" onchange="floatBinaireToDecimal('nbBits2','signeBinaire','exposantBinaire','mantisseBinaire','resultatFloat')"/>
        </td>
      </tr>
      <tr>
        <td width="25%">Résultat:</td>
        <td>
          <span id="resultatSigne"></span>
          <span id="resultatExposant"></span>
          <span id="resultatMantisse"></span>
        </td>
        <td>Résultat</td>
        <td>
          <div id="resultatFloat"></div>
        </td>
      </tr>
    </tbody>
  </table>
</form>
<h2>Addition</h2>
<form action="javascript:void(0)">
  <table border="1">
    <thead>
      <tr>
        <th colspan="2"> 1er nombre</th>
        <th colspan="2">2ème nombre</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Signe</td>
        <td><input type="text" maxlength="1" name="signeBinaire"   id="signeBinaire1" onchange=""/></td>
        <td>Signe</td>
        <td><input type="text" maxlength="1" name="signeBinaire"  id="signeBinaire2" onchange=""/></td>
      </tr>
      <tr>
        <td>Exposant</td>
        <td><input type="text" maxlength="8" name="exposantBinaire"   id="exposantBinaire1" onchange=""/></td>
        <td>Exposant</td>
        <td><input type="text" maxlength="8" name="exposantBinaire"   id="exposantBinaire2" onchange=""/></td>
      </tr>
      <tr>
        <td>Mantisse</td>
        <td><input width="100%"  type="text" maxlength="23" name="mantisseBinaire"   id="mantisseBinaire1" onchange=""/></td>
        <td>Mantisse</td>
        <td><input width="100%"  type="text" maxlength="23" name="mantisseBinaire"   id="mantisseBinaire2" onchange=""/></td>
      </tr>
      <tr>
        <td>Chiffre:</td>
        <td></td>
        <td>Chiffre:</td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <input type="button" name="additioner" id="additioner" value="Aditionner" onclick="add()">
</form>


<footer>
  Labo réalisé par: Jmaa Mohamed, Castella Killian, Neto da Silva André & Piquerez Thibaut
</footer>
</body>
</html>
