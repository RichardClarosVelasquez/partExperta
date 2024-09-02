const array1 = [10, 20, 30, 40];
const array2 = [1, 1, 1, 1];

const result = array1.map((v, i) => v - array2[i]);

console.log(result); // Salida: [9, 18, 27, 36]
