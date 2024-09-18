let A = [
    [64.9, "X"],
    [59, "X"],
    [63.4, "X"],
    [65.5, "X"],
    [63.4, "X"],
    [57.7, "X"],
    [64.3, "X"],
    [68.6, "X"]
];

let B = [2, 3, 4, 5];

// Recorrer el array B
B.forEach(index => {
    A[index][1] = "Y";
});

console.log(A);
