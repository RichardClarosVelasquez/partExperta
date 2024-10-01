var app = angular.module("myApp", []);
app.controller("miControlador", ["$scope", "$timeout", function ($scope, $timeout) {
    let puntosMedicionTodos = [];

    for (let indice = 0; indice < 4; indice++) {
        const arrayNumeros = Array.from({ length: 300 }, () => {
            return (Math.random() * (120 - 60) + 60).toFixed(2);
        });
        const arrayNumerosNumericos = arrayNumeros.map(num => parseFloat(num));
        const numerosColores = Array.from({ length: 300 }, () => {
            return (Math.random() * (21 - 1) + 1).toFixed(0);
        });
        const arrayNumerosColores = numerosColores.map(num => parseFloat(num));
        const C = arrayNumerosNumericos.map((item, index) => [item, arrayNumerosColores[index]]);
        const matriz3 = [];
        for (let i = 0; i < 20; i++) {
            matriz3[i] = [];
        }
        for (let i = 0; i < C.length; i++) {
            let row = i % 20;
            let col = Math.floor(i / 20);
            matriz3[row][col] = C[i];
        }
        puntosMedicionTodos.push(matriz3);
    }
    $scope.matrices3 = puntosMedicionTodos;
    console.log(puntosMedicionTodos);



    $scope.datosPrueba = [
        [
            [
                82.41,
                0
            ],
            [
                126.69,
                2
            ],
            [
                114.39,
                3
            ],
            [
                114.39,
                4
            ]
        ],
        [
            [
                113.16,
                5
            ],
            [
                104.55,
                6
            ],
            [
                94.71,
                7
            ],
            [
                124.23,
                8
            ],
            [
                126.69,
                9
            ]
        ],
        [
            [
                99.63,
                10
            ],
            [
                91.02,
                11
            ],
            [
                123,
                12
            ],
            [
                118.08,
                13
            ],
            [
                120.54,
                14
            ]
        ],
    ]

    console.log("Datos: ", $scope.datosPrueba)
    $scope.file = null;
    //$scope.matriz = [];
    $scope.setFile = function (element) {
        var file = element.files[0];
        if (file && file.name.endsWith(".csv")) {
            //swal('FORMATO DE ARCHIVO ACEPTADO', "formato aceptado", 'success')
            console.log("FORMATOAACEPTADO");
            $scope.file = file;
        } else {
            swal("Error", "Por favor seleccione un archivo CSV válido.", "error");
            element.value = ""; // Clear the input
            $scope.file = null;
        }
        $scope.$apply();
    };
    $scope.uploadCSV = function () {
        //var file = $scope.csvFile;
        if ($scope.file) {
            console.log("Archivo cargado: ", $scope.file);
            readFileAsText($scope.file)
                .then((csvData) => {
                    console.log("DATOS: ", csvData);
                    console.log(typeof csvData);
                    console.log(csvData.length);
                    var numeros = csvData.split(/\s+/).map(Number);
                    numeros.length = numeros.length - 1;
                    console.log("Datos en fila: ", numeros);
                    $scope.$apply(function () {
                        //SERIES DE UNO
                        // let dbCSV = numeros.map((value) => [value, "X"]);
                        // var posicionDeCopias = [];
                        // var posicionDePrimeraCopia = [];
                        // var contadorDos = 0;
                        // var numeroColor = -1;
                        // for (
                        //     let contador = 0;
                        //     contador < dbCSV.length - 1;
                        //     contador++
                        // ) {
                        //     var primero = dbCSV[contador][0];
                        //     for (let i = contador + 1; i < dbCSV.length - 1; i++) {
                        //         if (dbCSV[i][0] == primero && dbCSV[i][1] == "X") {
                        //             // COMO ES UN BUCLE EN LAS SIGUIENTES ITERACIONES NO SE COMPARA LAS COPIAS
                        //             posicionDeCopias.push(i);
                        //         }
                        //     }
                        //     if (posicionDeCopias.length !== 0) {
                        //         // SE EJECUTA SI HUBO COPIAS
                        //         posicionDeCopias.push(contador); // SE AGREGA EL MISMO NUMERO, EL DE LA POSICION DE LA COPIA
                        //         console.log("DATOS REPETIDOS: ", posicionDeCopias);
                        //         posicionDeCopias = posicionDeCopias.slice(-1).concat(posicionDeCopias.slice(0, -1));
                        //         numeroColor = numeroColor + 1;
                        //         console.log("COPIAS EN LAS POSICIONES: ", posicionDeCopias);
                        //         posicionDeCopias.forEach(indice => {
                        //             // console.log("INDICE: ", indice)
                        //             if (dbCSV[indice] && dbCSV[indice][1] === 'X') {// EVITA SOBREESCRIBIR SOBRE LOS DATOS QUE YA EXISTEN
                        //                 dbCSV[indice][1] = numeroColor;
                        //             }
                        //         });
                        //         //INICIO CAMBIOS
                        //         if (contadorDos == 1 && posicionDePrimeraCopia.length == posicionDeCopias.length) {
                        //         } else if (contadorDos == 0) {
                        //             posicionDePrimeraCopia = posicionDeCopias;
                        //         } else {

                        //         }
                        //         contadorDos = contadorDos + 1;
                        //         // FIN CAMBIOS
                        //     }
                        //     // posicionDeCopias.forEach(indice => {
                        //     // 	console.log("INDICE: ", indice)
                        //     // 	if (dbCSV[indice] && dbCSV[indice][1] === 'X') {// EVITA SOBREESCRIBIR SOBRE LOS DATOS QUE YA EXISTEN
                        //     // 		dbCSV[indice][1] = numeroColor;
                        //     // 	}
                        //     // });
                        //     posicionDeCopias = [];
                        // }
                        // console.log("RESULTADO: ", dbCSV);

                        // SERIES DE DOS
                        let dbCSV = numeros.map(value => [value, 'X']);
                        var posicionDeCopias = [];
                        var numeroColor = -1;
                        for (let contador = 0; contador < dbCSV.length - 1; contador++) {
                            var primero = dbCSV[contador][0];
                            var segundo = dbCSV[contador + 1][0];
                            for (let i = contador + 2; i < dbCSV.length - 1; i++) {
                                if (dbCSV[i][0] == primero && dbCSV[i + 1][0] == segundo && dbCSV[i][1] == "X" && dbCSV[i + 1][1] == "X") {
                                    posicionDeCopias.push(i);
                                    posicionDeCopias.push(i + 1);
                                }
                            }
                            if (posicionDeCopias.length !== 0) {
                                posicionDeCopias.push(contador);
                                posicionDeCopias.push(contador + 1);
                                posicionDeCopias = posicionDeCopias.slice(-2).concat(posicionDeCopias.slice(0, -2));
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

                        //SERIES DE TRES
                        // let dbCSV = numeros.map(value => [value, 'X']);
                        // var posicionDeCopias = [];
                        // var numeroColor = -1;
                        // for (let contador = 0; contador < dbCSV.length - 3; contador++) {
                        //     var primero = dbCSV[contador][0];
                        //     var segundo = dbCSV[contador + 1][0];
                        //     var tercero = dbCSV[contador + 2][0];
                        //     for (let i = contador + 3; i < dbCSV.length - 3; i++) {
                        //         if (dbCSV[i][0] == primero && dbCSV[i + 1][0] == segundo && dbCSV[i + 2][0] == tercero && dbCSV[i][1] == "X" && dbCSV[i + 1][1] == "X" && dbCSV[i + 2][1] == "X") {
                        //             posicionDeCopias.push(i);
                        //             posicionDeCopias.push(i + 1);
                        //             posicionDeCopias.push(i + 2);
                        //         }
                        //     }
                        //     if (posicionDeCopias.length !== 0) {
                        //         posicionDeCopias.push(contador);
                        //         posicionDeCopias.push(contador + 1);
                        //         posicionDeCopias.push(contador + 2);
                        //         posicionDeCopias = posicionDeCopias.slice(-3).concat(posicionDeCopias.slice(0, -3));
                        //         numeroColor = numeroColor + 1;
                        //         console.log("COPIAS EN LAS POSICIONES: ", posicionDeCopias);
                        //     }
                        //     posicionDeCopias.forEach(indice => {
                        //         if (dbCSV[indice] && dbCSV[indice][1] === 'X') {
                        //             dbCSV[indice][1] = numeroColor;
                        //         }
                        //     });
                        //     posicionDeCopias = [];
                        // }
                        // console.log("RESULTADO: ", dbCSV)

                        $scope.matriz2 = []; // Muestra la matriz en una tabla, por el ordende las columnas
                        for (let i = 0; i < 20; i++) {
                            $scope.matriz2[i] = [];
                        }
                        for (let i = 0; i < dbCSV.length; i++) {
                            let row = i % 20;
                            let col = Math.floor(i / 20);
                            $scope.matriz2[row][col] = dbCSV[i];
                        }

                        console.log("DATOS FINALES: ", $scope.matriz2)
                    });
                })
                .catch((error) => {
                    console.error("ERROR AL LEER EL ARCHIVO: ", error);
                });

        } else {
            swal("ERROR", "El formato no es aceptado,", "error");
        }
    };

    function readFileAsText(file) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = function (e) {
                //     var csvData = e.target.result;
                resolve(e.target.result);
            };
            reader.onerror = function (e) {
                reject(e);
            };
            reader.readAsText(file);
        });
    }

    $scope.getClass2 = function (elemento) {
        return elemento[1] % 2 === 0 ? 'even-class' : 'odd-class';
    };

    $scope.getClass = function (numero) {
        if (numero >= 0 && numero <= 99) {
            return `color-${numero}`;
        } else {
            return "otro";
        }
    };
    // var ctx = document.getElementById("myChart").getContext("2d");
    // valoresDeX = [0, 50, 100, 150, 200, 250, 300]
    // valoresDeY = [82, 115, 148, 128, 95, 61, 71]
    // $scope.myChart = new Chart(ctx, {
    //     type: "line",
    //     data: {
    //         labels: valoresDeX,
    //         datasets: [
    //             {
    //                 label: "DECIBELES A",
    //                 data: valoresDeY,
    //                 borderColor: "rgba(75, 192, 192, 1)",
    //                 borderWidth: 2,
    //                 fill: true,
    //                 pointRadius: 0,
    //             },
    //         ],
    //     },
    //     options: {
    //         scales: {
    //             x: {
    //                 type: "linear",
    //                 position: "bottom",
    //                 title: {
    //                     display: true,
    //                     text: "SEGUNDOS [seg]",
    //                     color: "black",
    //                     font: {
    //                         size: 18, // Tamaño de letra
    //                         weight: "bold", // Negrita
    //                         family: "Arial", // Tipo de letra
    //                     },
    //                 },
    //                 ticks: {
    //                     color: "black", // Cambiar el color del texto de los ticks del eje X
    //                     font: {
    //                         family: "Arial",
    //                         size: 15,
    //                         weight: "bold", // Tipo de letra para los números del eje Y
    //                     },
    //                 },
    //                 min: 0, // Valor mínimo del eje X
    //                 max: 300, // Valor máximo del eje X
    //             },
    //             y: {
    //                 title: {
    //                     display: true,
    //                     text: "DECIBELES [dba]",
    //                     color: "black",
    //                     font: {
    //                         size: 18, // Tamaño de letra
    //                         weight: "bold", // Negrita
    //                         family: "Arial", // Tipo de letra
    //                     },
    //                 },
    //                 ticks: {
    //                     color: "black", // Cambiar el color del texto de los ticks del eje Y
    //                     font: {
    //                         family: "Arial",
    //                         size: 15,
    //                         weight: "bold", // Tipo de letra para los números del eje Y
    //                     },
    //                 },
    //                 min: 50, // Valor mínimo del eje X
    //                 max: 150, // Valor máximo del eje X
    //             },
    //         },
    //         plugins: {
    //             legend: {
    //                 labels: {
    //                     color: "black", // Cambiar el color de fondo de la leyenda
    //                 },
    //             },
    //             title: {
    //                 display: true,
    //                 text: "NIVELES DE PRESION SONORA",
    //                 font: {
    //                     size: 20, // Tamaño de letra del título
    //                     family: "Arial", // Tipo de letra del título
    //                     weight: "bold", // Peso del título (negrita)
    //                     style: "italic", // Estilo del título (cursiva)
    //                 },
    //             },
    //         },
    //         margins: {
    //             left: "150",
    //             right: "150",
    //             top: "150",
    //             bottom: "150",
    //         },
    //     },
    //     datasets: [
    //         {
    //             borderColor: "black",
    //             borderWidth: 2,
    //         },
    //     ],
    // });

    $scope.dataSets = [
        { X: [0, 50, 100], Y: [95, 61, 71], label: 'Dataset 1' },
        { X: [150, 200, 250, 300], Y: [128, 95, 61, 71], label: 'Dataset 2' }
    ];

    // Método para inicializar los gráficos
    $scope.initChart = function () {
        $timeout(function () {
            // Asegúrate de que se está iterando correctamente
            $scope.dataSets.forEach(function (data, index) {
                var canvasId = 'chart-' + index;
                var canvas = document.getElementById(canvasId);

                if (canvas) {
                    var ctx = canvas.getContext('2d');
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: data.X, // Eje X
                            datasets: [{
                                label: data.label,
                                data: data.Y, // Eje Y
                                borderColor: 'rgba(75, 192, 192, 1)',
                                fill: false,
                                borderWidth: 2
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                } else {
                    console.error('Canvas con ID ' + canvasId + ' no encontrado.');
                }
            });
        }, 100); // Ajusta el tiempo si es necesario
    };
},
])
    .controller("testController", function ($scope) {
        $scope.valor = "";
        $scope.cssClass = "encabezado";
        $scope.changeCssInput = function () {
            $scope.cssClass = $scope.valor.length <= 0 ? "encabezado" : "encabezado2";
        };
    });
