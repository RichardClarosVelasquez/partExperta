angular.module('myApp', [])
    .controller('miControlador', ['$scope', function ($scope) {
        $scope.csvFile = null;
        $scope.setFile = function (element) {
            $scope.$apply(function ($scope) {
                $scope.csvFile = element.files[0];
            });
        };
        $scope.uploadCSV = function () {
            var file = $scope.csvFile;
            if (file) {
                readFileAsText(file).then(csvData => {
                    var numeros = csvData.split(/\s+/).map(Number);
                    numeros.length = numeros.length - 1;
                    console.log("Datos en fila: ", numeros);
                    var matriz = [];
                    for (let i = 0; i < numeros.length; i += 15) {
                        matriz.push(numeros.slice(i, i + 15));
                    }
                    $scope.matriz = matriz;
                }).catch(error => {
                    console.error("ERROR AL LEER EL ARCHIVO: ", error);
                });
            } else {
                alert("Por favor selecciona un archivo CSV.");
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
    }])
