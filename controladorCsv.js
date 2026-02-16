var app = angular.module("myApp", []);
app
  .controller("miControlador", [
    "$scope",
    function ($scope) {
      $scope.file = null;
      $scope.setFile = function (element) {
        var file = element.files[0];
        if (file && file.name.endsWith(".csv")) {
          console.log("FORMATO ACEPTADO");
          $scope.file = file;
          $scope.fileName = file.name;
        } else {
          swal("Error", "Por favor seleccione un archivo CSV válido.", "error");
          element.value = ""; // Clear the input
          $scope.file = null;
        }
        $scope.$apply();
      };

      $scope.seleccionarArchivo = function (idFile) {
        var sid = document.getElementById(idFile);
        if (sid) {
          document.getElementById(idFile).click();
        } else {
          alert("Error")
        }
      }

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
                let dbCSV = numeros.map((value) => [value, "X"]);
                var posicionDeCopias = [];
                var posicionDePrimeraCopia = [];
                var contadorDos = 0;
                var numeroColor = -1;
                for (
                  let contador = 0;
                  contador < dbCSV.length - 1;
                  contador++
                ) {
                  var primero = dbCSV[contador][0];
                  for (let i = contador + 1; i < dbCSV.length - 1; i++) {
                    if (dbCSV[i][0] == primero && dbCSV[i][1] == "X") {
                      // COMO ES UN BUCLE EN LAS SIGUIENTES ITERACIONES NO SE COMPARA LAS COPIAS
                      posicionDeCopias.push(i);
                    }
                  }
                  if (posicionDeCopias.length !== 0) {
                    // SE EJECUTA SI HUBO COPIAS
                    posicionDeCopias.push(contador); // SE AGREGA EL MISMO NUMERO, EL DE LA POSICION DE LA COPIA
                    console.log("DATOS REPETIDOS: ", posicionDeCopias);
                    posicionDeCopias = posicionDeCopias
                      .slice(-1)
                      .concat(posicionDeCopias.slice(0, -1));
                    numeroColor = numeroColor + 1;
                    console.log("COPIAS EN LAS POSICIONES: ", posicionDeCopias);
                    posicionDeCopias.forEach((indice) => {
                      // console.log("INDICE: ", indice)
                      if (dbCSV[indice] && dbCSV[indice][1] === "X") {
                        // EVITA SOBREESCRIBIR SOBRE LOS DATOS QUE YA EXISTEN
                        dbCSV[indice][1] = numeroColor;
                      }
                    });
                  }
                  posicionDeCopias = [];
                }
                console.log("RESULTADO: ", dbCSV);

                $scope.matriz2 = []; // Muestra la matriz en una tabla, por el ordende las columnas
                for (let i = 0; i < 20; i++) {
                  $scope.matriz2[i] = [];
                }
                for (let i = 0; i < dbCSV.length; i++) {
                  let row = i % 20;
                  let col = Math.floor(i / 20);
                  $scope.matriz2[row][col] = dbCSV[i];
                }
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

      $scope.getClass = function (numero) {
        if (numero >= 0 && numero <= 99) {
          return `color-${numero}`;
        } else {
          return "otro";
        }
      };
    },
  ])
