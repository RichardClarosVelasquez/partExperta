var app = angular.module("myApp", []);
app.controller("miControlador", ["$scope", function ($scope, $timeout) {

    console.log("Datos: ", $scope.datosPrueba)
    $scope.file = null;
    $scope.setFile = function (element) {
        var file = element.files[0];
        if (file && file.name.endsWith(".csv")) {
            console.log("FORMATOAACEPTADO");
            $scope.file = file;
        } else {
            swal("Error", "Por favor seleccione un archivo CSV válido.", "error");
            element.value = "";
            $scope.file = null;
        }
        $scope.$apply();
    };
    $scope.uploadCSV = function () {
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
    $scope.dataSets = [
        { X: [0, 50, 100], Y: [95, 61, 71], label: 'Dataset 1' },
        { X: [150, 200, 250, 300], Y: [128, 95, 61, 71], label: 'Dataset 2' }
    ];

    // Método para inicializar los gráficos
    $scope.initChart = function () {
        $timeout(function () {

            $scope.dataSets.forEach(function (index, data) {
                var ctx = document.getElementById('chart-' + index).getContext('2d');
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
            })
        }, 100)
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



    