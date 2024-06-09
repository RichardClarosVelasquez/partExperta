const array = [
    [48.175, 'X'], [82, 'X'],
    [87.125, 'X'], [86.1, 'X'],
    [26.65, 'X'], [32.8, 'X'],
    [90.2, 'X'], [49.2, 'X'],
    [102.5, 'X'], [49.2, 'X'],
    [72.775, 'X'], [78.925, 'X'],
    [67.65, 'X'], [126.075, 'X'],
    [50.225, 'X'], [57.4, 'X'],
    [49.2, 'X'], [34.85, 'X'],
    [48.175, 'X'], [48.175, 'X'],
    [82, 'X'], [121.975, 'X'],
    [68.675, 'X'], [78.925, 'X'],
    [48.175, 'X'], [82, 'X'],
    [52.325, 'X'], [55.4, 'X'],
    [43.1, 'X'], [31.15, 'X'],
    [58.345, 'X'], [56.17, 'X'],
    [83.2, 'X'], [23.95, 'X'],
    [64.65, 'X'], [33.945, 'X']
];

// Extraer los dos primeros elementos del array original
const primerosElementos = array.slice(0, 2);// 0 es inclusivo y 2 es exclusivo

array[0][1] = 1;
array[1][1] = 1;
// Iterar sobre el resto del array
for (let i = 2; i < array.length - 1; i++) {
    // Comparar los dos primeros elementos con cada par de elementos en el resto del array
    if (array[i][0] === primerosElementos[0][0] && array[i + 1][0] === primerosElementos[1][0]) {
        array[i][1] = 1;
        array[i + 1][1] = 1;
        console.log("Se encontró la copia en la posicion ", i)
    }
}
console.log(array)
