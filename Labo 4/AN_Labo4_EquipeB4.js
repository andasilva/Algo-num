/*****************************************/
/* Approximation of the cosine by Taylor */
/*****************************************/

function cosTaylor(x)
{
    var n = document.getElementById("nTaylor").value;
    n = parseInt(n);

    //Check n value
    if (n < 0) {
        alert("n doit être un nombre supérieur à 0");
        throw new Error("n invalidate!");
    } else if (n > 50) {
        alert("n doit être inférieure ou égal à 50");
        throw new Error("n invalidate!");
    }

    cos = 1;
    //var signe = 1;
    var signe = true;
    var factoriel = 1;

    for (var i = 2; i <= n; i += 2) {
        factoriel = factoriel * i * (i - 1);
        if (signe) {
            cos -= Math.pow(x, i) / factoriel;
            signe = false;
        } else {
            cos += Math.pow(x, i) / factoriel;
            signe = true;
        }
    }
    return cos;
}

/*******************************************************************/
/* Approximation of the derivative by 4th degree polynomial method */
/*******************************************************************/

function firstDerivative(f, h)
{
    var func = function (x)
    {
        return (8.0 * (f(x + (h / 2.0)) - f(x - (h / 2.0))) - f(x + h) + f(x - h)) / (6 * h);
    }
    return func;
}


function main()
{
    var h = document.getElementById("h").value;
    h = parseFloat(h);
	
	if (h < 0.001) {
        alert("h doit être un nombre supérieur ou égal à 0.001");
        throw new Error("h invalidate!");
    }

    var min = document.getElementById("minRange").value;
    min = parseFloat(min);

    var max = document.getElementById("maxRange").value;
    max = parseFloat(max);

    var fprime = firstDerivative(cosTaylor, h);
    var fsecond = firstDerivative(fprime, h);

    var dx = 0.1;

    var traceCos = calculTrace(traceCos, cosTaylor, dx, "cos(x)", min, max);
    var traceCosFirstDerivative = calculTrace(traceCosFirstDerivative, fprime, dx, "cos'(x)", min, max);
    var traceCosSecondDerivative = calculTrace(traceCosSecondDerivative, fsecond, dx, "cos''(x)", min, max);

    /****************/
    /* Plot Section */
    /****************/
    //Data for the plot
    var data = [traceCos, traceCosFirstDerivative, traceCosSecondDerivative];

    //Layout for the plot
    var layout = {
        xaxis: {
            range: [min, max]
        },
        yaxis: {
            range: [-2.0, 2.0]
        },
        hovermode: 'closest'
    };
    //Draw data
    Plotly.newPlot("plotFunction", data, layout);
}


// Create trace object and fill it with data
function calculTrace(trace, fonction, dx, name, min, max)
{
    trace = {};
    trace.type = 'scatter';
    trace.x = [];
    trace.y = [];
    trace.name = name;

    var x = min;

    while (x < max)
    {
        trace.x.push(x);
        trace.y.push(fonction(x));
        x += dx;
    }

    return trace;
}
 