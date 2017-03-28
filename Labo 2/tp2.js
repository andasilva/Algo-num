//sentinel
var abort = false;

// Initialize the canva with axes and the main function
var myGraph = new Graph({
    canvasId: 'myCanvas',
    minX: -100,
    minY: -10,
    maxX: 100,
    maxY: 10,
    unitsPerTick: 1
});
// Initialize the canva to draw tangents
var myGraphA = new Graph({
    canvasId: 'myCanvasA',
    minX: -100,
    minY: -10,
    maxX: 100,
    maxY: 10,
    unitsPerTick: 1
});


function dessin()
{
    //Draw the tangent on the x-axis
    myGraphA.drawLine(function (x) {
        return 0;
    }, '#aaa', 1);

    //Draw the function selected
    if (document.getElementById('sin').checked)
    {
        myGraph.drawEquation(function (x) {
            return Math.sin(x) - (x / 13);
        }, 'green', 3);
    } else {
        myGraph.drawEquation(function (x) {
            return x / (1 - Math.pow(x, 2));
        }, 'green', 3);
    }

    //Reset the result
    document.getElementById("resultat").innerHTML = "-";

}


//Validation of inputs
function valid()
{
    var startX = document.getElementById("val").value;
    var iteration = document.getElementById("iteration").value;
    var epsilon = document.getElementById("epsilon").value;
    if (startX && startX < 100 && startX > -100)
    {
        if (iteration > 0 && Math.floor(iteration) == iteration) {
            if (epsilon > 0) {
                tangentMethod(startX, 0, iteration, epsilon);
            } else {
                alert("Le seuil de précision doit être un entier positif");
            }
        } else {
            alert("Le nombre d'itération doit être un entier positif");
        }
    } else {
        alert("Le départ doit être compris entre -100 et 100");
    }
}

//Function to find roots
function tangentMethod(startX, i, iteration, epsilon) {
    if (i < iteration && !abort) {
        i++;
        var pente;
        var b = 0;
        //Set timeout to saw an animation
        setTimeout(function () {
            if (Math.abs(funct(startX)) >= epsilon) {
                pente = derivFunc(startX);  //Pente de la fonction
                b = calcB(startX, pente); //Calculation of b with : y = ax + b
                startX = (-b) / pente; //Intersection axe x -> set the next point

                //draw the tangent						
                myGraphA.drawLine(function (x) {
                    return pente * x + b;
                }, 'blue', 2);

                tangentMethod(startX, i, iteration, epsilon);
            } else {
                // Show the result
                document.getElementById("resultat").innerHTML = parseFloat(startX).toFixed(5);//Set the numbers of decimal to 5
                if (startX > 100 || startX < -100) {
                    alert("Remarque: le résultat se trouve en dehors de l'intervalle [-100;100]");
                }
            }
        }, 100);
    } else {
        if (!abort) {
            alert("Pas de réponse, essayez une autre valeur de départ.");
        } else {
            dessin();
            abort = false;
        }
    }
}

//Cancel execution of drawing

function cancelDraw() {
    abort = true;
}


//Return the function evaluated in x
function funct(x) {
    if (document.getElementById('sin').checked) {
        return Math.sin(x) - (x / 13);
    } else {
        return x / (1 - Math.pow(x, 2));
    }
}

//Return the derative of x
function derivFunc(x) {
    var dx = 0.00001;
    return (funct(parseFloat(x) + dx) - funct(parseFloat(x))) / dx;
}

//Calcul le b de : y = ax + b
function calcB(x, pente) {
    return funct(x) - (pente * x);
}

	