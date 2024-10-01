var app = angular.module("myApp", []);
app
	.controller("miControlador", [
		"$scope",
		function ($scope) {
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
			// $scope.setFile = function (element) {
			//     $scope.$apply(function ($scope) {
			//         $scope.csvFile = element.files[0];
			//     });
			// };
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
								for (let contador = 0; contador < dbCSV.length - 1; contador++) {
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
										posicionDeCopias = posicionDeCopias.slice(-1).concat(posicionDeCopias.slice(0, -1));
										numeroColor = numeroColor + 1;
										console.log("COPIAS EN LAS POSICIONES: ", posicionDeCopias);
										posicionDeCopias.forEach(indice => {
											// console.log("INDICE: ", indice)
											if (dbCSV[indice] && dbCSV[indice][1] === 'X') {// EVITA SOBREESCRIBIR SOBRE LOS DATOS QUE YA EXISTEN
												dbCSV[indice][1] = numeroColor;
											}
										});
										//INICIO CAMBIOS
										// if (contadorDos > 0 && posicionDePrimeraCopia.length == posicionDeCopias.length) {
										// 	// numeroColor = numeroColor + 1;
										// } else if (contadorDos > 0 && (posicionDePrimeraCopia.length != posicionDeCopias.length)) {
										// 	numeroColor = numeroColor - 1;
										// 	posicionDeCopias.forEach(index => {
										// 		dbCSV[index][1] = "X";
										// 	});
										// } else if (contadorDos == 0) {
										// 	// posicionDePrimeraCopia = posicionDeCopias;
										// }
										// contadorDos = contadorDos + 1;
										// posicionDePrimeraCopia = posicionDeCopias;
										// FIN CAMBIOS
									}
									posicionDeCopias = [];
								}
								console.log("RESULTADO: ", dbCSV);

								//SERIES DE DOS
								// let dbCSV = numeros.map(value => [value, 'X']);
								// var posicionDeCopias = [];
								// var numeroColor = -1;
								// for (let contador = 0; contador < dbCSV.length - 1; contador++) {
								// 	var primero = dbCSV[contador][0];
								// 	var segundo = dbCSV[contador + 1][0];
								// 	for (let i = contador + 2; i < dbCSV.length - 1; i++) {
								// 		if (dbCSV[i][0] == primero && dbCSV[i + 1][0] == segundo && dbCSV[i][1] == "X" && dbCSV[i + 1][1] == "X") {
								// 			posicionDeCopias.push(i);
								// 			posicionDeCopias.push(i + 1);
								// 		}
								// 	}
								// 	if (posicionDeCopias.length !== 0) {
								// 		posicionDeCopias.push(contador);
								// 		posicionDeCopias.push(contador + 1);
								// 		posicionDeCopias = posicionDeCopias.slice(-2).concat(posicionDeCopias.slice(0, -2));
								// 		numeroColor = numeroColor + 1;
								// 		console.log("COPIAS EN LAS POSICIONES: ", posicionDeCopias);
								// 	}
								// 	posicionDeCopias.forEach(indice => {
								// 		if (dbCSV[indice] && dbCSV[indice][1] === 'X') {
								// 			dbCSV[indice][1] = numeroColor;
								// 		}
								// 	});
								// 	posicionDeCopias = [];
								// }
								// console.log("RESULTADO: ", dbCSV)

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
							});
						})
						.catch((error) => {
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
