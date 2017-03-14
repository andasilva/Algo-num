<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>TP 1 Algo</title>
    </head>
    <body>
        <script src="tp1.js"></script>
        <h1>Codage et décodage binaire (IEEE 754)</h1>
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
                        <td><input type="text" value="32" name="nbBits" id="nbBits1" onchange="floatDecimalToBinaire('chiffreDecimal', 'nbBits1', 'resultatSigne', 'resultatExposant', 'resultatMantisse')" /></td>
                        <td width="25%">Nombre de bits</td>
                        <td><input type="text" value="32" name="nbBits" id="nbBits2" onchange="floatBinaireToDecimal('nbBits2', 'signeBinaire', 'exposantBinaire', 'mantisseBinaire', 'resultatFloat')" /></td>
                    </tr>
                    <tr>
                        <td>Chiffre à convertir</td>
                        <td><input type="text" name="chiffreDecimal" id="chiffreDecimal" onchange="floatDecimalToBinaire('chiffreDecimal', 'nbBits1', 'resultatSigne', 'resultatExposant', 'resultatMantisse')"/></td>
                        <td>Valeur Binaire à convertir</td>
                        <td>
                            Signe: <input type="text" maxlength="1" name="signeBinaire"  id="signeBinaire" onchange="floatBinaireToDecimal('nbBits2', 'signeBinaire', 'exposantBinaire', 'mantisseBinaire', 'resultatFloat')"/>
                            <br>Exposant:<input type="text" maxlength="8" name="exposantBinaire"  id="exposantBinaire" onchange="floatBinaireToDecimal('nbBits2', 'signeBinaire', 'exposantBinaire', 'mantisseBinaire', 'resultatFloat')"/>
                            <br>Mantisse:<input width="100%"  type="text" maxlength="23" name="mantisseBinaire"  id="mantisseBinaire" onchange="floatBinaireToDecimal('nbBits2', 'signeBinaire', 'exposantBinaire', 'mantisseBinaire', 'resultatFloat')"/>
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
        <h2>Addition binaire (32 bits)</h2>
        <form action="javascript:void(0)">
            <input type="hidden" id="nbBitsAddition" value="32">
            <table border="1" width="600px">
                <thead>
                    <tr>
                        <th colspan="2"> 1er nombre</th>
                        <th colspan="2">2ème nombre</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Signe</td>
                        <td width="50%"><input disabled value="0" type="text" maxlength="1" name="signeBinaire1"   id="signeBinaire1" onchange="floatBinaireToDecimal('nbBitsAddition', 'signeBinaire1', 'exposantBinaire1', 'mantisseBinaire1', 'chiffre1')"/></td>
                        <td>Signe</td>
                        <td width="50%"><input disabled type="text" value="0" maxlength="1" name="signeBinaire2"  id="signeBinaire2" onchange="floatBinaireToDecimal('nbBitsAddition', 'signeBinaire2', 'exposantBinaire2', 'mantisseBinaire2', 'chiffre2')"/></td>
                    </tr>
                    <tr>
                        <td>Exposant</td>
                        <td><input type="text" maxlength="8" name="exposantBinaire1"   id="exposantBinaire1" onchange="floatBinaireToDecimal('nbBitsAddition', 'signeBinaire1', 'exposantBinaire1', 'mantisseBinaire1', 'chiffre1')"/></td>
                        <td>Exposant</td>
                        <td><input type="text" maxlength="8" name="exposantBinaire2"   id="exposantBinaire2" onchange="floatBinaireToDecimal('nbBitsAddition', 'signeBinaire2', 'exposantBinaire2', 'mantisseBinaire2', 'chiffre2')"/></td>
                    </tr>
                    <tr>
                        <td>Mantisse</td>
                        <td><input width="100%"  type="text" maxlength="23" name="mantisseBinaire1"   id="mantisseBinaire1" onchange="floatBinaireToDecimal('nbBitsAddition', 'signeBinaire1', 'exposantBinaire1', 'mantisseBinaire1', 'chiffre1')"/></td>
                        <td>Mantisse</td>
                        <td><input width="100%"  type="text" maxlength="23" name="mantisseBinaire2"   id="mantisseBinaire2" onchange="floatBinaireToDecimal('nbBitsAddition', 'signeBinaire2', 'exposantBinaire2', 'mantisseBinaire2', 'chiffre2')"/></td>
                    </tr>
                    <tr>
                        <td colspan="4"> <input type="button" name="additioner" id="additioner" value="Aditionner" onclick="add()"></td>
                    </tr>
                    <tr>
                        <td colspan="4" ><span id="chiffre1">1er nombre</span> + <span id="chiffre2">2ème nombre</span> = <span id="ResultatAddition"></span> </td>
                    </tr>
                </tbody>
            </table>

        </form>
        <footer style="margin-top:100px; border-top:2px solid black; ">
            Informations:<br>
            Ce labo a été réalisé par Jmaa Mohamed, Castella Killian, Neto da Silva André & Piquerez Thibaut dans le cadre du cours "Algorithmes numériques".
        </footer>
    </body>
</html>
