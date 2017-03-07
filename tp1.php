<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>TP 1 Algo</title>
  </head>
  <body>
    <script src="tp1.js"></script>
    <h1>Codage et décodage binaire</h1>
      <h2>Pré-labo</h2>
      <form >
        1er nombre: <input type="number" name="nbr1Decimal" id="nbr1Decimal" onchange="DisplayNumberToBinary('nbr1Decimal','nbr1Binaire')"><br>
        en binaire: <span id="nbr1Binaire"><input type="checkbox" name="bit0" class="bit0" value="bit0" onchange="convertBinaryIntoNumber('nbr1Binaire','nbr1Decimal')"></span><br>
        <button type="button" onclick="addByte('nbr1Binaire')"> Add byte</button><br>
        2ème nombre: <input type="number" name="nbr2Decimal" id="nbr2Decimal" onchange="DisplayNumberToBinary('nbr2Decimal','nbr2Binaire')"><br>
        en binaire: <span id="nbr2Binaire"><input type="checkbox" name="bit0" class="bit0" value="bit0"></span><br>
        <button type="button" onclick="addByte('nbr2Binaire')"> Add byte</button><br><br> 
        <input type="submit" name="add" value="Addition">
        <input type="submit" name="add" value="Soustraction">
        <input type="submit" name="add" value="Multiplication">
      </form>
      Résultat:
      <h2>Labo</h2>
    <!-- A faire -->
  </body>
</html>
