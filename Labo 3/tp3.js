var error = "";

class Matrix{
    constructor(jsonObj)
    {
        //get size of square Matrix
        this.size = jsonObj.n[0];

        //Create array
        this.matrix = new Array();
        for (var i = 0; i < this.size; i++)
        {
            var line = new Array();
            for (var j = 0; j < this.size; j++)
            {
                line.push(jsonObj.A[i * this.size + j]);
            }
            line.push(jsonObj.B[i]);
            this.matrix.push(line);
        }
    }

    //subtract c times lineOne to lineTwo
    subLines(c, lineOne, lineTwo)
    {
        for (var i = 0; i <= this.size; i++) {
            this.matrix[lineTwo][i] -= c * this.matrix[lineOne][i];
        }
    }

    //Multiply line by factor
    multiplyLineByFactor(factor, line)
    {
        for (var i = 0; i <= this.size; i++) {
            this.matrix[line][i] *= factor;
        }
    }

    //Swap two Lines
    swapLines(lineOne, lineTwo)
    {
        var temp = this.matrix[lineTwo];
        this.matrix[lineTwo] = this.matrix[lineOne];
        this.matrix[lineOne] = temp;
    }
}

function readJson(url, callback) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText);
        } else {
            callback("Error");
        }
    }
    xmlhttp.send();
}

function calculate() {
    //reset error
    error = "";
    readJson("json/" + document.getElementById("jsonFile").value, function (response)
    {
        var content = response;
        if (content != "Error") {
            //Get content of JSON file
            var jsonObj = JSON.parse(content);
            //Create object Matrix
            var matrix = new Matrix(jsonObj);
            //Calculate with timer

            if (matrix.size > 0) {
                var t0 = performance.now();
                gausse(matrix);
                var t1 = performance.now();
                var timeElapsed = t1 - t0;
            } else {
                error = "Veuillez inserer une matrice non vide";
            }

            //Check if errors...
            if (error == "") {
                //show result
                var result = "Le résultats trouvés pour cette matrice sont les suivants:<br>";
                for (var i = 0; i < matrix.size; i++) {
                    result += "x<sub>" + (i + 1) + "</sub> = " + matrix.matrix[i][matrix.size].toFixed(5) + "<br>";
                }
                result += "Temps écoulé: " + timeElapsed.toFixed(5) + " millisecondes."
                document.getElementById("output").innerHTML = result;
            } else {
                document.getElementById("output").innerHTML = error;
            }
        }
    });
}

function gausse(matrix) {
    for (var j = 0; j < matrix.size; j++) {

        //pivot must not be 0... Change with next line if possible
        if (matrix.matrix[j][j] == 0) {
            if (!swapWithNextPivot(matrix, j)) {
                error = "Impossible de résoudre ce système...";
                return;
            }
        }

        //Put the pivot to 1 -> divide line of pivot by pivot value
        matrix.multiplyLineByFactor(1 / matrix.matrix[j][j], j);

        //Substract
        for (var i = j + 1; i < matrix.size; i++)
        {
            var c = matrix.matrix[i][j] / matrix.matrix[j][j];
            matrix.subLines(c, j, i);
        }
    }

    treatPivot(matrix);
}

function swapWithNextPivot(matrix, line) {
    for (var i = line + 1; i < matrix.size; i++) {
        if (matrix.matrix[i][line] != 0) {
            matrix.swapLines(i, line);
            return true;
        }
    }
    return false;
}

function treatPivot(matrix) {
    for (var i = matrix.size - 1; i > 0; i--) {
        for (var j = i; j > 0; j--) {
            var c = matrix.matrix[j - 1][i];
            matrix.subLines(c, i, j - 1);
        }
    }
}



