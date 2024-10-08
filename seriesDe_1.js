const dbCSV = [
    [48.175, 'X'],
    [82, 'X'],
    [87.125, 'X'],
    [86.1, 'X'],
    [26.65, 'X'],
    [32.8, 'X'],
    [90.2, 'X'],
    [91.23, 'X'],
    [90.89, 'X'],
    [49.2, 'X'],
    [102.5, 'X'],
    [49.2, 'X'],
    [72.775, 'X'],
    [78.925, 'X'],
    [67.65, 'X'],
    [126.075, 'X'], [50.225, 'X'], [57.4, 'X'], [49.2, 'X'], [34.85, 'X'], [48.175, 'X'],

    [48.175, 'X'], [82, 'X'],

    [121.975, 'X'], [68.675, 'X'], [78.925, 'X'],

    [48.175, 'X'], [82, 'X'],

    [61.75, 'X'], [71.25, 'X'], [62.80, 'X'], [91.32, 'X'], [75.66, 'X'], [91.23, 'X'], [90.89, 'X'],

    [48.175, 'X'], [82, 'X'],

    [52.325, 'X'], [55.4, 'X'], [43.1, 'X'], [31.15, 'X'], [58.345, 'X'], [56.17, 'X'], [83.2, 'X'], [23.95, 'X'], [64.65, 'X'], [33.945, 'X'], [90.2, 'X'], [49.2, 'X'], [68.675, 'X'], [78.925, 'X'], [68.675, 'X'], [78.925, 'X']
];
// Extraer los dos primeros elementos del array original
const primerosElementos = dbCSV.slice(0, 2);// 0 es inclusivo y 2 es exclusivo
var posicionDeCopias = [];
var numeroColor = -1;
for (let contador = 0; contador < dbCSV.length - 1; contador++) {
    //var contador = 0;
    var primero = dbCSV[contador][0];
    //var segundo = dbCSV[contador + 1][0];
    for (let i = contador + 1; i < dbCSV.length - 1; i++) {
        if (dbCSV[i][0] == primero && dbCSV[i][1] == "X") {
            posicionDeCopias.push(i);
        }
    }
    if (posicionDeCopias.length !== 0) {
        posicionDeCopias.push(contador);
        posicionDeCopias = posicionDeCopias.slice(-1).concat(posicionDeCopias.slice(0, -1));
        numeroColor = numeroColor + 1;
        console.log("COPIAS EN LAS POSICIONES: ", posicionDeCopias);
    }
    posicionDeCopias.forEach(indice => {
        if (dbCSV[indice] && dbCSV[indice][1] === 'X') {
            dbCSV[indice][1] = numeroColor;
        }
    });
    posicionDeCopias = [];
}
console.log("RESULTADO: ", dbCSV)
