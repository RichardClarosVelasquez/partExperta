var app = angular.module("myApp", []);
app
	.controller("miControlador", [
		"$scope",
		function ($scope) {
			$scope.file = null;
			$scope.setFile = function (element) {
				var file = element.files[0];
				if (file && file.name.endsWith(".csv")) {
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

				var numeroColor = "ninguno";
				switch (numero) {
					case 0:
						numeroColor = "cero";
						break;
					case 1:
						numeroColor = "uno";
						break;
					case 2:
						numeroColor = "dos";
						break;
					case 3:
						numeroColor = "tres";
						break;
					case 4:
						numeroColor = "cuatro";
						break;
					case 5:
						numeroColor = "cinco";
						break;
					case 6:
						numeroColor = "seis";
						break;
					case 7:
						numeroColor = "siete";
						break;
					case 8:
						numeroColor = "ocho";
						break;
					case 9:
						numeroColor = "nueve";
						break;
					case 10:
						numeroColor = "diez";
						break;
					case 11:
						numeroColor = "once";
						break;
					case 12:
						numeroColor = "doce";
						break;
					case 13:
						numeroColor = "trece";
						break;
					case 14:
						numeroColor = "catorce";
						break;
					case 15:
						numeroColor = "quince";
						break;
					case 16:
						numeroColor = "dieciseis";
						break;
					case 17:
						numeroColor = "diecisiete";
						break;
					case 18:
						numeroColor = "dieciocho";
						break;
					case 19:
						numeroColor = "diecinueve";
						break;
					case 20:
						numeroColor = "veinte";
						break;
					default:
						numeroColor = "otro";
				}
				return numeroColor;
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
