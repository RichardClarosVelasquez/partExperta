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

$scope.mapa_certificA = function (lat, long) {
    setTimeout(function () {
        var vectorSource = new ol.source.Vector();
        var vectorLayer = new ol.layer.Vector({ source: vectorSource });
        var municipios1 = new ol.layer.Tile({
            title: "Municipio",
            visible: true,
            source: new ol.source.TileWMS({
                url: "http://192.168.5.84:8080/geoserver/wms?",
                params: {
                    LAYERS: "g_municipio3",
                    VERSION: "1.1.1",
                    FORMAT: "image/png",
                    TILED: true,
                },
                serverType: "geoserver",
                crossOriginKeyword: "anonymous",
            }),
        });

        var zonas = new ol.layer.Tile({
            title: "Zonas",
            opacity: 0.3,
            visible: false,
            source: new ol.source.TileWMS({
                url: "http://192.168.5.84:8080/geoserver/wms?",
                params: {
                    LAYERS: "sit:zonasref",
                    VERSION: "1.1.1",
                    FORMAT: "image/png",
                    TILED: true,
                },
                serverType: "geoserver",
                crossOriginKeyword: "anonymous",
            }),
        });

        var lotes = new ol.layer.Tile({
            title: "LOTES",
            visible: true,
            source: new ol.source.TileWMS({
                url: "http://192.168.5.84:8080/geoserver/wms?",
                params: {
                    LAYERS: "sit:lotessit",
                    VERSION: "1.1.0",
                    FORMAT: "image/png",
                    STYLES: "lotessit_s1",
                    TILED: true,
                },
                serverType: "geoserver",
                crossOriginKeyword: "anonymous",
            }),
        });

        var nro_catastro = new ol.layer.Tile({
            title: "NroCatastro",
            visible: false,
            source: new ol.source.TileWMS({
                url: "http://192.168.5.84:8080/geoserver/wms?",
                params: {
                    LAYERS: "catastro:acat_lotes",
                    VERSION: "1.1.1",
                    FORMAT: "image/png",
                    TILED: false,
                },
                serverType: "geoserver",
                crossOriginKeyword: "anonymous",
            }),
        });

        $scope.map = new ol.Map({
            target: "map",
            layers: [
                new ol.layer.Group({
                    title: "Mapas Base",
                    layers: [osm, municipios1, zonas],
                }),
                new ol.layer.Group({
                    title: "Capas",
                    layers: [lotes, vectorLayer],
                }),
            ],
            view: new ol.View({
                zoom: 16,
                center: ol.proj.fromLonLat([-68.133555, -16.495687]),
            }),
        });

        var layerSwitcher = new ol.control.LayerSwitcher({ tipLabel: "Leyenda" });
        $scope.map.addControl(layerSwitcher);

        $scope.map.on("click", function (evt) {
            datos = {};
            vectorSource.clear();
            var coord = $scope.map.getCoordinateFromPixel(evt.pixel);
            var centro_1 = ol.proj.transform(coord, "EPSG:3857", "EPSG:4326");
            $scope.long = centro_1[0];
            $scope.lat = centro_1[1];
            console.log("latitud", $scope.lat);
            console.log("longitud", $scope.long);

            if (feature) {
                var coord = feature.getGeometry().getCoordinates();
                var props = feature.getProperties();
            } else {
                var url_nro_catastro = nro_catastro
                    .getSource()
                    .getGetFeatureInfoUrl(
                        evt.coordinate,
                        $scope.map.getView().getResolution(),
                        $scope.map.getView().getProjection(),
                        {
                            INFO_FORMAT: "application/json",
                            propertyName: "fid,idpredio,codigocatastral,estadopredio,codlote",
                        }
                    );

                var url_lotes = lotes
                    .getSource()
                    .getGetFeatureInfoUrl(
                        evt.coordinate,
                        $scope.map.getView().getResolution(),
                        $scope.map.getView().getProjection(),
                        {
                            INFO_FORMAT: "application/json",
                            propertyName: "cod_sifca",
                        }
                    );

                var url_zonas = zonas
                    .getSource()
                    .getGetFeatureInfoUrl(
                        evt.coordinate,
                        $scope.map.getView().getResolution(),
                        $scope.map.getView().getProjection(),
                        {
                            INFO_FORMAT: "application/json",
                            propertyName:
                                "macrodistrito,zona,subalcaldia,codigozona,macro,distrito",
                        }
                    );

                reqwest({
                    url: url_nro_catastro,
                    type: "json",
                }).then(function (data) {
                    var feature = data.features[0];
                    var cod = feature.properties;
                });

                reqwest({
                    url: url_lotes,
                    type: "json",
                }).then(function (data) {
                    var feature = data.features[0];
                    var numeroCatastro = feature.properties.cod_sifca;
                    console.log("NUMERO DE CATASTRO: ", numeroCatastro);
                    var array = [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "035001900240000",
                        "8",
                        "9",
                        "10",
                    ]; //Está HARDCODEADO, llenar con nro de catastro de actividades clausuradas o crear una tabla de clausurados en la base de datos
                    var variable = numeroCatastro.toString();
                    console.log("VARIABLE: ", variable);
                    var encontrada = false;
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] === variable) {
                            encontrada = true;
                            swal(
                                "ACTIVIDAD CLAUSURADA",
                                "HA SELECCIONADO UNA ACTIVIDAD CLAUSURADA, ASEGURESE DE HABER MARCADO LA UBICACIÓN CORRECTA. SI CONSIDERA QUE ES UN ERROR, COMUNIQUESE CON LA UNIDAD DE PREVENCIÓN Y CONTROL AMBIENTAL A LAS ACTIVIDADES ECONÓMICAS E INDUSTRIAS: 67123590, EN HORARIOS DE OFICINA",
                                "error"
                            );
                            console.log(
                                "ACTIVIDAD CLAUSURADA NO SE LLAMA AL SERVICIO DE UBICACION"
                            );
                            break;
                        }
                    }
                    if (!encontrada) {
                        //servicio de ubicación INICIO
                        function ejecutarAjaxAmb(url, type, params, callback) {
                            var config = {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            };
                            if (type.toLowerCase() === "post") {
                                $http.post(url, params, config).then(
                                    function (response) {
                                        callback(response.data);
                                        $timeout(function () {
                                            $("#modalConfirmacionUbicacionActividad").modal("show");
                                        }, 0);
                                    },
                                    function (error) {
                                        console.error("Error al consumir el servicio:", error);
                                        callback(null);
                                    }
                                );
                            } else {
                                console.error("Tipo de llamada no soportado:", type);
                            }
                        }
                        //FORMULA INICIO
                        const utmCoords = latLonToUTM(centro_1[1], centro_1[0]);
                        console.log("COORDENADAS UTM:");
                        console.log("COORDENADAS UTM ESTE:", utmCoords.easting);
                        console.log("COORDENADAS UTM NORTE:", utmCoords.northing);
                        function latLonToUTM(lat, lon) {
                            // Parámetros del elipsoide WGS84
                            const a = 6378137.0; // Semieje mayor
                            const f = 1 / 298.257223563; // Aplanamiento
                            const k0 = 0.9996; // Factor de escala
                            // Cálculos del elipsoide
                            const e = Math.sqrt(1 - Math.pow(1 - f, 2));
                            const e1sq = (e * e) / (1 - e * e);
                            // Determinar la zona UTM
                            const zone = Math.floor((lon + 180) / 6) + 1;
                            // Calcular la longitud central de la zona
                            const λ0 = (((zone - 1) * 6 - 180 + 3) * Math.PI) / 180; // Convertir a radianes
                            // Convertir latitud y longitud a radianes
                            const φ = (lat * Math.PI) / 180;
                            const λ = (lon * Math.PI) / 180;
                            // Cálculos de proyección
                            const N = a / Math.sqrt(1 - e * e * Math.sin(φ) * Math.sin(φ));
                            const T = Math.tan(φ) * Math.tan(φ);
                            const C = e1sq * Math.cos(φ) * Math.cos(φ);
                            const A = Math.cos(φ) * (λ - λ0);
                            // Ecuaciones de la proyección
                            const M =
                                a *
                                ((1 -
                                    (e * e) / 4 -
                                    (3 * e * e * e * e) / 64 -
                                    (5 * e * e * e * e * e * e) / 256) *
                                    φ -
                                    ((3 * e * e) / 8 +
                                        (3 * e * e * e * e) / 32 +
                                        (45 * e * e * e * e * e * e) / 1024) *
                                    Math.sin(2 * φ) +
                                    ((15 * e * e * e * e) / 256 +
                                        (45 * e * e * e * e * e * e) / 1024) *
                                    Math.sin(4 * φ) -
                                    ((35 * e * e * e * e * e * e) / 3072) * Math.sin(6 * φ));
                            const x =
                                k0 *
                                N *
                                (A +
                                    ((1 - T + C) * Math.pow(A, 3)) / 6 +
                                    ((5 - 18 * T + T * T + 72 * C - 58 * e1sq) * Math.pow(A, 5)) /
                                    120);
                            let y =
                                k0 *
                                (M +
                                    N *
                                    Math.tan(φ) *
                                    ((A * A) / 2 +
                                        ((5 - T + 9 * C + 4 * C * C) * Math.pow(A, 4)) / 24 +
                                        ((61 - 58 * T + T * T + 600 * C - 330 * e1sq) *
                                            Math.pow(A, 6)) /
                                        720));
                            // Ajustar el valor de Y para el hemisferio sur
                            if (lat < 0) {
                                y += 10000000;
                            }
                            // Ajustar el valor de X con el falso este (false easting)
                            const easting = x + 500000;
                            const northing = y;
                            return {
                                zone: zone,
                                easting: easting,
                                northing: northing,
                            };
                        }
                        //FORMULA FIN (la función datosUbicacion() obtiene los datos de la actividad seleccionada en el mapa)
                        var coordenada =
                            "POINT(" + utmCoords.easting + " " + utmCoords.northing + ")";
                        console.log(coordenada);
                        $scope.datosUbicacion = function (functionResp) {
                            var urlComp =
                                "http://sim.lapaz.bo/sitolservicios/Regularizacion/wsBuscarDatosPredio";
                            var typeCall = "post";
                            var dataParams = {
                                wkt: coordenada,
                            };
                            ejecutarAjaxAmb(urlComp, typeCall, dataParams, functionResp);
                        };
                        $scope.datosUbicacion(function (resultado) {
                            console.log("UBICACION", resultado);
                            $scope.datosPredio = resultado;
                        });
                    }
                });

                reqwest({
                    url: url_zonas,
                    type: "json",
                }).then(function (data) {
                    var feature = data.features[0];
                    var zonaDeLaActividad = feature.properties.zona;
                    $scope.zonaDeActividad = zonaDeLaActividad;
                    console.log("Zonas: ", $scope.zonaDeActividad);
                });
            }

            var feature = new ol.Feature(
                new ol.geom.Point(ol.proj.fromLonLat(centro_1))
            );
            feature.setStyle(iconStyle);
            vectorSource.addFeature(feature);
        });
    }, 150);
};
