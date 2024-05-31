var app = angular.module('myApp', []);
app.controller('miControlador', ['$scope', function ($scope) {
    $scope.file = null;
    //$scope.matriz = [];
    $scope.setFile = function (element) {
        var file = element.files[0];
        if (file && file.name.endsWith('.csv')) {
            //swal('FORMATO DE ARCHIVO ACEPTADO', "formato aceptado", 'success')
            console.log("FORMATOAACEPTADO")
            $scope.file = file;
        } else {
            swal("Error", "Por favor seleccione un archivo CSV válido.", "error")
            element.value = ""; // Clear the input
            $scope.file = null;
        }
        $scope.$apply();
    };
    // $scope.setFile = function (element) {
    //     $scope.$apply(function ($scope) {
    //         $scope.csvFile = element.files[0];
    //     });
    // };
    $scope.uploadCSV = function () {
        //var file = $scope.csvFile;
        if ($scope.file) {
            console.log("Archivo cargado: ", $scope.file)
            readFileAsText($scope.file).then(csvData => {
                var numeros = csvData.split(/\s+/).map(Number);
                numeros.length = numeros.length - 1;
                console.log("Datos en fila: ", numeros);
                $scope.$apply(function () {
                    // $scope.matriz = [];
                    // for (let i = 0; i < numeros.length; i += 15) {
                    //     $scope.matriz.push(numeros.slice(i, i + 15));
                    // };
                    //     // cuadro de pruebas
                    let dimensionAumentada = numeros.map(value => [value, 0]);
                    $scope.matriz2 = [];
                    for (let i = 0; i < dimensionAumentada.length; i += 15) {
                        $scope.matriz2.push(dimensionAumentada.slice(i, i + 15));
                    }
                    $scope.primerNumero = numeros[0];
                });
            }).catch(error => {
                console.error("ERROR AL LEER EL ARCHIVO: ", error);
            });
            // var reader = new FileReader();
            // reader.onload = function (e) {
            //     var csvData = e.target.result;

            //     // Inicializamos el array donde se guardaran los datos duplicado
            //     var tamanio = 150;
            //     // Crear el array tridimensional e inicializarlo con valores predeterminados
            //     var arrayTridimensional = Array.from({ length: tamanio }, () =>
            //         Array.from({ length: tamanio }, () => Array.from({ length: tamanio }, () => 0))
            //     );

            //     // algoritmo de busqueda de datos
            //     var x = 0;
            //     var y = 0;
            //     const posiciones = new Array(1);
            //     var contador1 = 0;
            //     for (let i = 0; i < numeros.length; i++) {
            //         const numeroBase = numeros[i];
            //         for (let j = i; j < numeros.length; j++) {
            //             const mismoNumero = numeros[j];
            //             console.log("Posicion 1: ", numeroBase)
            //             if (numeroBase == mismoNumero) {
            //                 console.log("Posicion 2: ", j)
            //                 posiciones[contador1] = j;
            //                 contador1 = contador1 + 1;
            //                 // for (let index = 0; index < array.length; index++) {
            //                 //     arrayTridimensional[x][y][i] = numeroBase;
            //                 // }
            //             }
            //         }
            //         console.log("Posiciones: ", posiciones);
            //         break
            //     }
            //     $scope.primerNumero = numeros[1];
            // };
            // reader.readAsText(file);
        } else {
            swal('ERROR', 'El formato no es aceptado,', 'error')
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
    $scope.getClass = function (numero) {
        // if (numero < 100) {
        //     return 'negativo';
        // } else if (numero > 100) {
        //     return 'positivo';
        // } else {
        //     return 'cero';
        // }
        var primerNumero = $scope.primerNumero;
        if (numero == primerNumero) {
            return 'es';
        } else {
            return 'noes';
        }
    };
}])
    .controller('testController', function ($scope) {
        $scope.valor = '';
        $scope.cssClass = 'encabezado';
        $scope.changeCssInput = function () {
            $scope.cssClass = ($scope.valor.length <= 0) ? 'encabezado' : 'encabezado2';
        }
    });
