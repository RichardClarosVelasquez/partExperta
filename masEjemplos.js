function registroEEISController(
    $scope,
    $document,
    $rootScope,
    $routeParams,
    $location,
    $http,
    sessionService,
    CONFIG,
    ngTableParams,
    sweet,
    $filter,
    registroLog,
    filterFilter,
    FileUploader,
    fileUpload,
    obtFechaActual,
    wsRgistrarPubliciadad,
    $timeout,
    $q,
    $window
) {
    $scope.inicio = function () {
        amb = new dataAMB();

        $scope.recuperarDatosRegistro();
        $scope.prueba = "PRUEBAS";
        $scope.buscarConsultorSiExiste();
        $scope.listarSolicitudesDelConsultor();

        $scope.mapa_certificA(-16.527845681338594, -68.10574612409613);

        $scope.opcionesColindante = [
            "NORTE",
            "NOR OESTE",
            "OESTE",
            "SUR OESTE",
            "SUR",
            "SUR ESTE",
            "ESTE",
            "NOR ESTE",
            "SUPERIOR",
            "INFERIOR",
        ];
        $scope.csvFile = null;
        $scope.setFile = function (element) {
            $scope.$apply(function ($scope) {
                $scope.csvFile = element.files[0];
            });
        };

        $scope.csvFileRF = null;
        $scope.setFileRF = function (element) {
            $scope.$apply(function ($scope) {
                $scope.csvFileRF = element.files[0];
            });
        };
        $scope.datosProcesados = true;

        $scope.csvFile = null;
        $scope.setFile = function (element) {
            var csvFile = element.files[0];
            if (csvFile && csvFile.name.endsWith(".csv")) {
                console.log("FORMATO ACEPTADO");
                $scope.csvFile = csvFile;
                $scope.nombreCsvConActividad = csvFile.name; // YA OBTENEMOS EL ARCHIVO CON ACTIVIDAD
                $scope.botonSubirCA = false;
            } else {
                swal("Error", "Por favor seleccione un archivo CSV válido.", "error");
                element.value = ""; // Clear the input
                $scope.csvFile = null;
            }
            $scope.$apply();
        };

        $scope.csvFileRF = null;
        $scope.setFileRF = function (element) {
            var csvFileRF = element.files[0];
            if (csvFileRF && csvFileRF.name.endsWith(".csv")) {
                console.log("FORMATO ACEPTADO");
                $scope.csvFileRF = csvFileRF;
                $scope.nombreCsvRuidoFondo = csvFileRF.name; // YA OBTENEMOS EL ARCHIVO DE RUIDO DE FONDO
                $scope.botonSubirRF = false;
            } else {
                swal("Error", "Por favor seleccione un archivo CSV válido.", "error");
                element.value = ""; // Clear the input
                $scope.csvFileRF = null;
            }
            $scope.$apply();
        };

        $scope.pdfConclusiones = null;
        $scope.adjuntoConclusiones = function (element) {
            var pdfConclusiones = element.files[0];
            if (pdfConclusiones && pdfConclusiones.name.endsWith(".pdf")) {
                console.log("FORMATO ACEPTADO");
                $scope.pdfConclusiones = pdfConclusiones;
                $scope.nombreAdjuntoConclusiones = pdfConclusiones.name;
                $scope.botonSubirConclusiones = false;
            } else {
                swal(
                    "ARCHIVO NO ACEPTADO",
                    "EL ARCHIVO QUE ESTÁ INTENTANDO CARGAR DEBE ESTAR EN FORMATO PDF",
                    "warning"
                );
                element.value = ""; // Clear the input
                // $scope.elemento = "";
                $scope.pdfConclusiones = null;
            }
            $scope.$apply();
        };

        $scope.pdfRegistroFotografico = null;
        $scope.adjuntoRegFotografico = function (element) {
            var pdfRegistroFotografico = element.files[0];
            if (
                pdfRegistroFotografico &&
                pdfRegistroFotografico.name.endsWith(".pdf")
            ) {
                console.log("FORMATO ACEPTADO");
                $scope.pdfRegistroFotografico = pdfRegistroFotografico;
                $scope.nombreAdjuntoRegistroFotografico = pdfRegistroFotografico.name;
                $scope.botonSubirRegistroFotografico = false;
            } else {
                swal(
                    "ARCHIVO NO ACEPTADO",
                    "EL ARCHIVO QUE ESTÁ INTENTANDO CARGAR DEBE ESTAR EN FORMATO PDF",
                    "warning"
                );
                element.value = ""; // Clear the input
                // $scope.elemento = "";
                $scope.pdfRegistroFotografico = null;
            }
            $scope.$apply();
        };

        $scope.pdfNit = null;
        $scope.adjuntoNit = function (element) {
            var pdfNit = element.files[0];
            if (pdfNit && pdfNit.name.endsWith(".pdf")) {
                console.log("FORMATO ACEPTADO");
                $scope.pdfNit = pdfNit;
                $scope.nombreAdjuntoNit = pdfNit.name;
                $scope.botonSubirNit = false;
            } else {
                swal(
                    "ARCHIVO NO ACEPTADO",
                    "EL ARCHIVO QUE ESTÁ INTENTANDO CARGAR DEBE ESTAR EN FORMATO PDF",
                    "warning"
                );
                element.value = ""; // Clear the input
                // $scope.elemento = "";
                $scope.pdfNit = null;
            }
            $scope.$apply();
        };

        $scope.pdfPlanoDeActividad = null;
        $scope.adjuntoPlanoDeActividad = function (element) {
            var pdfPlanoDeActividad = element.files[0];
            if (pdfPlanoDeActividad && pdfPlanoDeActividad.name.endsWith(".pdf")) {
                console.log("FORMATO ACEPTADO");
                $scope.pdfPlanoDeActividad = pdfPlanoDeActividad;
                $scope.nombreAdjuntoPlanoDeActividad = pdfPlanoDeActividad.name;
                $scope.botonSubirPlanoDeActividad = false;
            } else {
                swal(
                    "ARCHIVO NO ACEPTADO",
                    "EL ARCHIVO QUE ESTÁ INTENTANDO CARGAR DEBE ESTAR EN FORMATO PDF",
                    "warning"
                );
                element.value = ""; // Clear the input
                // $scope.elemento = "";
                $scope.pdfPlanoDeActividad = null;
            }
            $scope.$apply();
        };

        $scope.pdfActaDeConstancia = null;
        $scope.adjuntoActaDeConstancia = function (element) {
            var pdfActaDeConstancia = element.files[0];
            if (pdfActaDeConstancia && pdfActaDeConstancia.name.endsWith(".pdf")) {
                console.log("FORMATO ACEPTADO");
                $scope.pdfActaDeConstancia = pdfActaDeConstancia;
                $scope.nombreAdjuntoActaDeConstancia = pdfActaDeConstancia.name;
                $scope.botonSubirActaDeConstancia = false;
            } else {
                swal(
                    "ARCHIVO NO ACEPTADO",
                    "EL ARCHIVO QUE ESTÁ INTENTANDO CARGAR DEBE ESTAR EN FORMATO PDF",
                    "warning"
                );
                element.value = ""; // Clear the input
                // $scope.elemento = "";
                $scope.pdfActaDeConstancia = null;
            }
            $scope.$apply();
        };

        $scope.pdfContratoDeAlquilerDeSonometro = null;
        $scope.adjuntoContratoDeAlquilerDeSonometro = function (element) {
            var pdfContratoDeAlquilerDeSonometro = element.files[0];
            if (
                pdfContratoDeAlquilerDeSonometro &&
                pdfContratoDeAlquilerDeSonometro.name.endsWith(".pdf")
            ) {
                console.log("FORMATO ACEPTADO");
                $scope.pdfContratoDeAlquilerDeSonometro =
                    pdfContratoDeAlquilerDeSonometro;
                $scope.nombreAdjuntoContratoDeAlquilerDeSonometro =
                    pdfContratoDeAlquilerDeSonometro.name;
                $scope.botonSubirContratoDeAlquilerDeSonometro = false;
            } else {
                swal(
                    "ARCHIVO NO ACEPTADO",
                    "EL ARCHIVO QUE ESTÁ INTENTANDO CARGAR DEBE ESTAR EN FORMATO PDF",
                    "warning"
                );
                element.value = "";
                $scope.pdfContratoDeAlquilerDeSonometro = null;
            }
            $scope.$apply();
        };

        $scope.pdfCertificadoDeCalibracion = null;
        $scope.adjuntoCertificadoDeCalibracion = function (element) {
            var pdfCertificadoDeCalibracion = element.files[0];
            if (
                pdfCertificadoDeCalibracion &&
                pdfCertificadoDeCalibracion.name.endsWith(".pdf")
            ) {
                console.log("FORMATO ACEPTADO");
                $scope.pdfCertificadoDeCalibracion = pdfCertificadoDeCalibracion;
                $scope.nombreAdjuntoCertificadoDeCalibracion =
                    pdfCertificadoDeCalibracion.name;
                $scope.botonSubirCertificadoDeCalibracion = false;
            } else {
                swal(
                    "ARCHIVO NO ACEPTADO",
                    "EL ARCHIVO QUE ESTÁ INTENTANDO CARGAR DEBE ESTAR EN FORMATO PDF",
                    "warning"
                );
                element.value = "";
                $scope.pdfCertificadoDeCalibracion = null;
            }
            $scope.$apply();
        };

        $scope.pdfPlanoUbicacionParlantes = null;
        $scope.adjuntoPlanoUbicacionParlantes = function (element) {
            var pdfPlanoUbicacionParlantes = element.files[0];
            if (
                pdfPlanoUbicacionParlantes &&
                pdfPlanoUbicacionParlantes.name.endsWith(".pdf")
            ) {
                console.log("FORMATO ACEPTADO");
                $scope.pdfPlanoUbicacionParlantes = pdfPlanoUbicacionParlantes;
                $scope.nombreAdjuntoPlanoUbicacionParlantes =
                    pdfPlanoUbicacionParlantes.name;
                $scope.botonSubirPlanoUbicacionParlantes = false;
            } else {
                swal(
                    "ARCHIVO NO ACEPTADO",
                    "EL ARCHIVO QUE ESTÁ INTENTANDO CARGAR DEBE ESTAR EN FORMATO PDF",
                    "warning"
                );
                element.value = "";
                $scope.pdfPlanoUbicacionParlantes = null;
            }
            $scope.$apply();
        };
    };

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
                        // 'STYLES': 'Default',
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
                                propertyName:
                                    "fid,idpredio,codigocatastral,estadopredio,codlote",
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
                                        ((5 - 18 * T + T * T + 72 * C - 58 * e1sq) *
                                            Math.pow(A, 5)) /
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
                            //FORMULA FIN
                            var coordenada =
                                "POINT(" + utmCoords.easting + " " + utmCoords.northing + ")";
                            console.log(coordenada);
                            $scope.datosUbicacion = function (functionResp) {
                                var urlComp =
                                    "http://sim.lapaz.bo/sitolservicios/Regularizacion/wsBuscarDatosPredio";
                                var typeCall = "post";
                                var dataParams = {
                                    // "wkt": "POINT(594581.2791619524 8175322.023515737)"
                                    wkt: coordenada,
                                };
                                ejecutarAjaxAmb(urlComp, typeCall, dataParams, functionResp);
                            };
                            // Llamar a datosUbicacion y manejar la respuesta
                            $scope.datosUbicacion(function (resultado) {
                                console.log("UBICACION", resultado);
                                $scope.datosPredio = resultado;
                            });
                            // Servicio de ubicación FIN
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

            // $scope.map.on('click', function (evt)
            // {
            //     datos = {};
            //     vectorSource.clear();

            //     var viewResolution = view.getResolution();

            //     var coord = $scope.map.getCoordinateFromPixel(evt.pixel);
            //     var centro = ol.proj.transform(coord,'EPSG:3857',epsg32719);
            //     var wkt = '';
            //     var centro_1 = ol.proj.transform(coord,'EPSG:3857',epsg4326);
            //     var latitud = centro_1[1];
            //     var longitud = centro_1[0];
            //     wkt = "POINT("+centro[0]+" "+centro[1]+")";

            //     datos.latitud = latitud;
            //     datos.longitud = longitud;
            //     $scope.datos.INT_AC_latitud=latitud;
            //     $scope.datos.INT_AC_longitud=longitud;

            //     var feature = $scope.map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
            //       return feature;
            //     });
            //     if (feature){
            //       var coord = feature.getGeometry().getCoordinates();
            //       var props = feature.getProperties();
            //     }
            //     else
            //     {
            //         //alert();
            //         var url_zonas_tributarias = zonas_tributarias_udit.getSource().getGetFeatureInfoUrl(
            //                   evt.coordinate,$scope.map.getView().getResolution(),$scope.map.getView().getProjection(),{
            //                     'INFO_FORMAT': 'application/json',
            //                     'propertyName': 'grupovalor'
            //                   }
            //                 );

            //         var url_zonas = zonas_udit.getSource().getGetFeatureInfoUrl(
            //                   evt.coordinate,$scope.map.getView().getResolution(),$scope.map.getView().getProjection(),{
            //                     'INFO_FORMAT': 'application/json',
            //                     'propertyName': 'zonaref,macrodistr,subalcaldi,codigozona,macro,distrito'
            //                   }
            //                 );

            //         var url_zonas_seguras = zonas_seguras_udit.getSource().getGetFeatureInfoUrl(
            //                   evt.coordinate,$scope.map.getView().getResolution(),$scope.map.getView().getProjection(),{
            //                     'INFO_FORMAT': 'application/json',
            //                     'propertyName': 'id'
            //                   }
            //                 );

            //         var url_vias = vias_udit.getSource().getGetFeatureInfoUrl(
            //                   evt.coordinate,$scope.map.getView().getResolution(),$scope.map.getView().getProjection(),{
            //                     'INFO_FORMAT': 'application/json',
            //                     'propertyName': 'nombrevia,tipovia'
            //                   }
            //                 );

            //         reqwest({
            //             url: url_zonas_tributarias,
            //             type: 'json',
            //         }).then(function(data)
            //         {
            //             var feature = data.features[0];
            //             var cod = feature.properties;
            //             var codigo_zona_tributaria = parseInt(cod.grupovalor.replace("-",""));
            //             $scope.datos.f01_idCodigoZona = codigo_zona_tributaria;
            //         });
            //         reqwest({
            //             url: url_zonas,
            //             type: 'json',
            //         }).then(function(data)
            //         {
            //             var feature = data.features[0];
            //             var cod = feature.properties;
            //             datos.zona = cod.zonaref;
            //             datos.cod_zona_sit = cod.codigozona;
            //             datos.distrito = cod.distrito;
            //             datos.macrodistrito = cod.macrodistr;
            //             var n_genesis = geo_id_genesis.length;
            //             for (var i=0;i<n_genesis;i++)
            //             {
            //                 if(geo_id_sit_servicio[i ]===cod.codigozona)
            //                 {
            //                     cod_zona_genesis = geo_id_genesis[i];
            //                     datos.cod_zona_genesis = cod_zona_genesis;
            //                 }
            //             }
            //         });
            //         reqwest({
            //             url: url_zonas_seguras,
            //             type: 'json',
            //         }).then(function(data)
            //         {
            //             var feature = data.features[0];
            //             if(feature == undefined)
            //             {
            //             }
            //             else
            //             {
            //                 var cod = feature.properties;
            //             }
            //         });
            //         reqwest({
            //             url: url_vias,
            //             type: 'json',
            //         }).then(function(data)
            //         {
            //             var feature = data.features[0];
            //             if(feature == undefined)
            //             {
            //             }
            //             else
            //             {
            //                 var cod = feature.properties;
            //             }
            //         });
            //     }
            //     var feature = new ol.Feature(
            //           new ol.geom.Point(ol.proj.fromLonLat(centro_1))
            //     );
            //     feature.setStyle(iconStyle);
            //     vectorSource.addFeature(feature);
            //     return datos;
            // });
            //////////////////////////////////////
        }, 150);
    };

    $scope.registroFormularioLimpio = function () {
        $scope.seMuestraSolicitudes = false;
        $scope.seMuestraFormulario = true;
        $scope.seMuestraHabilitado = false;
        $scope.seMuestraFormularioContinuacion = false;
    };

    $scope.registroFormulario = function () {
        $scope.seMuestraSolicitudes = false;
        $scope.seMuestraFormulario = true;
        $scope.mapaOcultado = true;
        $scope.seMuestraHabilitado = false;
        $scope.seMuestraFormularioContinuacion = true;
    };

    $scope.envioIdSol = function (id_solicitud) {
        var id_solicitud_para_mostrar = id_solicitud.listaSolicitudes.id_solicitud;
        $scope.idSolicitudSeleccionada = id_solicitud_para_mostrar;
        console.log("Controlador pa recibir el Id de Solicitud");
        console.log(id_solicitud_para_mostrar);
        //una vez que se tenga el id se cargar la tabla de datos del colindante
        $scope.listarColindantePorSolicitud();
        //una vez que se tenga el id se cargar la tabla de datos de los puntos de medicion
        $scope.listarPuntosCAyRF();
        //una vez que se tenga el id se cargará la lista de adjuntos de acuerdo a la solicitud
        $scope.listarConclusionesRegistroFotograficoAnexos();
        //una vez que se tenga el id se cargará la lista de sonometros por solicitud
        $scope.listarSonometro();
        // una vez que se tenga el id se cargará la lista de sonometros por solicitud
        $scope.listarFuenteSonora();
        // una vez que se tenga el id se cargará la lista de niveles por solicitud
        $scope.listarNivel();
    };

    $scope.ejecutarFile = function (idfile) {
        var sid = document.getElementById(idfile);
        if (sid) {
            document.getElementById(idfile).click();
        } else {
            alert("Error ");
        }
    };

    $scope.generarPunto = function () {
        var sid = document.getElementById(idfile);
        if (sid) {
            document.getElementById(idfile).click();
        } else {
            alert("Error ");
        }
    };

    $scope.modalPtoExteriorInterior = function (value) {
        $scope.escogerPunto = false;
        $scope.campoModificarPunto = true;
        $scope.modalPtoIntExt = value;
        $scope.btnGuaradarPuntoDeMedidicion = false;
        $scope.btnModificarPunto = true;
        $scope.registroPuntosMedicion = "";
        $scope.csvFile = "";
        $scope.csvFileRF = "";

        if (value == "INTERIOR") {
            var puntosInternos = $scope.puntosInterioresCAyRFparaEditarEliminar;
            console.log("SE ESTA RECIBIENDO: ", puntosInternos);

            if (puntosInternos.length == 0) {
                $scope.registroPuntosMedicion = {
                    nroPunto: 1,
                };
            } else {
                $scope.registroPuntosMedicion = {
                    nroPunto: puntosInternos[puntosInternos.length - 1].nro_punto_ca + 1,
                };
            }
        } else if (value == "EXTERIOR") {
            var puntosExternos = $scope.puntosExterioresCAyRFparaEditarEliminar;
            console.log("SE ESTA RECIBIENDO: ", puntosExternos);

            if (puntosExternos.length == 0) {
                $scope.registroPuntosMedicion = {
                    nroPunto: 1,
                };
            } else {
                $scope.registroPuntosMedicion = {
                    nroPunto: puntosExternos[puntosExternos.length - 1].nro_punto_ca + 1,
                };
            }
        }
        $timeout(function () {
            $("#modalPuntosMedicion").modal("show");
        }, 0);
    };

    $scope.listaConsultores = function () {
        amb.lstConsultor(function (resultado) {
            console.log(resultado);
            $scope.test1 = resultado;
        });
    };

    $scope.insertarConsultor = function (registroConsultor) {
        console.log("INSERTAR CONSULTOR");
        if (registroConsultor.comp == undefined) {
            registroConsultor.comp = "";
        }
        if (registroConsultor.tercerap == undefined) {
            registroConsultor.tercerap = "";
        }
        //console.log(registroConsultor.expedido.id_departamento);
        amb.insertarConsultor(
            registroConsultor.doc,
            registroConsultor.comp,
            registroConsultor.expedido.id_departamento,
            registroConsultor.nombres,
            registroConsultor.paterno,
            registroConsultor.materno,
            registroConsultor.tercerap,
            registroConsultor.prof,
            registroConsultor.fechaEmisionRenca,
            registroConsultor.nrorenca,
            registroConsultor.domicilio,
            registroConsultor.correo,
            registroConsultor.telef,
            function (resultado) {
                console.log(resultado);
                $scope.test2 = resultado;
            }
        );
    };

    $scope.listarDepartamento = function () {
        console.log("Obtener Departamento desde BD");
        amb.listarDepartamento(function (resultado3) {
            // valor = new resultado.success.data[2].departamento;
            console.log(resultado3);
            $scope.resultadoJSON = JSON.parse(resultado3); //LAS VARIABLES CON SCOPE SE PUEDEN VER EN LA VISTA
            $scope.listaexp = $scope.resultadoJSON.success.data;
            console.log($scope.listaexp);
        });
    };

    var aReg = {
        cedula: "",
        complemento: "",
        celular: "",
        correo: "",
        direccion: "",
        estado_civil: "",
        fecha_nacimiento: "",
        materno: "",
        nombre: "",
        profesion: "",
        paterno: "",
        sexo: "",
        telefono: "",
        cedula2: "",
        nit2: "",
        complemento2: "",
        repLegal: "",
        nroDocumento: "",
        nroNotaria: "",
        nit: "",
        razonSocial: "",
        tipoP: "",
        cestcivil_id: "",
        expedido: "",
    };

    $scope.recuperarDatosRegistro = function () {
        var datosCiudadano = new rcNatural();
        datosCiudadano.oid = sessionService.get("IDCIUDADANO");
        datosCiudadano.datosCiudadanoNatural(function (resultado) {
            var response = JSON.parse(resultado);
            if (response.length > 0) {
                var results = response;
                tipoPersona = results[0].dtspsl_tipo_persona;
                if (tipoPersona == "NATURAL") {
                    $scope.datospersonaNatural = null;
                    $scope.datospersonaJuridica = "ocultar";
                    aReg.nombre = results[0].dtspsl_nombres;
                    aReg.paterno = results[0].dtspsl_paterno;
                    aReg.materno = results[0].dtspsl_materno;
                    aReg.cedula = results[0].dtspsl_ci;
                    aReg.expedido = results[0].dtspsl_expedido;
                    aReg.sexo = results[0].dtspsl_sexo == "M" ? "MASCULINO" : "FEMENINO";
                    aReg.fecha_nacimiento = results[0].dtspsl_fec_nacimiento;
                    aReg.profesion = results[0].dtspsl_profesion;
                    aReg.direccion = results[0].dtspsl_direccion;
                    aReg.correo = results[0].dtspsl_correo;
                    aReg.telefono = results[0].dtspsl_telefono;
                    aReg.celular = results[0].dtspsl_movil;
                    aReg.oidConsultor = results[0]._id;
                    angelNatural = aReg;
                } else {
                    $scope.datospersonaJuridica = null;
                    $scope.datospersonaNatural = "ocultar";
                    aReg.nombre = results[0].dtspsl_nombres;
                    aReg.paterno = results[0].dtspsl_paterno;
                    aReg.materno = results[0].dtspsl_materno;
                    aReg.cedula = results[0].dtspsl_ci;
                    aReg.repLegal = results[0].dtspsl_poder_replegal;
                    aReg.nroNotaria = results[0].dtspsl_nro_notaria;
                    aReg.nroDocumento = results[0].dtspsl_nro_documento;
                    aReg.oidConsultor = results[0]._id;
                    //DATOS INICIALES REGISTRO CIUDADANO
                    aReg.razonSocial = results[0].dtspsl_razon_social;
                    aReg.telefono = results[0].dtspsl_telefono;
                    aReg.celular = results[0].dtspsl_movil;
                    aReg.correo = results[0].dtspsl_correo;
                    aReg.nit = results[0].dtspsl_nit;
                    aReg.direccion = results[0].dtspsl_direccion;
                    aReg.nrocasa = results[0].dtspsl_numero_casa;
                    aReg.nrooficina = results[0].dtspsl_oficina;
                }
                switch (aReg.expedido) {
                    case "1":
                        aReg.expedido = "CHQ";
                        break;
                    case "2":
                        aReg.expedido = "LPZ";
                        break;
                    case "3":
                        aReg.expedido = "CBB";
                        break;
                    case "4":
                        aReg.expedido = "ORU";
                        break;
                    case "5":
                        aReg.expedido = "PTS";
                        break;
                    case "6":
                        aReg.expedido = "TJA";
                        break;
                    case "7":
                        aReg.expedido = "SCZ";
                        break;
                    case "8":
                        aReg.expedido = "BNI";
                        break;
                    case "9":
                        aReg.expedido = "PND";
                        break;
                }
            } else {
                console.log(
                    "No se encontraron los datos del ciudadano!!",
                    sessionService.get("IDCIUDADANO")
                );
            }
            $scope.test4 = [
                aReg.nombre,
                aReg.paterno,
                aReg.materno,
                aReg.cedula,
                aReg.expedido,
                aReg.profesion,
                aReg.direccion,
                aReg.correo,
                aReg.telefono,
                aReg.oidConsultor,
                aReg.celular,
            ];
            // $scope.consultor = aReg.celular;
        });
    };

    $scope.representanteLegal = function () {
        console.log("CONTROLADOR PARA LLAMAR AL REPRESENTANTE LEGAL");
        amb.llamarRepresentateLegal(
            $scope.idSolicitudSeleccionada,
            $scope.test4[9],
            function (resultado) {
                console.log("SOLICITUD");
                console.log($scope.idSolicitudSeleccionada);
                console.log("OID DEL CONSULTOR");
                console.log($scope.test4[9]);
                var datos = JSON.parse(resultado);
                $scope.oidCiudadadano = datos.success.data[0].id_ciudadano;
                $scope.repLegal = datos.success.data[0];
            }
        );
    };

    $scope.listarSolicitudesDelConsultor = function () {
        console.log("Controlador para listar las solicitudes de un consultor");
        var id_consltQueTieneSolicitudes = $scope.test4[9];
        amb.listarSolicitudesDelConsultor(
            id_consltQueTieneSolicitudes,
            function (listaSolicitudesConsultor) {
                listaSolicitudesConsultor = JSON.parse(listaSolicitudesConsultor);

                console.log("IDE DEL CONSULTOR ULTIMO: ", $scope.idestadoConsultor);
                var RESPUESTA = listaSolicitudesConsultor;
                if (
                    RESPUESTA.success.data.length === 0 &&
                    RESPUESTA.success.code == 200 &&
                    $scope.idestadoConsultor === 1
                ) {
                    $scope.seMuestraSolicitudes = false;
                    $scope.seMuestraFormulario = false;
                    $scope.seMuestraHabilitado = false;
                    $scope.seMuestraVacio = true;
                    $scope.seMuestraFormularioContinuacion = false;
                } else {
                    console.log("RESPUESTA DESDE LA CONSULTA", listaSolicitudesConsultor);
                    $scope.listaSolicitudCons = listaSolicitudesConsultor.success.data;
                }
            }
        );
    };

    $scope.insertarFrmRegistroEeis = function (registroEeis) {
        console.log("INSERCION DE EEIS: ", registroEeis);
        var oid_consultor = $scope.test4[9];
        var id_solicitud = $scope.idSolicitudSeleccionada;
        amb.insertarFrmRegistroEeis(
            registroEeis.tipoActividad,
            registroEeis.razonSocial,
            registroEeis.subalcaldia,
            registroEeis.avenida,
            registroEeis.numero,
            registroEeis.edificio,
            registroEeis.depto,
            registroEeis.entreCalles1,
            registroEeis.entreCalles2,
            registroEeis.telefono,
            registroEeis.apertura,
            registroEeis.cierre,
            registroEeis.tenencia,
            registroEeis.nombreActividad,

            registroEeis.macrodistrito,
            registroEeis.distrito,
            // registroEeis.niveles,
            // registroEeis.superficieInterior,
            // registroEeis.alturaInterior,
            // registroEeis.volumen,
            registroEeis.bloque,
            registroEeis.piso,
            registroEeis.zona,
            id_solicitud,
            oid_consultor,
            function (resultado) {
                console.log(resultado);
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal(
                        "",
                        "LOS DATOS DE LA ACTIVIDAD SE HAN GUARDADO CORRECTAMENTE",
                        "success"
                    );
                    $scope.listarActividadEeisSonometroFuente();
                } else {
                    swal("", "NO SE GUARDO CORRECTAMENTE", "error");
                }
            }
        );
    };

    $scope.insertarFrmRegistroFteSonora = function (registroSonora) {
        console.log("Controlador para insertar los registros de fuente sonora");
        var oid_consultor = $scope.test4[9];
        var id_solicitud = $scope.idSolicitudSeleccionada; //AQUI SE PUSO EL INDICE DE LA SOLICITUD PARA ENVIAR AL STORED PROCEDURE (ANTES ESTABA EL EJEMPLO CON ID=5)
        amb.insertarRegistroFuenteSonora(
            registroSonora.tipoFuente,
            registroSonora.potenciaEquipo,
            registroSonora.nroParlantes,
            registroSonora.propiedad,
            id_solicitud,
            oid_consultor,
            function (resultado) {
                console.log(resultado);

                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal(
                        "",
                        "LOS DATOS DE LA FUENTE SONORA SE HAN GUARDADO CORRECTAMENTE",
                        "success"
                    );
                    $scope.listarActividadEeisSonometroFuente();
                } else {
                    swal("", "NO SE GUARDO CORRECTAMENTE", "error");
                }
            }
        );
    };

    $scope.insertarFrmRegistroSonometro = function (registroSonometro) {
        console.log("Controlador para insertar los registros de fuente sonora");
        var oid_consultor = $scope.test4[9];
        var id_solicitud = $scope.idSolicitudSeleccionada; //AQUI SE PUSO EL INDICE DE LA SOLICITUD PARA ENVIAR AL STORED PROCEDURE (ANTES ESTABA EL EJEMPLO CON ID=5)
        var oid_ciudadano = $scope.oidCiudadadano;
        console.log(
            "Se mostrará si el id llegó a la función insertarFrmRegistroSonometro"
        );
        console.log(id_solicitud);
        amb.insertarSonometro(
            registroSonometro.equipo,
            registroSonometro.marca,
            registroSonometro.modelo,
            registroSonometro.nroSerie,
            registroSonometro.clase,
            registroSonometro.fechaCalibracion,
            registroSonometro.titularEquipo,
            //registroSonometro.fechaEnsayoEqp,
            id_solicitud,
            oid_ciudadano,
            oid_consultor,
            function (resultado) {
                console.log(resultado);
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal(
                        "",
                        "LOS DATOS DEL SONOMETRO SE HAN GUARDADO CORRECTAMENTE",
                        "success"
                    );
                    // $scope.listarActividadEeisSonometroFuente();
                    $scope.listarSonometro();
                } else {
                    swal("", "NO SE GUARDO CORRECTAMENTE", "error");
                }
            }
        );
    };

    $scope.insertarF1FrmRegistroColindante = function (
        registroColindante,
        radiotipoactividad
    ) {
        console.log(
            "Controlador para insertar los registros de fuente sonora y  TAMBIEN: ",
            radiotipoactividad
        );
        var oid_consultor = $scope.test4[9];
        var id_solicitud = $scope.idSolicitudSeleccionada;
        console.log(
            "Se mostrará si el id llegó a la funcion insertarFrmRegistroColindante"
        );
        console.log(id_solicitud);
        if (registroColindante.nomActColindante == undefined) {
            registroColindante.nomActColindante = "";
        }
        if (registroColindante.hrAperturaColindante == undefined) {
            registroColindante.hrAperturaColindante = "02:53:47";
        }
        if (registroColindante.hrCierreColindante == undefined) {
            registroColindante.hrCierreColindante = "02:53:47";
        }
        amb.insertarF1RegistroColindante(
            id_solicitud,
            registroColindante.colindante,
            //registroColindante.radiotipoactividad,
            radiotipoactividad,
            registroColindante.nomActColindante,
            registroColindante.calleAvNro,
            registroColindante.nombPropColindante,
            registroColindante.apPatColindante,
            registroColindante.apMatColindante,
            registroColindante.hrAperturaColindante,
            registroColindante.hrCierreColindante,
            function (resultado) {
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal(
                        "REGISTRO GUARDADO",
                        "SE HA REGISTRADO EL COLINDANTE",
                        "success"
                    );
                } else {
                    swal("", "ERROR REGISTRANDO EL COLINDANTE", "error");
                }
            }
        );
    };

    $scope.listarColindantePorSolicitud = function () {
        console.log("Controlador para listar los Colindantes por Solicitud");
        var id_consltQueTieneSolicitudes = $scope.test4[9];
        var id_solic_colindante = $scope.idSolicitudSeleccionada;
        console.log(id_solic_colindante);
        amb.listarColindantePorSolicitud(
            id_solic_colindante,
            function (listaColindantesPorSolic) {
                // valor = new resultado.success.data[2].departamento;

                listaColindantesPorSolic = JSON.parse(listaColindantesPorSolic);

                if (
                    listaColindantesPorSolic.success.data.length >= 1 &&
                    listaColindantesPorSolic.success.code == 200
                ) {
                    $scope.listaColinPorSolic = listaColindantesPorSolic.success.data;
                    // var listaColindantes = listaColindantesPorSolic.success.data;
                    $scope.cambiados = listaColindantesPorSolic.success.data;
                    console.log("Lista de Colindantes Devuelta");
                    console.log($scope.listaColinPorSolic);

                    // var datosColindantesModificados = listaColindantes.map(function (colindanteModificado) {
                    // 	colindanteModificado.horario = "De: " + colindanteModificado.hora_apertura_colindante + " a: " + colindanteModificado.hora_cierre_colindante;
                    // 	if (colindanteModificado.horario == "De: 02:53:47 a: 02:53:47") colindanteModificado.horario = "CONSTANTEMENTE";
                    // 	colindanteModificado.titular = colindanteModificado.nombre_propietario_colindante + " " + colindanteModificado.ap_pat_propietario_colindante + " " + colindanteModificado.ap_mat_propietario_colindante;
                    // 	return colindanteModificado;
                    // });

                    // $scope.cambiados = datosColindantesModificados;
                    // console.log("Lista de Colindantes Modificada");
                    // console.log(datosColindantesModificados);
                    // $scope.longitudListaColindantes = datosColindantesModificados.length;
                    // console.log($scope.longitudListaColindantes);
                    $scope.ocultarTablaColindante = "false";
                } else {
                    console.log(
                        "Error recuperando los colindantes o aún no hay registros"
                    );
                    $scope.ocultarTablaColindante = "true";
                }
            }
        );
    };

    $scope.llamarColindanteParaEditar = function (todo) {
        console.log("Controlador que llama al colindante escogido para editar");
        var ide_del_colindante = todo.listaColindantes.id_colindante;

        var id_solicitud = $scope.idSolicitudSeleccionada;
        amb.listarColindanteParaModificacion(
            id_solicitud,
            ide_del_colindante,
            function (colindanteAEditar) {
                var colindanteAEditarParseado = JSON.parse(colindanteAEditar);
                console.log("COLINDANTE A EDITAR");
                console.log(colindanteAEditarParseado);
                colindanteUbicparseado =
                    colindanteAEditarParseado.success.data[0].ubicacion_colindante;
                colindanteUbicparseado = colindanteUbicparseado.toString();
                var direccionColindante =
                    colindanteAEditarParseado.success.data[0].direccion_colindante;

                tipoActividadparseado =
                    colindanteAEditarParseado.success.data[0].tipo_actividad_colindante;
                tipoActividadparseado = tipoActividadparseado.toString();

                var nombrePropietarioColindante =
                    colindanteAEditarParseado.success.data[0]
                        .nombre_propietario_colindante;
                var paternoPropietarioColindante =
                    colindanteAEditarParseado.success.data[0]
                        .ap_pat_propietario_colindante;
                var maternoPropietarioColindante =
                    colindanteAEditarParseado.success.data[0]
                        .ap_mat_propietario_colindante;
                var nombreActividadColindante =
                    colindanteAEditarParseado.success.data[0].nombre_actividad_colindante;
                var horaAperturaColindante =
                    colindanteAEditarParseado.success.data[0].hora_apertura_colindante;
                var horaCierreColindante =
                    colindanteAEditarParseado.success.data[0].hora_cierre_colindante;

                $scope.registroColindante = {
                    colindante: colindanteUbicparseado,
                    nombPropColindante: nombrePropietarioColindante,
                    calleAvNro: direccionColindante,
                    apPatColindante: paternoPropietarioColindante,
                    radiotipoactividad: tipoActividadparseado,
                    apMatColindante: maternoPropietarioColindante,
                    nomActColindante: nombreActividadColindante,
                    hrAperturaColindante: horaAperturaColindante,
                    hrCierreColindante: horaCierreColindante,
                    ideColindante: ide_del_colindante,
                };

                if (paternoPropietarioColindante === "PROPORCIONO") {
                    $scope.radioDatosPersonales = "NO";
                    $scope.datosPropietarioColindante = true;
                    $scope.noo = false;
                    $scope.sii = true;
                    // $scope.registroColindante.nomActColindante = null;
                    // $scope.registroColindante.hrAperturaColindante = null;
                    // $scope.registroColindante.hrCierreColindante = null;
                } else {
                    $scope.radioDatosPersonales = "SI";
                    $scope.datosPropietarioColindante = false;
                    $scope.noo = true;
                    $scope.sii = false;
                }

                if (horaAperturaColindante === "02:53:47") {
                    $scope.radiotipoactividad = "DomicilioParticular";
                    $scope.campoOtraActividad = true;
                    $scope.registroColindante.nomActColindante = " ";
                    $scope.registroColindante.hrAperturaColindante = " ";
                    $scope.registroColindante.hrCierreColindante = " ";
                    $scope.domicilio = true;
                    $scope.otro = false;
                } else {
                    $scope.radiotipoactividad = "Otro";
                    $scope.campoOtraActividad = false;
                    $scope.domicilio = false;
                    $scope.otro = true;
                }
            }
        );
    };

    $scope.modificarColindante = function (registroColindante) {
        console.log(
            "Controlador para insertar los registros de fuente sonora, estos datos estan llegando"
        );
        console.log(registroColindante);
        console.log("Hora pertura");
        console.log(registroColindante.hrAperturaColindante);
        console.log("Hora Cierre");
        console.log(registroColindante.hrCierreColindante);

        var oid_consultor = $scope.test4[9];
        var id_solicitud = $scope.idSolicitudSeleccionada;
        if (registroColindante.nomActColindante == undefined) {
            registroColindante.nomActColindante = "";
        }
        if (
            registroColindante.hrAperturaColindante == undefined ||
            registroColindante.hrAperturaColindante == " "
        ) {
            registroColindante.hrAperturaColindante = "02:53:47";
        }
        if (
            registroColindante.hrCierreColindante == undefined ||
            registroColindante.hrCierreColindante == " "
        ) {
            registroColindante.hrCierreColindante = "02:53:47";
        }
        amb.modificarColindantePorSolicitud(
            registroColindante.colindante,
            registroColindante.radiotipoactividad,
            registroColindante.nomActColindante,
            registroColindante.calleAvNro,
            registroColindante.nombPropColindante,
            registroColindante.apPatColindante,
            registroColindante.apMatColindante,
            registroColindante.hrAperturaColindante,
            registroColindante.hrCierreColindante,
            id_solicitud,
            registroColindante.ideColindante,
            function (resultado) {
                console.log(resultado);
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal(
                        "DATOS MODIFICADOS",
                        "LOS DATOS DEL COLINDANTE SE HAN MODIFICADO CON EXITO",
                        "success"
                    );
                    $scope.mapaOcultado = true;
                    $scope.seMuestraFormularioContinuacion = true;
                } else {
                    swal("", "ERROR AL MODIFICAR DATOS DEL COLINDANTE", "error");
                }
            }
        );
    };

    $scope.eliminarColindante = function (todo) {
        $scope.todo = todo;
        $scope.actividadColindante =
            todo.listaColindantes.tipo_actividad_colindante;
        $scope.titularColindante = todo.listaColindantes.titular;
        $scope.tipoColindante = todo.listaColindantes.ubicacion_colindante;
        $timeout(function () {
            $("#modalConfirmacionEliminarColindante").modal("show");
        }, 0);
    };

    $scope.confirmarEliminacionDeColindante = function () {
        var todo = $scope.todo;
        console.log("Controlador para eliminar colindantes");
        var ide_del_colindante = todo.listaColindantes.id_colindante;
        var id_solicitud = $scope.idSolicitudSeleccionada;
        amb.eliminarColindante(
            id_solicitud,
            ide_del_colindante,
            function (resultado) {
                console.log(resultado);
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal(
                        "DATOS ELIMINADOS",
                        "EL COLINDANTE SE HA ELIMINADO CON EXITO",
                        "success"
                    );
                    $scope.mapaOcultado = true;
                    $scope.seMuestraFormularioContinuacion = true;
                } else {
                    swal("NO SE ELIMINÓ", "ERROR AL ELIMINAR AL COLINDANTE", "error");
                }
            }
        );
    };

    $scope.deshabilitarDatosPersonalesColindante = function () {
        $scope.datosPropietarioColindante = true;
        $scope.noo = false;
        $scope.sii = true;
        $scope.registroColindante.nombPropColindante = "NO";
        $scope.registroColindante.apPatColindante = "PROPORCIONO";
        $scope.registroColindante.apMatColindante = "DATOS";
    };

    $scope.habilitarDatosPersonalesColindante = function () {
        $scope.datosPropietarioColindante = false;
        $scope.noo = true;
        $scope.sii = false;
        $scope.registroColindante.nombPropColindante = null;
        $scope.registroColindante.apPatColindante = null;
        $scope.registroColindante.apMatColindante = null;
    };

    $scope.deshabilitarTipoActividad = function () {
        $scope.campoOtraActividad = true;
        $scope.domicilio = true;
        $scope.otro = false;
        $scope.registroColindante.nomActColindante = "Domicilio Particular";
        $scope.registroColindante.hrAperturaColindante = "02:53:47";
        $scope.registroColindante.hrCierreColindante = "02:53:47";
    };

    $scope.habilitarTipoActividad = function () {
        $scope.campoOtraActividad = false;
        $scope.domicilio = false;
        $scope.otro = true;
        $scope.registroColindante.nomActColindante = null;
        $scope.registroColindante.hrAperturaColindante = null;
        $scope.registroColindante.hrCierreColindante = null;
    };

    $scope.uploadCSV_CA = function () {
        // var file = $scope.csvFile;
        if ($scope.csvFile) {
            readFileAsText($scope.csvFile)
                .then((csvData) => {
                    var numeros = csvData.split(/\s+/).map(Number);
                    numeros.length = numeros.length - 1;
                    $scope.$apply(function () {
                        console.log("SE PUDO LEER CON ACTIVIDAD!!!!!!!!!!");
                        $scope.numeros = numeros;
                        console.log("Y en esta cantidad: ", numeros.length);

                        var intext = $scope.modalPtoIntExt;
                        if (intext == "INTERIOR") {
                            intext = 1;
                            var limite = 300;
                            var lugar = "INTERIOR";
                        } else if (intext == "EXTERIOR") {
                            intext = 0;
                            var limite = 600;
                            var lugar = "EXTERIOR";
                        }
                        if (numeros.length < limite) {
                            swal(
                                "CANTIDAD DE DATOS NO PERMITIDA",
                                "PARA MEDICIONES AL " +
                                lugar +
                                " SE DEBE TOMAR " +
                                limite +
                                " PUNTOS",
                                "error"
                            );
                        } else {
                            swal(
                                "CANTIDAD DE DATOS Y FORMATO ACEPTADOS",
                                "LOS DATOS SE HAN LEIDO CORRECTAMENTE",
                                "success"
                            );
                        }
                        $scope.botonSubirCA = true;
                    });
                })
                .catch((error) => {
                    console.error("ERROR AL LEER EL ARCHIVO: ", error);
                    swal("ERROR", "NO SE PUDO LEER LOS DATOS", "error");
                });
        } else {
            swal(
                "ERROR",
                "EL FORMATO NO ES ACEPTADO O EL ARCHIVO NO SE PUDO LEER",
                "error"
            );
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

    $scope.uploadCSV_RF = function () {
        // var file = $scope.csvFile;
        if ($scope.csvFileRF) {
            readFileAsTextRF($scope.csvFileRF)
                .then((csvData) => {
                    var numerosRF = csvData.split(/\s+/).map(Number);
                    numerosRF.length = numerosRF.length - 1;
                    $scope.$apply(function () {
                        console.log("SE PUDO LEER EL CON RUIDO DE FONDO!!!!!!!!!!");
                        // swal('EXITO!', "DATOS LEÍDOS CORRECTAMENTE", 'success')
                        $scope.numerosRF = numerosRF;

                        var intext = $scope.modalPtoIntExt;
                        if (intext == "INTERIOR") {
                            intext = 1;
                            var limite = 300;
                            var lugar = "INTERIOR";
                        } else if (intext == "EXTERIOR") {
                            intext = 0;
                            var limite = 600;
                            var lugar = "EXTERIOR";
                        }
                        if (numerosRF.length < limite) {
                            swal(
                                "CANTIDAD DE DATOS NO PERMITIDA",
                                "PARA MEDICIONES AL " +
                                lugar +
                                " SE DEBE TOMAR " +
                                limite +
                                " PUNTOS",
                                "error"
                            );
                        } else {
                            swal(
                                "CANTIDAD DE DATOS Y FORMATO ACEPTADOS",
                                "LOS DATOS SE HAN LEIDO CORRECTAMENTE",
                                "success"
                            );
                        }

                        $scope.botonSubirRF = true;
                    });
                })
                .catch((error) => {
                    console.error("ERROR AL LEER LOS DATOS, CARGUE NUEVAMENTE: ", error);
                });
        } else {
            swal("ERROR", "EL FORMATO NO ES ACEPTADO", "error");
        }
    };

    function readFileAsTextRF(file) {
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

    $scope.insertarPuntosMedicion = function (registroPuntosMedicion) {
        if ($scope.csvFile && $scope.csvFileRF) {
            var id_solicitud = $scope.idSolicitudSeleccionada;
            var numerosCA = $scope.numeros;
            var numerosRF = $scope.numerosRF;
            var longitudCA = numerosCA.length;
            var longitudRF = numerosRF.length;
            var tmre_t60_nse = 0;
            var intext = $scope.modalPtoIntExt;
            if (intext == "INTERIOR") {
                intext = 1;
                var limite = 300;
                var lugar = "INTERIOR";
            } else if (intext == "EXTERIOR") {
                intext = 0;
                var limite = 600;
                var lugar = "EXTERIOR";
            }

            if (longitudCA < limite && longitudRF < limite) {
                swal(
                    "",
                    "AMBOS ARCHIVOS CARGADOS TIENEN MENOS DE " +
                    limite +
                    " DATOS, PARA MEDICIONES AL " +
                    lugar +
                    " LA CANTIDAD MÍNIMA DE DATOS DEBE SER " +
                    limite +
                    " POR PUNTO",
                    "error"
                );
            } else if (longitudCA < limite && longitudRF >= limite) {
                swal(
                    "",
                    "EL ARCHIVO DE MEDICION CON ACTIVIDAD TIENE MENOS DE " +
                    limite +
                    " DATOS, PARA MEDICIONES AL " +
                    lugar +
                    " DE LA ACTIVIDAD, LA CANTIDAD MÍNIMA DEBE SER " +
                    limite +
                    " DATOS POR PUNTO",
                    "error"
                );
            } else if (longitudCA >= limite && longitudRF < limite) {
                swal(
                    "",
                    "EL ARCHIVO DE MEDICION CON RUIDO DE FONDO TIENE MENOS DE " +
                    limite +
                    " DATOS, PARA MEDICIONES AL " +
                    lugar +
                    " DE LA ACTIVIDAD, LA CANTIDAD MÍNIMA DEBE SER " +
                    limite +
                    " DATOS POR PUNTO",
                    "error"
                );
            } else if (longitudCA >= limite && longitudRF >= limite) {
                console.log("ENTRAMOS AL SERVICIO");
                console.log("SERVICIO CON ACTIVIDAD");

                $scope.leq_ca = calculoDeLeq($scope.numeros);
                $scope.leq_rf = calculoDeLeq($scope.numerosRF);

                function calculoDeLeq(array) {
                    let fraccion = array.map((numeros) => numeros / 10);
                    let sumandos = fraccion.map((numeros) => Math.pow(10, numeros));
                    let sumatoria = sumandos.reduce(
                        (acumulador, valorActual) => acumulador + valorActual,
                        0
                    );
                    let longitud = array.length;
                    return 10 * Math.log10(sumatoria / longitud);
                }

                $scope.leq_10_ca = calculoDePercentil($scope.numeros, 10);
                $scope.leq_90_ca = calculoDePercentil($scope.numeros, 90);
                $scope.leq_10_rf = calculoDePercentil($scope.numerosRF, 10);
                $scope.leq_90_rf = calculoDePercentil($scope.numerosRF, 90);

                function calculoDePercentil(array, percentil) {
                    array.sort((a, b) => a - b); // Ordenar el array de menor a mayor
                    let N = array.length; // Calcular la posición
                    let P = (percentil / 100) * (N - 1);
                    let k = Math.floor(P); // Interpolación
                    let d = P - k;
                    if (k < 0) {
                        return array[0]; // Si la posición calculada es menor que 0, retornar el valor mínimo
                    }
                    if (k >= N - 1) {
                        return array[N - 1]; // Si la posición calculada es mayor o igual que N-1, retornar el valor máximo
                    }
                    return array[k] + d * (array[k + 1] - array[k]); // Interpolación lineal
                }

                if ($scope.modalPtoIntExt == "INTERIOR") {
                    $scope.tmre_t60_nse_ca =
                        16 / Math.pow(2, ($scope.leq_10_ca - 80) / 5); // Debe cambiarase para el valor de TMRE
                    $scope.tmre_t60_nse_rf = 3; // Debe incluirse el T60
                } else if ($scope.modalPtoIntExt == "EXTERIOR") {
                    $scope.tmre_t60_nse_ca = $scope.leq_ca;
                    $scope.tmre_t60_nse_rf = $scope.leq_rf;
                }

                var guardadoCsvCA = new Promise(function (resolve, reject) {
                    var banderaConActividad = 0;
                    let rutaAdjuntoCsvConActividad =
                        "/RC_CLI/" +
                        String($scope.test4[9]) +
                        "/" +
                        String($scope.nombreCsvConActividad) +
                        "/";
                    var fd = new FormData();
                    fd.append("archivo", $scope.csvFile);
                    fd.append("ruta", rutaAdjuntoCsvConActividad);
                    fd.append("nombrea", $scope.nombreCsvConActividad);
                    fd.append("oid", $scope.test4[9]);
                    var deferred = $q.defer();
                    $http
                        .post("http://192.168.5.141:8003/wsRCPG/subirArchivo", fd, {
                            headers: { "Content-Type": undefined },
                            transformRequest: angular.identity,
                        })
                        .then(function (data) {
                            deferred.resolve(data.data);
                            if (data.data.Success && data.data.code == 200) {
                                $scope.enlaceDescargaReporteFotografico = data.data.Success;
                                amb.insertarPuntoMedicionEeis(
                                    id_solicitud,
                                    registroPuntosMedicion.nroPunto,
                                    registroPuntosMedicion.nombreUbicacion,
                                    registroPuntosMedicion.horaInicioMedicionCA,
                                    registroPuntosMedicion.horaFinalMedicionCA,
                                    $scope.leq_ca,
                                    $scope.leq_90_ca,
                                    $scope.leq_10_ca,
                                    $scope.tmre_t60_nse_ca,
                                    // tmre_t60_nse,
                                    registroPuntosMedicion.fuenteSonoraCA,
                                    numerosCA,
                                    registroPuntosMedicion.fechaMedicionCA,
                                    intext,
                                    data.data.Success,
                                    $scope.nombreCsvConActividad,
                                    function (resultado) {
                                        var RESPUESTA = JSON.parse(resultado);
                                        console.log(RESPUESTA);
                                        if (
                                            RESPUESTA.success != null &&
                                            RESPUESTA.success.code == 200
                                        ) {
                                            // swal('SE HA GUARDADO EL ARCHIVO', 'EL ARCHIVO DE PRESIÓN SONORA CON ACTIVIDAD SE HA GUARDADO', 'success');
                                            console.log("EXITO");
                                            $scope.campoCargaRegistroFotograficoPDF = true;
                                            $scope.mensajeRegistroFotograficoPDFCargado = false;
                                            $scope.botonSubirRegistroFotografico = true;
                                            $scope.botonBajarRegistroFotografico = false;
                                            $scope.botonCambiarPDFRegistroFotografico = false;
                                            banderaConActividad = 1;
                                        } else {
                                            // swal('ERROR', "NO SE HA GUARDADO EL ARCHIVO DE PRESIÓN SONORA CON ACTIVIDAD ", 'error');
                                            console.log("ERROR");
                                            banderaConActividad = 0;
                                        }
                                        console.log("BANDERA CA: ", banderaConActividad);
                                        resolve(banderaConActividad);
                                    }
                                );
                            }
                        })
                        .catch(function (error) {
                            swal(
                                "ERROR",
                                "EL ARCHIVO CON ACTIVIDAD NO PUDO GUARDARSE",
                                "error"
                            );
                            console.error(error);
                        });
                    console.log("DEFERRED: ", deferred.promise);
                });

                var guardadoCsvRF = new Promise(function (resolve, reject) {
                    var banderaSinRuidoDeFondo = 0;
                    let rutaAdjuntoCsvConRuidoDeFondo =
                        "/RC_CLI/" +
                        String($scope.test4[9]) +
                        "/" +
                        String($scope.nombreCsvRuidoFondo) +
                        "/";
                    var fd = new FormData();
                    fd.append("archivo", $scope.csvFileRF);
                    fd.append("ruta", rutaAdjuntoCsvConRuidoDeFondo);
                    fd.append("nombrea", $scope.nombreCsvRuidoFondo);
                    fd.append("oid", $scope.test4[9]);
                    var deferred = $q.defer();
                    $http
                        .post("http://192.168.5.141:8003/wsRCPG/subirArchivo", fd, {
                            headers: { "Content-Type": undefined },
                            transformRequest: angular.identity,
                        })
                        .then(function (data) {
                            deferred.resolve(data.data);
                            if (data.data.Success && data.data.code == 200) {
                                $scope.enlaceDescargaReporteFotografico = data.data.Success;
                                amb.insertarPuntoMedicionEeisSinAct(
                                    id_solicitud,
                                    registroPuntosMedicion.nroPunto,
                                    registroPuntosMedicion.nombreUbicacion,
                                    registroPuntosMedicion.horaInicioMedicionRF,
                                    registroPuntosMedicion.horaFinalMedicionRF,
                                    $scope.leq_rf,
                                    $scope.leq_90_rf,
                                    $scope.leq_10_rf,
                                    $scope.tmre_t60_nse_rf,
                                    // tmre_t60_nse,
                                    numerosRF,
                                    registroPuntosMedicion.fechaMedicionRF,
                                    intext,
                                    data.data.Success,
                                    $scope.nombreCsvRuidoFondo,
                                    function (resultado) {
                                        var RESPUESTA = JSON.parse(resultado);
                                        console.log(RESPUESTA);
                                        if (
                                            RESPUESTA.success != null &&
                                            RESPUESTA.success.code == 200
                                        ) {
                                            $scope.campoCargaRegistroFotograficoPDF = true;
                                            $scope.mensajeRegistroFotograficoPDFCargado = false;
                                            $scope.botonSubirRegistroFotografico = true;
                                            $scope.botonBajarRegistroFotografico = false;
                                            $scope.botonCambiarPDFRegistroFotografico = false;
                                            banderaSinRuidoDeFondo = 1;
                                        } else {
                                            banderaSinRuidoDeFondo = 0;
                                        }
                                        console.log("BANDERA RF: ", banderaSinRuidoDeFondo);
                                        resolve(banderaSinRuidoDeFondo);
                                    }
                                );
                            }
                        })
                        .catch(function (error) {
                            console.error(error);
                            swal(
                                "ERROR",
                                "EL ARCHIVO DE RUIDO DE FONDO NO PUDO GUARDARSE",
                                "error"
                            );
                        });
                });

                Promise.all([guardadoCsvCA, guardadoCsvRF])
                    .then(function (respuestas) {
                        console.log("CA: ", respuestas[0]);
                        console.log("RF: ", respuestas[1]);
                        if (respuestas[0] == 1 && respuestas[1] == 1) {
                            swal(
                                {
                                    title: "DATOS GUARDADOS",
                                    text:
                                        "LOS DATOS DEL PUNTO  " +
                                        lugar +
                                        "  CON RUIDO DE FONDO Y CON ACTIVIDAD SE HAN GUARDADO CORRECTAMENTE",
                                    type: "success",
                                    showCancelButton: false,
                                    confirmButtonClass: "btn-success",
                                    confirmButtonText: "ACEPTAR",
                                    closeOnConfirm: true,
                                },
                                function () {
                                    $scope.$apply(function () {
                                        $scope.listarPuntosCAyRF();
                                    });
                                }
                            );
                            $("#modalPuntosMedicion").modal("hide");
                        }
                    })
                    .catch(function (error) {
                        console.error(error);
                        swal(
                            "ERROR GUARDANDO",
                            "ERROR GUARDANDO DATOS DEL PUNTO " + lugar + ".",
                            "error"
                        );
                    });
            }
        } else {
            alert("No cargó los archivos en formato CSV.");
        }
    };

    $scope.listarPuntosCAyRF = function () {
        console.log("Controlador para listar los puntos CA y RF");
        var id_solicitud_puntos = $scope.idSolicitudSeleccionada;
        console.log(
            "LAAAAAAAAAAAAAA SOLICITUD SELECCIONADA ES: ",
            id_solicitud_puntos
        );
        amb.listarPuntosConActividadRuidoFondo(
            id_solicitud_puntos,
            function (resultado) {
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    listaPuntosCAyRF = JSON.parse(resultado);
                    console.log("LISTAPUNTOSCAYRF: ", listaPuntosCAyRF);

                    var listaPuntosCAyRFparseado = listaPuntosCAyRF.success.data;
                    $scope.PuntosParaEditar = listaPuntosCAyRFparseado; // NO VA AL FRONT
                    console.log("Lista concatenda");
                    $scope.PuntosCAyRFparaElFront = listaPuntosCAyRFparseado;
                    const puntosInternos = [];
                    const puntosExternos = [];
                    listaPuntosCAyRFparseado.forEach((item) => {
                        if (
                            item.interno_o_externo_ca === 0 &&
                            item.interno_o_externo_rf === 0
                        ) {
                            puntosExternos.push(item);
                        } else {
                            puntosInternos.push(item);
                        }
                    });
                    console.log("PUNTOS INTERNOS", puntosInternos);
                    console.log("PUNTOS EXTERNOS", puntosExternos);
                    // $scope.$apply(function () {
                    $scope.puntosInterioresCAyRFparaEditarEliminar = puntosInternos;
                    console.log($scope.puntosInterioresCAyRFparaEditarEliminar);

                    $scope.puntosExterioresCAyRFparaEditarEliminar = puntosExternos;
                    console.log($scope.puntosExterioresCAyRFparaEditarEliminar);

                    if (puntosInternos.length == 0) {
                        $scope.ocultarTablaMedicionInterior = "true";
                    } else {
                        $scope.ocultarTablaMedicionInterior = "false";
                    }

                    if (puntosExternos.length == 0) {
                        $scope.ocultarTablaMedicionExterior = "true";
                    } else {
                        $scope.ocultarTablaMedicionExterior = "false";
                    }

                    // })
                } else {
                    swal(
                        "ERROR",
                        "ERROR RECUPERANDO LOS PUNTOS DE MEDICION O AUN NO AGREGÓ PUNTOS",
                        "error"
                    );
                    console.error(
                        "ERROR RECUPERANDO LOS PUNTOS DE MEDICION O AUN NO AGREGÓ PUNTOS"
                    );
                }
            }
        );
    };

    $scope.confirmarEliminarPuntoInt = function (todo) {
        var punto_ca = todo.listaPuntosInt.nro_punto_ca;
        var punto_rf = todo.listaPuntosInt.nro_punto_rf;
        if (punto_ca == punto_rf) {
            $scope.punto_interior_a_borrar = punto_ca;
            $timeout(function () {
                $("#modalConfirmacionEliminarPuntoInterior").modal("show");
            }, 0);
        } else {
            swal(
                "ERROR AL ELIMINAR",
                "NO COINCIDEN LOS PUNTOS CON Y SIN ACTIVIDAD, ERROR EN EL SP COMUNIQUESE CON ANGEL LAURA",
                "error"
            );
        }
    };

    $scope.eliminarPuntoInt = function () {
        var id_solicitud = $scope.idSolicitudSeleccionada;
        puntoInt_a_borrar = $scope.punto_interior_a_borrar;
        amb.eliminarPunto(id_solicitud, puntoInt_a_borrar, function (resultado) {
            console.log(resultado);
            var RESPUESTA = JSON.parse(resultado);
            if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                swal(
                    "PUNTO ELIMINADO",
                    "EL PUNTO INTERIOR " + puntoInt_a_borrar + " SE HA ELIMINADO",
                    "success"
                );
                $scope.listarPuntosCAyRF();
            } else {
                swal("NO SE ELIMINÓ", "ERROR AL ELIMINAR EL PUNTO INTERIOR", "error");
            }
        });
    };

    $scope.confirmarEliminarPuntoExt = function (todo) {
        var punto_ca = todo.listaPuntosExt.nro_punto_ca;
        var punto_rf = todo.listaPuntosExt.nro_punto_rf;
        if (punto_ca == punto_rf) {
            $scope.punto_exterior_a_borrar = punto_ca;
            $timeout(function () {
                $("#modalConfirmacionEliminarPuntoExterior").modal("show");
            }, 0);
        } else {
            swal(
                "ERROR AL ELIMINAR",
                "NO COINCIDEN LOS PUNTOS CON Y SIN ACTIVIDAD, ERROR EN EL SP COMUNIQUESE CON ANGEL LAURA",
                "error"
            );
        }
    };

    $scope.eliminarPuntoExt = function () {
        var id_solicitud = $scope.idSolicitudSeleccionada;
        puntoExt_a_borrar = $scope.punto_exterior_a_borrar;
        amb.eliminarPuntoExterior(
            id_solicitud,
            puntoExt_a_borrar,
            function (resultado) {
                console.log(resultado);
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal(
                        "PUNTO ELIMINADO",
                        "EL PUNTO EXTERIOR " + puntoExt_a_borrar + " SE HA ELIMINADO",
                        "success"
                    );
                    $scope.listarPuntosCAyRF();
                } else {
                    swal("NO SE ELIMINÓ", "ERROR AL ELIMINAR EL PUNTO INTERIOR", "error");
                }
            }
        );
    };

    $scope.llamarPuntoParaEditar = function (todo) {
        // $scope.csvFile = '';
        // $scope.csvFileRF = '';
        $scope.btnGuaradarPuntoDeMedidicion = true;
        $scope.btnModificarPunto = false;

        var editarPuntos = $scope.PuntosParaEditar;
        const puntoInterno = editarPuntos.find(
            (objeto) => objeto.nro_punto_ca === todo.listaPuntosInt.nro_punto_ca
        );
        console.log($scope.registroPuntosMedicion);
        $scope.registroPuntosMedicion = {
            nroPunto: puntoInterno.nro_punto_ca,
            nombreUbicacion: puntoInterno.ubicacion_pto_medicion_ca,
            fuenteSonoraCA: puntoInterno.id_fuente_sonora_ca,
            fechaMedicionCA: puntoInterno.fecha_medicion_ca,
            horaInicioMedicionCA: puntoInterno.hr_inicio_ca,
            horaFinalMedicionCA: puntoInterno.hr_fin_ca,
            fechaMedicionRF: puntoInterno.fecha_medicion_rf,
            horaInicioMedicionRF: puntoInterno.hr_inicio_rf,
            horaFinalMedicionRF: puntoInterno.hr_fin_rf,
        };
        $scope.modalPtoIntExt = "INTERIOR";
        console.log($scope.registroPuntosMedicion);
    };

    $scope.llamarPuntoParaEditarExt = function (todo) {
        // $scope.csvFile = '';
        // $scope.csvFileRF = '';
        $scope.btnGuaradarPuntoDeMedidicion = true;
        $scope.btnModificarPunto = false;

        var editarPuntos = $scope.PuntosParaEditar;
        const PuntoExterno = editarPuntos.find(
            (objeto) => objeto.nro_punto_ca === todo.listaPuntosExt.nro_punto_ca
        );
        $scope.registroPuntosMedicion = {
            nroPunto: PuntoExterno.nro_punto_ca,
            nombreUbicacion: PuntoExterno.ubicacion_pto_medicion_ca,
            fuenteSonoraCA: PuntoExterno.id_fuente_sonora_ca,
            fechaMedicionCA: PuntoExterno.fecha_medicion_ca,
            horaInicioMedicionCA: PuntoExterno.hr_inicio_ca,
            horaFinalMedicionCA: PuntoExterno.hr_fin_ca,
            fechaMedicionRF: PuntoExterno.fecha_medicion_rf,
            horaInicioMedicionRF: PuntoExterno.hr_inicio_rf,
            horaFinalMedicionRF: PuntoExterno.hr_fin_rf,
        };
        console.log("FUNCION LLAMAR PUNTO PARA EDITAR EXTERNO");
        // console.log(registroPuntosMedicion)
        $scope.modalPtoIntExt = "EXTERIOR";
    };

    $scope.modificarPuntosDeMedicion = function (registroPuntosMedicion) {
        console.log("FUNCION PARA EDITAR PUNTO");
        var file = $scope.csvFile;
        var fileRF = $scope.csvFileRF;
        if (file && fileRF) {
            function lecturaCA(file) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var csvData = e.target.result;
                            var numeros = csvData.split(/\s+/).map(Number);
                            numeros.length = numeros.length - 1;
                            resolve(numeros);
                            var matriz = [];
                            for (let i = 0; i < numeros.length; i += 15) {
                                matriz.push(numeros.slice(i, i + 15));
                            }
                        };
                        reader.readAsText(file);
                    }, 5000);
                });
            }
            var promesa1 = lecturaCA(file);
            var promesa2 = lecturaCA(fileRF);

            Promise.all([promesa1, promesa2]).then(([numeros, numerosRF]) => {
                var id_solicitud = $scope.idSolicitudSeleccionada;
                var longitudCA = numeros.length;
                var longitudRF = numerosRF.length;
                if (longitudCA <= 299 && longitudRF <= 299) {
                    swal(
                        "",
                        "AMBOS ARCHIVOS CARGADOS TIENEN MENOS DE 300 DATOS, PARA MEDICIONES EN INTERIORES LA CANTIDAD MÍNIMA DE DATOS DEBE SER 300 POR PUNTO",
                        "error"
                    );
                } else if (longitudCA <= 299 && longitudRF >= 300) {
                    swal(
                        "",
                        "EL ARCHIVO DE MEDICION CON ACTIVIDAD TIENE MENOS DE 300 DATOS, PARA MEDICIONES AL INTERIOR DE LA ACTIVIDAD, LA CANTIDAD MÍNIMA DEBE SER 300 DATOS POR PUNTO",
                        "error"
                    );
                } else if (longitudCA >= 300 && longitudRF <= 299) {
                    swal(
                        "",
                        "EL ARCHIVO DE MEDICION CON RUIDO DE FONDO TIENE MENOS DE 300 DATOS, PARA MEDICIONES AL INTERIOR DE LA ACTIVIDAD, LA CANTIDAD MÍNIMA DEBE SER 300 DATOS POR PUNTO",
                        "error"
                    );
                } else if (longitudCA >= 300 && longitudRF >= 300) {
                    setTimeout(() => {
                        console.log("SERVICIO MODIFICACION");
                        amb.modificarPuntoPorSolicitud(
                            id_solicitud,
                            registroPuntosMedicion.nroPunto,
                            registroPuntosMedicion.nroPunto,
                            registroPuntosMedicion.nombreUbicacion,
                            registroPuntosMedicion.fuenteSonoraCA,
                            registroPuntosMedicion.fechaMedicionCA,
                            registroPuntosMedicion.horaInicioMedicionCA,
                            registroPuntosMedicion.horaFinalMedicionCA,
                            numeros, //?
                            registroPuntosMedicion.fechaMedicionRF,
                            registroPuntosMedicion.horaInicioMedicionRF,
                            registroPuntosMedicion.horaFinalMedicionRF,
                            numerosRF,
                            function (resultado) {
                                console.log(resultado);
                                var RESPUESTA = JSON.parse(resultado);
                                if (
                                    RESPUESTA.success != null &&
                                    RESPUESTA.success.code == 200
                                ) {
                                    swal(
                                        "DATOS MODIFICADOS",
                                        "LOS DATOS DEL PUNTO DE MEDICION SE HAN MODIFICADO CON EXITO",
                                        "success"
                                    );
                                    //$scope.listarPuntosCAyRF();
                                } else {
                                    swal(
                                        "",
                                        "ERROR AL MODIFICAR DATOS DEL PUNTO DE MEDICION",
                                        "error"
                                    );
                                }
                            }
                        );
                    }, 5000);
                }
            });
        } else {
            alert("Por favor seleccione archivos en formato CSV.");
        }
    };

    $scope.listarActividadEeisSonometroFuente = function () {
        console.log(
            "Se estan obteniendo datos del EEIS, del SONOMETRO y FUENTE SONORA"
        );
        var id_solicitud = $scope.idSolicitudSeleccionada;
        amb.listarEeisActividadSonometroFuente(
            id_solicitud,
            function (respuesta18) {
                var datosEeis = JSON.parse(respuesta18);
                console.log("DATOS DE LOS 3 FORMS: ", datosEeis);
                //console.log("DATOS DE LOS 3 FORMS: ", datosEeis.success.data[0]);
                var datosDelEeis = datosEeis.success.data[0];
                Object.keys(datosDelEeis).forEach(
                    (key) =>
                        datosDelEeis[key] === "undefined" && (datosDelEeis[key] = " ")
                );
                console.log("DATOS DE LOS 3 FORMS: ", datosDelEeis);
                // if (datosEeis.success.data[0].tipoActividad == null) {
                if (datosDelEeis.tipoActividad == null) {
                    // swal('FORMULARIO INCOMPLETO', "SR. CONSULTOR PORFAVOR COMPLETE LOS DATOS DEL ESTUDIO", 'error');
                    $scope.btnModificarDatosActividad = true;
                    $scope.btnRegistroDatosActividad = false;
                    $scope.btnEditarRegistroDatosActividad = true;
                    $scope.btnCancelarModificarDatosActividad = true;
                    $scope.campoTipoActividad = false;
                    $scope.campoNombreActividad = false;
                    $scope.campoMacro = true;
                    $scope.campoDistrito = true;
                    $scope.campoRazonSocial = false;
                    $scope.campoSubalcaldia = true;
                    $scope.campoZona = false;
                    $scope.campoAvenida = false;
                    $scope.campoNumero = false;
                    $scope.campoEdificio = false;
                    $scope.campoBloque = false;
                    $scope.campoPiso = false;
                    $scope.campoDepto = false;
                    $scope.campoEntreCalles1 = false;
                    $scope.campoEntreCalles2 = false;
                    $scope.campoTelefono = false;
                    $scope.campoApertura = false;
                    $scope.campoCierre = false;
                    $scope.campoTenencia = false;
                    $scope.campoNiveles = false;
                    $scope.campoSuperficieInterior = false;
                    $scope.campoAlturaInterior = false;
                    $scope.campoVolumen = false;
                } else {
                    // swal('FORMULARIO COMPLETO', "SR. CONSULTOR PUEDE PROCEDER A ENVIAR EL ESTUDIO PARA REVISIÓN", 'success');
                    $scope.btnModificarDatosActividad = false;
                    $scope.btnRegistroDatosActividad = true;
                    $scope.btnEditarRegistroDatosActividad = true;
                    $scope.btnCancelarModificarDatosActividad = true;
                    $scope.campoTipoActividad = true;
                    $scope.campoNombreActividad = true;
                    $scope.campoMacro = true;
                    $scope.campoDistrito = true;
                    $scope.campoRazonSocial = true;
                    $scope.campoSubalcaldia = true;
                    $scope.campoZona = true;
                    $scope.campoAvenida = true;
                    $scope.campoNumero = true;
                    $scope.campoEdificio = true;
                    $scope.campoBloque = true;
                    $scope.campoPiso = true;
                    $scope.campoDepto = true;
                    $scope.campoEntreCalles1 = true;
                    $scope.campoEntreCalles2 = true;
                    $scope.campoTelefono = true;
                    $scope.campoApertura = true;
                    $scope.campoCierre = true;
                    $scope.campoTenencia = true;
                    $scope.campoNiveles = true;
                    $scope.campoSuperficieInterior = true;
                    $scope.campoAlturaInterior = true;
                    $scope.campoVolumen = true;

                    // $scope.registroEeis = datosEeis.success.data[0];
                }
                $scope.registroEeis = datosDelEeis;
                // if (datosEeis.success.data[0].tipoFuente == null) {
                if (datosDelEeis.tipoFuente == null) {
                    // swal('FORMULARIO INCOMPLETO', "SR. CONSULTOR PORFAVOR COMPLETE LOS DATOS DEL ESTUDIO", 'error');
                    $scope.btnModificarFuenteSonora = true;
                    $scope.btnRegistrarFuenteSonora = false;
                    $scope.btnCancelarModificarFuenteSonora = true;
                    $scope.btnEditarFuenteSonora = true;

                    $scope.campoTipoFuente = false;
                    $scope.campoPotenciaEquipo = false;
                    $scope.campoNumeroParlantes = false;
                    $scope.campoPropiedadFuenteSonora = false;
                } else {
                    // swal('FORMULARIO COMPLETO', "SR. CONSULTOR PUEDE PROCEDER A ENVIAR EL ESTUDIO PARA REVISIÓN", 'success');
                    $scope.btnModificarFuenteSonora = false;
                    $scope.btnRegistrarFuenteSonora = true;
                    $scope.btnCancelarModificarFuenteSonora = true;
                    $scope.btnEditarFuenteSonora = true;

                    $scope.campoTipoFuente = true;
                    $scope.campoPotenciaEquipo = true;
                    $scope.campoNumeroParlantes = true;
                    $scope.campoPropiedadFuenteSonora = true;
                    $scope.registroSonora = datosDelEeis;
                    // $scope.registroSonora = datosEeis.success.data[0];
                }

                // if (datosEeis.success.data[0].equipo == null) {
                if (datosDelEeis.equipo == null) {
                    // swal('FORMULARIO INCOMPLETO', "SR. CONSULTOR PORFAVOR COMPLETE LOS DATOS DEL ESTUDIO", 'error');
                    $scope.btnModificarSonometro = true;
                    $scope.btnRegistroSonometro = false;

                    $scope.btnEditarRegistroSonometro = true;
                    $scope.btnCancelarModificarSonometro = true;

                    $scope.campoEquipoEmpleado = false;
                    $scope.campoMarca = false;
                    $scope.campoModelo = false;
                    $scope.campoNumeroDeSerie = false;
                    $scope.campoClase = false;
                    $scope.campoFechaCalibracion = false;
                    $scope.campoTitularDelEquipo = false;
                    $scope.campoFechaDeEnsayo = false;
                } else {
                    // swal('FORMULARIO COMPLETO', "SR. CONSULTOR PUEDE PROCEDER A ENVIAR EL ESTUDIO PARA REVISIÓN", 'success');
                    $scope.btnModificarSonometro = false;
                    $scope.btnRegistroSonometro = true;

                    $scope.btnEditarRegistroSonometro = true;
                    $scope.btnCancelarModificarSonometro = true;

                    $scope.campoEquipoEmpleado = true;
                    $scope.campoMarca = true;
                    $scope.campoModelo = true;
                    $scope.campoNumeroDeSerie = true;
                    $scope.campoClase = true;
                    $scope.campoFechaCalibracion = true;
                    $scope.campoTitularDelEquipo = true;
                    $scope.campoFechaDeEnsayo = true;

                    // $scope.registroSonometro = datosEeis.success.data[0];
                    $scope.registroSonometro = datosDelEeis;
                    $scope.registroSonometro = {
                        ...$scope.registroSonometro,
                        fechaCalibracion: $filter("date")(
                            datosDelEeis.fechaCalibracion,
                            "yyyy-MM-dd"
                        ),
                        fechaEnsayoEqp: $filter("date")(
                            datosDelEeis.fechaEnsayoEqp,
                            "yyyy-MM-dd"
                        ),
                        // fechaCalibracion: $filter('date')(datosEeis.success.data[0].fechaCalibracion, 'yyyy-MM-dd'),
                        // fechaEnsayoEqp: $filter('date')(datosEeis.success.data[0].fechaEnsayoEqp, 'yyyy-MM-dd')
                    };
                }
            }
        );
    };

    $scope.modificarDatosActividad = function (registroEeis) {
        $scope.btnRegistroDatosActividad = true;
        $scope.btnModificarDatosActividad = true;
        $scope.btnEditarRegistroDatosActividad = false;
        $scope.btnCancelarModificarDatosActividad = false;

        $scope.campoTipoActividad = false;
        $scope.campoNombreActividad = false;
        // $scope.campoMacro = false;
        // $scope.campoDistrito = false;
        $scope.campoRazonSocial = false;
        // $scope.campoSubalcaldia = false;
        $scope.campoZona = false;
        $scope.campoAvenida = false;
        $scope.campoNumero = false;
        $scope.campoEdificio = false;
        $scope.campoBloque = false;
        $scope.campoPiso = false;
        $scope.campoDepto = false;
        $scope.campoEntreCalles1 = false;
        $scope.campoEntreCalles2 = false;
        $scope.campoTelefono = false;
        $scope.campoApertura = false;
        $scope.campoCierre = false;
        $scope.campoTenencia = false;
        $scope.campoNiveles = false;
        $scope.campoSuperficieInterior = false;
        $scope.campoAlturaInterior = false;
        $scope.campoVolumen = false;
    };

    $scope.modificarDatosFuenteSonora = function () {
        $scope.btnModificarFuenteSonora = true;
        $scope.btnRegistrarFuenteSonora = true;
        $scope.btnCancelarModificarFuenteSonora = false;
        $scope.btnEditarFuenteSonora = false;

        $scope.campoTipoFuente = false;
        $scope.campoPotenciaEquipo = false;
        $scope.campoNumeroParlantes = false;
        $scope.campoPropiedadFuenteSonora = false;
    };

    $scope.modificarDatosSonometro = function (registroSonometro) {
        $scope.btnModificarSonometro = true;
        $scope.btnRegistroSonometro = true;
        $scope.btnEditarRegistroSonometro = false;
        $scope.btnCancelarModificarSonometro = false;

        $scope.campoEquipoEmpleado = false;
        $scope.campoMarca = false;
        $scope.campoModelo = false;
        $scope.campoNumeroDeSerie = false;
        $scope.campoClase = false;
        $scope.campoFechaCalibracion = false;
        $scope.campoTitularDelEquipo = false;
        $scope.campoFechaDeEnsayo = false;
    };

    $scope.buscarConsultorSiExiste = function () {
        amb.buscarConsultorExitente($scope.test4[9], function (resultado) {
            var idEstadoConsultor = JSON.parse(resultado).success.data[0].id_estado;
            $scope.idestadoConsultor = idEstadoConsultor;
            if (idEstadoConsultor == 0) {
                console.log("El consultor NO ESTA HABILITADO", idEstadoConsultor);
                $scope.seMuestraSolicitudes = false;
                $scope.seMuestraFormulario = false;
                $scope.seMuestraHabilitado = true;
                $scope.seMuestraFormularioContinuacion = false;
            } else {
                console.log("El consultor ESTA HABILITADO", idEstadoConsultor);
                $scope.seMuestraSolicitudes = true;
                $scope.seMuestraFormulario = false;
                $scope.seMuestraHabilitado = false;
                $scope.seMuestraFormularioContinuacion = false;
            }
        });
    };

    $scope.ubicacionSeleccionadaConfirmada = function () {
        var oid_consultor = $scope.test4[9];
        var id_solicitud = $scope.idSolicitudSeleccionada;
        var datosPredio = $scope.datosPredio;
        amb.insertarCoordenadas(
            $scope.lat,
            $scope.long,
            id_solicitud,
            oid_consultor,
            datosPredio.codigoCatastral,
            datosPredio.direccion,
            datosPredio.edificio,
            datosPredio.idMacrodistrito,
            datosPredio.iddistritoMunicipal,
            datosPredio.nroPuerta,
            datosPredio.zona,
            function (resultado) {
                console.log(resultado);
                console.log("DATOS ADICIONALES PREDIO: ", datosPredio);

                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    $scope.listarActividadEeisSonometroFuente();
                    swal(
                        "HA CONFIRMADO EL LUGAR DE UBICACION DE LA ACTIVIDAD DE ALTO IMPACTO SONORO",
                        "PUEDE CONTINUAR CON EL LLENADO DEL FORMULARIO DE EEIS",
                        "success"
                    );
                    $scope.mapaOcultado = true;
                    $scope.seMuestraFormularioContinuacion = true;
                } else {
                    swal(
                        "",
                        "ERROR AL REGISTRAR LOS DATOS DE UBICACIONES DEL PREDIO",
                        "error"
                    );
                }
            }
        );
    };

    $scope.limpiarFormAgregarColindante = function () {
        $scope.radioDatosPersonales = "SI";
        $scope.radiotipoactividad = "Otro";

        $scope.noo = true;
        $scope.sii = false;
        $scope.domicilio = false;
        $scope.otro = true;

        $scope.datosPropietarioColindante = false;
        $scope.campoOtraActividad = false;

        // $scope.registroColindante.nombPropColindante = 'NO';
        // $scope.registroColindante.apPatColindante = 'PROPORCIONO';
        // $scope.registroColindante.apMatColindante = 'DATOS';

        // $scope.registroColindante.nomActColindante = 'Domicilio Particular';
        // $scope.registroColindante.hrAperturaColindante = '02:53:47';
        // $scope.registroColindante.hrCierreColindante = '02:53:47';

        $scope.botonGuardarColindante = false;
        $scope.botonModificarColindante = true;
        $scope.registroColindante = "";
    };

    $scope.limpiarFormAgregarPunotDeMedicion = function () {
        $scope.botonGuardarPunto = false;
        $scope.botonModificarPunto = true;
        $scope.registroColindante = "";
    };

    $scope.botonCancelar = function () {
        // $scope.csvFile = '';
        // $scope.csvFileRF = '';
        document.getElementById("csvFileInputRF").value = "";
        document.getElementById("csvFileInputCA").value = "";
    };

    $scope.subirAdjuntoCsvInteriorCA = function () {
        $scope.csv_Interior_CA;
        console.log("ARCHIVO AJDUNTO: ", $scope.csv_Interior_CA);
        var csv_int_ca = $scope.csv_Interior_CA; //archivoAdjunto CSV INTERIOR SIN ACTIVIDAD
        var fd = new FormData();
        fd.append("archivo", csv_int_ca);
        fd.append("ruta", "/RC_CLI/6605e143f85c54f96700000e/170490/");
        fd.append("nombrea", "pdf_prueba");
        fd.append("oid", "6605e143f85c54f96700000e");
        var deferred = $q.defer();
        $http
            .post("http://192.168.5.141:8003/wsRCPG/subirArchivo", fd, {
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
            })
            .then(function (data) {
                deferred.resolve(data.data);
                if (data.data.Success && data.data.code == 200) {
                    // swal('ARCHIVO GUARDADO', "PUEDE DESCARGAR SU ARCHIVO: " + data.data.Success, 'success');
                    swal(
                        "FORMATO ACEPTADO",
                        "EL ARCHIVO SE HA LEIDO CON EXITO",
                        "success"
                    );
                    $scope.enlaceDescargaRenca = data.data.Success;
                } else {
                    swal("ERROR", "SU ARCHIVO NO PUDO GUARDARSE", "error");
                }
                console.log("ENLACE: ", data.data.Success); //ENLACE DE DESCARGA
            });
        console.log("DEFERRED: ", deferred.promise);
    };

    $scope.listarConclusionesRegistroFotograficoAnexos = function () {
        console.log("Controlador para listar adjuntos");
        var id_Solicitud = $scope.idSolicitudSeleccionada;
        console.log("XXXXXXXXXXXXXXX", id_Solicitud);
        amb.listarConclusionesRegistroFotograficoAnexos(
            id_Solicitud,
            function (resultadoListadoAdjuntos) {
                resultadoListadoAdjuntos = JSON.parse(resultadoListadoAdjuntos);
                console.log("RESULTADOADJUNTOS: ", resultadoListadoAdjuntos);
                var RESPUESTA = resultadoListadoAdjuntos;
                if (
                    RESPUESTA.success.data.length >= 0 &&
                    RESPUESTA.success.code == 200 &&
                    $scope.idestadoConsultor === 1
                ) {
                    // console.log("SE RESOLVIO LA CONSULTA", resultadoListadoAdjuntos);
                    // $scope.enlaceDescargaConclusiones = RESPUESTA.success.data[0].ruta;
                    // $scope.nombrePDFConclusiones = RESPUESTA.success.data[0].nombre;
                    // console.log("NOMBRE DEL ARCHIVO PDF: ", $scope.nombrePDFConclusiones)
                    var adjuntoConclusiones = RESPUESTA.success.data.filter(
                        (item) => item.tipo === 1
                    );
                    if (adjuntoConclusiones.length > 0) {
                        $scope.enlaceDescargaConclusiones = adjuntoConclusiones[0].ruta;
                        $scope.nombreAdjuntoConclusiones = adjuntoConclusiones[0].nombre;
                        $scope.pdfConclusiones = 1;
                        $scope.campoCargaConclusionesPDF = true;
                        $scope.mensajeConclusionesPDFCargado = false;
                        $scope.botonSubirConclusiones = true;
                    } else {
                        $scope.campoCargaConclusionesPDF = false;
                        $scope.mensajeConclusionesPDFCargado = true;
                        $scope.botonBajarConclusiones = true;
                        $scope.botonCambiarPDFConclusiones = true;
                    }

                    var adjuntoRegistroFotografico = RESPUESTA.success.data.filter(
                        (item) => item.tipo === 2
                    );
                    if (adjuntoRegistroFotografico.length > 0) {
                        $scope.enlaceDescargaReporteFotografico =
                            adjuntoRegistroFotografico[0].ruta;
                        $scope.nombreAdjuntoRegistroFotografico =
                            adjuntoRegistroFotografico[0].nombre;
                        $scope.pdfRegistroFotografico = 1;
                        $scope.campoCargaRegistroFotograficoPDF = true;
                        $scope.mensajeRegistroFotograficoPDFCargado = false;
                        $scope.botonSubirRegistroFotografico = true;
                    } else {
                        $scope.campoCargaRegistroFotograficoPDF = false;
                        $scope.mensajeRegistroFotograficoPDFCargado = true;
                        $scope.botonBajarRegistroFotografico = true;
                        $scope.botonCambiarPDFRegistroFotografico = true;
                    }

                    // var adjuntoRenca = RESPUESTA.success.data.filter(item => item.tipo === 3);
                    // $scope.enlaceDescargaRenca = adjuntoRenca[0].ruta;
                    // $scope.nombrePDFRenca = adjuntoRenca[0].nombre;

                    var adjuntoNit = RESPUESTA.success.data.filter(
                        (item) => item.tipo === 4
                    );
                    if (adjuntoNit.length > 0) {
                        $scope.enlaceDescargaNit = adjuntoNit[0].ruta;
                        $scope.nombreAdjuntoNit = adjuntoNit[0].nombre;
                        $scope.pdfNit = 1;
                        $scope.campoCargaNitPDF = true;
                        $scope.mensajeNitPDFCargado = false;
                        $scope.botonSubirNit = true;
                    } else {
                        $scope.campoCargaNitPDF = false;
                        $scope.mensajeNitPDFCargado = true;
                        $scope.botonBajarNit = true;
                        $scope.botonCambiarPDFNit = true;
                    }

                    var adjuntoPlanoActividad = RESPUESTA.success.data.filter(
                        (item) => item.tipo === 5
                    );
                    if (adjuntoPlanoActividad.length > 0) {
                        console.log("PLANO DE ACTIVIDAD: ", adjuntoPlanoActividad);
                        $scope.enlaceDescargaPlanoDeActividad =
                            adjuntoPlanoActividad[0].ruta;
                        $scope.nombreAdjuntoPlanoDeActividad =
                            adjuntoPlanoActividad[0].nombre;
                        $scope.pdfPlanoDeActividad = 1;
                        $scope.campoCargaPlanoDeActividadPDF = true;
                        $scope.mensajePlanoDeActividadPDFCargado = false;
                        $scope.botonSubirPlanoDeActividad = true;
                    } else {
                        $scope.campoCargaPlanoDeActividadPDF = false;
                        $scope.mensajePlanoDeActividadPDFCargado = true;
                        $scope.botonBajarPlanoDeActividad = true;
                        $scope.botonCambiarPDFPlanoDeActividad = true;
                    }

                    var adjuntoActaDeConstancia = RESPUESTA.success.data.filter(
                        (item) => item.tipo === 6
                    );
                    if (adjuntoActaDeConstancia.length > 0) {
                        $scope.enlaceDescargaActaDeConstancia =
                            adjuntoActaDeConstancia[0].ruta;
                        $scope.nombreAdjuntoActaDeConstancia =
                            adjuntoActaDeConstancia[0].nombre;
                        $scope.pdfActaDeConstancia = 1;
                        $scope.campoCargaActaDeConstanciaPDF = true;
                        $scope.mensajeActaDeConstanciaPDFCargado = false;
                        $scope.botonSubirActaDeConstancia = true;
                    } else {
                        $scope.campoCargaActaDeConstanciaPDF = false;
                        $scope.mensajeActaDeConstanciaPDFCargado = true;
                        $scope.botonBajarActaDeConstancia = true;
                        $scope.botonCambiarPDFActaDeConstancia = true;
                    }

                    var adjuntoContratoAlquilerSonometro = RESPUESTA.success.data.filter(
                        (item) => item.tipo === 7
                    );
                    if (adjuntoContratoAlquilerSonometro.length > 0) {
                        $scope.enlaceDescargaContratoDeAlquilerDeSonometro =
                            adjuntoContratoAlquilerSonometro[0].ruta;
                        $scope.nombreAdjuntoContratoDeAlquilerDeSonometro =
                            adjuntoContratoAlquilerSonometro[0].nombre;
                        $scope.pdfContratoDeAlquilerDeSonometro = 1;
                        $scope.campoCargaContratoDeAlquilerDeSonometroPDF = true;
                        $scope.mensajeContratoDeAlquilerDeSonometroPDFCargado = false;
                        $scope.botonSubirContratoDeAlquilerDeSonometro = true;
                    } else {
                        $scope.campoCargaContratoDeAlquilerDeSonometroPDF = false;
                        $scope.mensajeContratoDeAlquilerDeSonometroPDFCargado = true;
                        $scope.botonBajarContratoDeAlquilerDeSonometro = true;
                        $scope.botonCambiarPDFContratoDeAlquilerDeSonometro = true;
                    }

                    var adjuntoCertificadoCalibracion = RESPUESTA.success.data.filter(
                        (item) => item.tipo === 8
                    );
                    if (adjuntoCertificadoCalibracion.length > 0) {
                        $scope.enlaceDescargaCertificadoDeCalibracion =
                            adjuntoCertificadoCalibracion[0].ruta;
                        $scope.nombreAdjuntoCertificadoDeCalibracion =
                            adjuntoCertificadoCalibracion[0].nombre;
                        $scope.pdfCertificadoDeCalibracion = 1;
                        $scope.campoCargaCertificadoDeCalibracionPDF = true;
                        $scope.mensajeCertificadoDeCalibracionPDFCargado = false;
                        $scope.botonSubirCertificadoDeCalibracion = true;
                    } else {
                        $scope.campoCargaCertificadoDeCalibracionPDF = false;
                        $scope.mensajeCertificadoDeCalibracionPDFCargado = true;
                        $scope.botonBajarCertificadoDeCalibracion = true;
                        $scope.botonCambiarPDFCertificadoDeCalibracion = true;
                    }

                    var adjuntoPlanoUbicacionParlantes = RESPUESTA.success.data.filter(
                        (item) => item.tipo === 15
                    );
                    if (adjuntoPlanoUbicacionParlantes.length > 0) {
                        $scope.enlaceDescargaPlanoUbicacionParlantes =
                            adjuntoPlanoUbicacionParlantes[0].ruta;
                        $scope.nombreAdjuntoPlanoUbicacionParlantes =
                            adjuntoPlanoUbicacionParlantes[0].nombre;
                        $scope.pdfPlanoUbicacionParlantes = 1; // se asigna 1 solo para que el campo sea distinto de NULL
                        $scope.campoCargaPlanoUbicacionParlantesPDF = true;
                        $scope.mensajePlanoUbicacionParlantesPDFCargado = false;
                        $scope.botonSubirPlanoUbicacionParlantes = true;
                    } else {
                        $scope.campoCargaPlanoUbicacionParlantesPDF = false;
                        $scope.mensajePlanoUbicacionParlantesPDFCargado = true;
                        $scope.botonBajarPlanoUbicacionParlantes = true;
                        $scope.botonCambiarPDFPlanoUbicacionParlantes = true;
                    }
                } else {
                    swal("ERROR", "Error al consultar la base de datos", "error");
                    console.log(
                        "ERROR PERO SE DEVOLVIÓ ESTO: ",
                        resultadoListadoAdjuntos
                    );
                }
            }
        );
    };

    $scope.subirConclusiones = function () {
        $scope.pdfConclusiones;
        console.log("ARCHIVO AJDUNTO: ", $scope.pdfConclusiones);

        let rutaAdjuntoConclusiones =
            "/RC_CLI/" +
            String($scope.test4[9]) +
            "/" +
            String($scope.nombreAdjuntoConclusiones) +
            "/";
        var conclusiones = $scope.pdfConclusiones; //archivoAdjunto
        var fd = new FormData();

        fd.append("archivo", conclusiones);
        fd.append("ruta", rutaAdjuntoConclusiones);
        fd.append("nombrea", $scope.nombreAdjuntoConclusiones);
        fd.append("oid", $scope.test4[9]);
        //fd.append('ruta', '/RC_CLI/6605e143f85c54f96700000e/170490/');
        // fd.append('nombrea', 'pdf_prueba');
        // fd.append('oid', '6605e143f85c54f96700000e');
        var deferred = $q.defer();
        $http
            .post("http://192.168.5.141:8003/wsRCPG/subirArchivo", fd, {
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
            })
            .then(function (data) {
                deferred.resolve(data.data);
                if (data.data.Success && data.data.code == 200) {
                    // swal('ARCHIVO GUARDADO', "PUEDE DESCARGAR SU ARCHIVO: " + data.data.Success, 'success');
                    // swal('FORMATO ACEPTADO', "EL ARCHIVO SE HA LEIDO CON EXITO", 'success');
                    $scope.enlaceDescargaConclusiones = data.data.Success;
                    amb.insertarAdjunto(
                        1,
                        data.data.Success,
                        $scope.idSolicitudSeleccionada,
                        $scope.test4[9],
                        $scope.oidCiudadadano,
                        $scope.nombreAdjuntoConclusiones,
                        function (resultado) {
                            console.log(resultado);
                            var RESPUESTA = JSON.parse(resultado);
                            if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                                swal(
                                    "SE HA GUARDADO EL ARCHIVO",
                                    "EL ARCHIVO DE CONCLUSIONES SE HA GUARDADO CON EXITO",
                                    "success"
                                );
                                $scope.campoCargaConclusionesPDF = true;
                                $scope.mensajeConclusionesPDFCargado = false;
                                $scope.botonSubirConclusiones = true;
                                $scope.botonBajarConclusiones = false;
                                $scope.botonCambiarPDFConclusiones = false;
                            } else {
                                swal(
                                    "ERROR",
                                    "NO SE HA GUARDADO EL ARCHIVO DE CONCLUSIONES",
                                    "error"
                                );
                            }
                        }
                    );
                } else {
                    swal("ERROR", "SU ARCHIVO NO PUDO GUARDARSE", "error");
                }
            });
        console.log("DEFERRED: ", deferred.promise);
    };

    $scope.bajarConclusiones = function () {
        var url = $scope.enlaceDescargaConclusiones;
        $window.open(url, "_blank");
    };

    $scope.cambiarConclusiones = function () {
        $scope.campoCargaConclusionesPDF = false;
        $scope.mensajeConclusionesPDFCargado = true;
        $scope.botonSubirConclusiones = true;
        $scope.pdfConclusiones = null;
    };

    $scope.subirRegistroFotografico = function () {
        $scope.pdfRegistroFotografico;
        console.log("ARCHIVO AJDUNTO: ", $scope.pdfRegistroFotografico);
        let rutaAdjuntoRegistroFotografico =
            "/RC_CLI/" +
            String($scope.test4[9]) +
            "/" +
            String($scope.nombreAdjuntoRegistroFotografico) +
            "/";
        var registroFotografico = $scope.pdfRegistroFotografico; //archivoAdjunto
        var fd = new FormData();
        fd.append("archivo", registroFotografico);
        fd.append("ruta", rutaAdjuntoRegistroFotografico);
        fd.append("nombrea", $scope.nombreAdjuntoRegistroFotografico);
        fd.append("oid", $scope.test4[9]);
        //fd.append('ruta', '/RC_CLI/6605e143f85c54f96700000e/170490/');
        // fd.append('nombrea', 'pdf_prueba');
        // fd.append('oid', '6605e143f85c54f96700000e');
        var deferred = $q.defer();
        $http
            .post("http://192.168.5.141:8003/wsRCPG/subirArchivo", fd, {
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
            })
            .then(function (data) {
                deferred.resolve(data.data);
                if (data.data.Success && data.data.code == 200) {
                    $scope.enlaceDescargaReporteFotografico = data.data.Success;
                    amb.insertarAdjunto(
                        2,
                        data.data.Success,
                        $scope.idSolicitudSeleccionada,
                        $scope.test4[9],
                        $scope.oidCiudadadano,
                        $scope.nombreAdjuntoRegistroFotografico,
                        function (resultado) {
                            console.log(resultado);
                            var RESPUESTA = JSON.parse(resultado);
                            if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                                swal(
                                    "SE HA GUARDADO EL ARCHIVO",
                                    "EL ARCHIVO DE CONCLUSIONES SE HA GUARDADO CON EXITO",
                                    "success"
                                );
                                $scope.campoCargaRegistroFotograficoPDF = true;
                                $scope.mensajeRegistroFotograficoPDFCargado = false;
                                $scope.botonSubirRegistroFotografico = true;
                                $scope.botonBajarRegistroFotografico = false;
                                $scope.botonCambiarPDFRegistroFotografico = false;
                            } else {
                                swal(
                                    "ERROR",
                                    "NO SE HA GUARDADO EL ARCHIVO CON EL REGISTRO FOTOGRAFICO",
                                    "error"
                                );
                            }
                        }
                    );
                } else {
                    swal("ERROR", "SU ARCHIVO NO PUDO GUARDARSE", "error");
                }
            });
        console.log("DEFERRED: ", deferred.promise);
    };

    $scope.bajarRegFotografico = function () {
        var url = $scope.enlaceDescargaReporteFotografico;
        $window.open(url, "_blank");
    };

    $scope.cambiarRegistroFotografico = function () {
        $scope.campoCargaRegistroFotograficoPDF = false;
        $scope.mensajeRegistroFotograficoPDFCargado = true;
        $scope.botonSubirRegistroFotografico = true;
        $scope.pdfRegistroFotografico = null;
    };

    $scope.subirNit = function () {
        $scope.pdfNit;
        console.log("ARCHIVO AJDUNTO: ", $scope.pdfNit);
        let rutaAdjuntoNit =
            "/RC_CLI/" +
            String($scope.test4[9]) +
            "/" +
            String($scope.nombreAdjuntoNit) +
            "/";

        var nit = $scope.pdfNit; //archivoAdjunto
        var fd = new FormData();
        fd.append("archivo", nit);
        fd.append("ruta", rutaAdjuntoNit);
        fd.append("nombrea", $scope.nombreAdjuntoNit);
        fd.append("oid", $scope.test4[9]);
        //fd.append('ruta', '/RC_CLI/6605e143f85c54f96700000e/170490/');
        // fd.append('nombrea', 'pdf_prueba');
        // fd.append('oid', '6605e143f85c54f96700000e');
        var deferred = $q.defer();
        $http
            .post("http://192.168.5.141:8003/wsRCPG/subirArchivo", fd, {
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
            })
            .then(function (data) {
                deferred.resolve(data.data);
                if (data.data.Success && data.data.code == 200) {
                    $scope.enlaceDescargaNit = data.data.Success;
                    amb.insertarAdjunto(
                        4,
                        data.data.Success,
                        $scope.idSolicitudSeleccionada,
                        $scope.test4[9],
                        $scope.oidCiudadadano,
                        $scope.nombreAdjuntoNit,
                        function (resultado) {
                            console.log(resultado);
                            var RESPUESTA = JSON.parse(resultado);
                            if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                                swal(
                                    "SE HA GUARDADO EL ARCHIVO",
                                    "EL NIT ADJUNTO SE HA GUARDADO CON EXITO",
                                    "success"
                                );
                                $scope.campoCargaNitPDF = true;
                                $scope.mensajeNitPDFCargado = false;
                                $scope.botonSubirNit = true;
                                $scope.botonBajarNit = false;
                                $scope.botonCambiarPDFNit = false;
                            } else {
                                swal("ERROR", "NO SE HA GUARDADO EL NIT ADJUNTADO", "error");
                            }
                        }
                    );
                } else {
                    swal("ERROR", "SU ARCHIVO NO PUDO GUARDARSE", "error");
                }
            });
        console.log("DEFERRED: ", deferred.promise);
    };

    $scope.bajarNit = function () {
        var url = $scope.enlaceDescargaNit;
        $window.open(url, "_blank");
    };

    $scope.cambiarNit = function () {
        $scope.campoCargaNitPDF = false;
        $scope.mensajeNitPDFCargado = true;
        $scope.botonSubirNit = true;
        $scope.pdfNit = null;
    };

    $scope.subirPlanoDeActividad = function () {
        $scope.pdfPlanoDeActividad;
        console.log("ARCHIVO AJDUNTO: ", $scope.pdfPlanoDeActividad);
        let rutaAdjuntoPlanoDeActividad =
            "/RC_CLI/" +
            String($scope.test4[9]) +
            "/" +
            String($scope.nombreAdjuntoPlanoDeActividad) +
            "/";
        var planoDeActividad = $scope.pdfPlanoDeActividad; //archivoAdjunto
        var fd = new FormData();
        fd.append("archivo", planoDeActividad);
        fd.append("ruta", rutaAdjuntoPlanoDeActividad);
        fd.append("nombrea", $scope.nombreAdjuntoPlanoDeActividad);
        fd.append("oid", $scope.test4[9]);

        // fd.append('ruta', '/RC_CLI/6605e143f85c54f96700000e/170490/');
        // fd.append('nombrea', 'pdf_prueba');
        // fd.append('oid', '6605e143f85c54f96700000e');
        var deferred = $q.defer();
        $http
            .post("http://192.168.5.141:8003/wsRCPG/subirArchivo", fd, {
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
            })
            .then(function (data) {
                deferred.resolve(data.data);
                if (data.data.Success && data.data.code == 200) {
                    // swal('ARCHIVO GUARDADO', "PUEDE DESCARGAR SU ARCHIVO: " + data.data.Success, 'success');
                    // swal('FORMATO ACEPTADO', "EL ARCHIVO SE HA LEIDO CON EXITO", 'success');
                    $scope.enlaceDescargaPlanoDeActividad = data.data.Success;
                    amb.insertarAdjunto(
                        5,
                        data.data.Success,
                        $scope.idSolicitudSeleccionada,
                        $scope.test4[9],
                        $scope.oidCiudadadano,
                        $scope.nombreAdjuntoPlanoDeActividad,
                        function (resultado) {
                            console.log(resultado);
                            var RESPUESTA = JSON.parse(resultado);
                            if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                                swal(
                                    "SE HA GUARDADO EL ARCHIVO",
                                    "EL ARCHIVO DEL PLANO DE ACTIVIDAD SE HA GUARDADO CON EXITO",
                                    "success"
                                );
                                $scope.campoCargaPlanoDeActividadPDF = true;
                                $scope.mensajePlanoDeActividadPDFCargado = false;
                                $scope.botonSubirPlanoDeActividad = true;
                                $scope.botonBajarPlanoDeActividad = false;
                                $scope.botonCambiarPDFPlanoDeActividad = false;
                            } else {
                                swal(
                                    "ERROR",
                                    "NO SE HA GUARDADO EL ARCHIVO DEL PLANO DE ACTIVIDAD",
                                    "error"
                                );
                            }
                        }
                    );
                } else {
                    swal("ERROR", "SU ARCHIVO NO PUDO GUARDARSE", "error");
                }
            });
        console.log("DEFERRED: ", deferred.promise);
    };

    $scope.bajarPlanoDeActividad = function () {
        var url = $scope.enlaceDescargaPlanoDeActividad;
        $window.open(url, "_blank");
    };

    $scope.cambiarPlanoDeActividad = function () {
        $scope.campoCargaPlanoDeActividadPDF = false;
        $scope.mensajePlanoDeActividadPDFCargado = true;
        $scope.botonSubirPlanoDeActividad = true;
        $scope.pdfPlanoDeActividad = null;
    };

    $scope.subirActaDeConstancia = function () {
        $scope.pdfActaDeConstancia;
        console.log("ARCHIVO AJDUNTO: ", $scope.pdfActaDeConstancia);
        let rutaAdjuntoActaDeConstancia =
            "/RC_CLI/" +
            String($scope.test4[9]) +
            "/" +
            String($scope.nombreAdjuntoPlanoDeActividad) +
            "/";
        var actaDeConstancia = $scope.pdfActaDeConstancia; //archivoAdjunto
        var fd = new FormData();
        fd.append("archivo", actaDeConstancia);
        fd.append("ruta", rutaAdjuntoActaDeConstancia);
        fd.append("nombrea", $scope.nombreAdjuntoActaDeConstancia);
        fd.append("oid", $scope.test4[9]);
        // fd.append('ruta', '/RC_CLI/6605e143f85c54f96700000e/170490/');
        // fd.append('nombrea', 'pdf_prueba');
        // fd.append('oid', '6605e143f85c54f96700000e');
        var deferred = $q.defer();
        $http
            .post("http://192.168.5.141:8003/wsRCPG/subirArchivo", fd, {
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
            })
            .then(function (data) {
                deferred.resolve(data.data);
                if (data.data.Success && data.data.code == 200) {
                    // swal('ARCHIVO GUARDADO', "PUEDE DESCARGAR SU ARCHIVO: " + data.data.Success, 'success');
                    // swal('FORMATO ACEPTADO', "EL ARCHIVO SE HA LEIDO CON EXITO", 'success');
                    $scope.enlaceDescargaActaDeConstancia = data.data.Success;
                    amb.insertarAdjunto(
                        6,
                        data.data.Success,
                        $scope.idSolicitudSeleccionada,
                        $scope.test4[9],
                        $scope.oidCiudadadano,
                        $scope.nombreAdjuntoActaDeConstancia,
                        function (resultado) {
                            console.log(resultado);
                            var RESPUESTA = JSON.parse(resultado);
                            if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                                swal(
                                    "SE HA GUARDADO EL ARCHIVO",
                                    "EL ARCHIVO DE ACTA DE CONSTANCIA SE HA GUARDADO CON EXITO",
                                    "success"
                                );
                                $scope.campoCargaActaDeConstanciaPDF = true;
                                $scope.mensajeActaDeConstanciaPDFCargado = false;
                                $scope.botonSubirActaDeConstancia = true;
                                $scope.botonBajarActaDeConstancia = false;
                                $scope.botonCambiarPDFActaDeConstancia = false;
                            } else {
                                swal(
                                    "ERROR",
                                    "NO SE HA GUARDADO EL ARCHIVO DE ACTA DE CONSTANCIA",
                                    "error"
                                );
                            }
                        }
                    );
                } else {
                    swal("ERROR", "SU ARCHIVO NO PUDO GUARDARSE", "error");
                }
            });
        console.log("DEFERRED: ", deferred.promise);
    };

    $scope.bajarActaDeConstancia = function () {
        var url = $scope.enlaceDescargaActaDeConstancia;
        $window.open(url, "_blank");
    };

    $scope.cambiarActaDeConstancia = function () {
        $scope.campoCargaActaDeConstanciaPDF = false;
        $scope.mensajeActaDeConstanciaPDFCargado = true;
        $scope.botonSubirActaDeConstancia = true;
        $scope.pdfActaDeConstancia = null;
    };

    $scope.subirContratoDeAlquilerDeSonometro = function () {
        $scope.pdfContratoDeAlquilerDeSonometro;
        console.log("ARCHIVO AJDUNTO: ", $scope.pdfContratoDeAlquilerDeSonometro);
        let rutaAdjuntoActaDeConstancia =
            "/RC_CLI/" +
            String($scope.test4[9]) +
            "/" +
            String($scope.nombreAdjuntoContratoDeAlquilerDeSonometro) +
            "/";
        var contratoDeAlquilerDeSonometro = $scope.pdfContratoDeAlquilerDeSonometro; //archivoAdjunto
        var fd = new FormData();
        fd.append("archivo", contratoDeAlquilerDeSonometro);
        fd.append("ruta", rutaAdjuntoActaDeConstancia);
        fd.append("nombrea", $scope.nombreAdjuntoContratoDeAlquilerDeSonometro);
        fd.append("oid", $scope.test4[9]);
        // fd.append('ruta', '/RC_CLI/6605e143f85c54f96700000e/170490/');
        // fd.append('nombrea', 'pdf_prueba');
        // fd.append('oid', '6605e143f85c54f96700000e');
        var deferred = $q.defer();
        $http
            .post("http://192.168.5.141:8003/wsRCPG/subirArchivo", fd, {
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
            })
            .then(function (data) {
                deferred.resolve(data.data);
                if (data.data.Success && data.data.code == 200) {
                    // swal('ARCHIVO GUARDADO', "PUEDE DESCARGAR SU ARCHIVO: " + data.data.Success, 'success');
                    // swal('FORMATO ACEPTADO', "EL ARCHIVO SE HA LEIDO CON EXITO", 'success');
                    $scope.enlaceDescargaContratoDeAlquilerDeSonometro =
                        data.data.Success;
                    amb.insertarAdjunto(
                        7,
                        data.data.Success,
                        $scope.idSolicitudSeleccionada,
                        $scope.test4[9],
                        $scope.oidCiudadadano,
                        $scope.nombreAdjuntoContratoDeAlquilerDeSonometro,
                        function (resultado) {
                            console.log(resultado);
                            var RESPUESTA = JSON.parse(resultado);
                            if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                                swal(
                                    "SE HA GUARDADO EL ARCHIVO",
                                    "EL ARCHIVO CONTRATO DE ALQUILER DE SONOMETRO SE HA GUARDADO CON EXITO",
                                    "success"
                                );
                                $scope.campoCargaContratoDeAlquilerDeSonometroPDF = true;
                                $scope.mensajeContratoDeAlquilerDeSonometroPDFCargado = false;
                                $scope.botonSubirContratoDeAlquilerDeSonometro = true;
                                $scope.botonBajarContratoDeAlquilerDeSonometro = false;
                                $scope.botonCambiarPDFContratoDeAlquilerDeSonometro = false;
                            } else {
                                swal(
                                    "ERROR",
                                    "NO SE HA GUARDADO EL ARCHIVO DE CONTRATO DE ALQUILER DE SONOMETRO",
                                    "error"
                                );
                            }
                        }
                    );
                } else {
                    swal("ERROR", "SU ARCHIVO NO PUDO GUARDARSE", "error");
                }
            });
        console.log("DEFERRED: ", deferred.promise);
    };

    $scope.bajarContratoDeAlquilerDeSonometro = function () {
        var url = $scope.enlaceDescargaContratoDeAlquilerDeSonometro;
        $window.open(url, "_blank");
    };

    $scope.cambiarContratoDeAlquilerDeSonometro = function () {
        $scope.campoCargaContratoDeAlquilerDeSonometroPDF = false;
        $scope.mensajeContratoDeAlquilerDeSonometroPDFCargado = true;
        $scope.botonSubirContratoDeAlquilerDeSonometro = true;
        $scope.pdfContratoDeAlquilerDeSonometro = null;
    };

    $scope.subirCertificadoDeCalibracion = function () {
        $scope.pdfCertificadoDeCalibracion;
        console.log("ARCHIVO AJDUNTO: ", $scope.pdfCertificadoDeCalibracion);
        let rutaAdjuntoCertificadoDeCalibracion =
            "/RC_CLI/" +
            String($scope.test4[9]) +
            "/" +
            String($scope.nombreAdjuntoCertificadoDeCalibracion) +
            "/";
        var certificacionDeCalibracion = $scope.pdfCertificadoDeCalibracion; //archivoAdjunto
        var fd = new FormData();
        fd.append("archivo", certificacionDeCalibracion);
        fd.append("ruta", rutaAdjuntoCertificadoDeCalibracion);
        fd.append("nombrea", $scope.nombreAdjuntoCertificadoDeCalibracion);
        fd.append("oid", $scope.test4[9]);
        // fd.append('ruta', '/RC_CLI/6605e143f85c54f96700000e/170490/');
        // fd.append('nombrea', 'pdf_prueba');
        // fd.append('oid', '6605e143f85c54f96700000e');
        var deferred = $q.defer();
        $http
            .post("http://192.168.5.141:8003/wsRCPG/subirArchivo", fd, {
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
            })
            .then(function (data) {
                deferred.resolve(data.data);
                if (data.data.Success && data.data.code == 200) {
                    // swal('ARCHIVO GUARDADO', "PUEDE DESCARGAR SU ARCHIVO: " + data.data.Success, 'success');
                    // swal('FORMATO ACEPTADO', "EL ARCHIVO SE HA LEIDO CON EXITO", 'success');
                    $scope.enlaceDescargaCertificadoDeCalibracion = data.data.Success;
                    amb.insertarAdjunto(
                        8,
                        data.data.Success,
                        $scope.idSolicitudSeleccionada,
                        $scope.test4[9],
                        $scope.oidCiudadadano,
                        $scope.nombreAdjuntoCertificadoDeCalibracion,
                        function (resultado) {
                            console.log(resultado);
                            var RESPUESTA = JSON.parse(resultado);
                            if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                                swal(
                                    "SE HA GUARDADO EL ARCHIVO",
                                    "EL ARCHIVO CERTIFICADO DE CALIBRACION SE HA GUARDADO CON EXITO",
                                    "success"
                                );
                                $scope.campoCargaCertificadoDeCalibracionPDF = true;
                                $scope.mensajeCertificadoDeCalibracionPDFCargado = false;
                                $scope.botonSubirCertificadoDeCalibracion = true;
                                $scope.botonBajarCertificadoDeCalibracion = false;
                                $scope.botonCambiarPDFCertificadoDeCalibracion = false;
                            } else {
                                swal(
                                    "ERROR",
                                    "NO SE HA GUARDADO EL ARCHIVO CERTIFICADO DE CALIBRACION",
                                    "error"
                                );
                            }
                        }
                    );
                } else {
                    swal("ERROR", "SU ARCHIVO NO PUDO GUARDARSE", "error");
                }
            });
        console.log("DEFERRED: ", deferred.promise);
    };

    $scope.bajarCertificadoDeCalibracion = function () {
        var url = $scope.enlaceDescargaCertificadoDeCalibracion;
        $window.open(url, "_blank");
    };

    $scope.cambiarCertificadoDeCalibracion = function () {
        $scope.campoCargaCertificadoDeCalibracionPDF = false;
        $scope.mensajeCertificadoDeCalibracionPDFCargado = true;
        $scope.botonSubirCertificadoDeCalibracion = true;
        $scope.pdfCertificadoDeCalibracion = null;
    };

    $scope.subirPlanoUbicacionParlantes = function () {
        $scope.pdfPlanoUbicacionParlantes;
        console.log("ARCHIVO AJDUNTO: ", $scope.pdfPlanoUbicacionParlantes);
        let rutaAdjuntoPlanoUbicacionParlantes =
            "/RC_CLI/" +
            String($scope.test4[9]) +
            "/" +
            String($scope.nombreAdjuntoPlanoUbicacionParlantes) +
            "/";
        var planoUbicacionParlantes = $scope.pdfPlanoUbicacionParlantes; //archivoAdjunto
        var fd = new FormData();
        fd.append("archivo", planoUbicacionParlantes);
        fd.append("ruta", rutaAdjuntoPlanoUbicacionParlantes);
        fd.append("nombrea", $scope.nombreAdjuntoPlanoUbicacionParlantes);
        fd.append("oid", $scope.test4[9]);
        // fd.append('ruta', '/RC_CLI/6605e143f85c54f96700000e/170490/');
        // fd.append('nombrea', 'pdf_prueba');
        // fd.append('oid', '6605e143f85c54f96700000e');
        var deferred = $q.defer();
        $http
            .post("http://192.168.5.141:8003/wsRCPG/subirArchivo", fd, {
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
            })
            .then(function (data) {
                deferred.resolve(data.data);
                if (data.data.Success && data.data.code == 200) {
                    // swal('ARCHIVO GUARDADO', "PUEDE DESCARGAR SU ARCHIVO: " + data.data.Success, 'success');
                    // swal('FORMATO ACEPTADO', "EL ARCHIVO SE HA LEIDO CON EXITO", 'success');
                    $scope.enlaceDescargaPlanoUbicacionParlantes = data.data.Success;
                    amb.insertarAdjunto(
                        15,
                        data.data.Success,
                        $scope.idSolicitudSeleccionada,
                        $scope.test4[9],
                        $scope.oidCiudadadano,
                        $scope.nombreAdjuntoPlanoUbicacionParlantes,
                        function (resultado) {
                            console.log(resultado);
                            var RESPUESTA = JSON.parse(resultado);
                            if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                                swal(
                                    "SE HA GUARDADO EL ARCHIVO",
                                    "EL ARCHIVO PLANO DE UBICACION DE PARLANTES SE HA GUARDADO CON EXITO",
                                    "success"
                                );
                                $scope.campoCargaPlanoUbicacionParlantesPDF = true;
                                $scope.mensajePlanoUbicacionParlantesPDFCargado = false;
                                $scope.botonSubirPlanoUbicacionParlantes = true;
                                $scope.botonBajarPlanoUbicacionParlantes = false;
                                $scope.botonCambiarPDFPlanoUbicacionParlantes = false;
                            } else {
                                swal(
                                    "ERROR",
                                    "NO SE HA GUARDADO EL ARCHIVO PLANO DE UBICACION DE PARLANTES",
                                    "error"
                                );
                            }
                        }
                    );
                } else {
                    swal("ERROR", "SU ARCHIVO NO PUDO GUARDARSE", "error");
                }
            });
        console.log("DEFERRED: ", deferred.promise);
    };

    $scope.bajarPlanoUbicacionParlantes = function () {
        var url = $scope.enlaceDescargaPlanoUbicacionParlantes;
        $window.open(url, "_blank");
    };

    $scope.cambiarPlanoUbicacionParlantes = function () {
        $scope.campoCargaPlanoUbicacionParlantesPDF = false;
        $scope.mensajePlanoUbicacionParlantesPDFCargado = true;
        $scope.botonSubirPlanoUbicacionParlantes = true;
        $scope.pdfPlanoUbicacionParlantes = null;
    };

    $scope.limpiarFormAgregarSonometro = function () {
        // $scope.botonGuardarColindante = false;
        // $scope.botonModificarColindante = true;
        // $scope.listaSonometros = '';
        $scope.registroSonometro = "";
        $timeout(function () {
            $("#modalAgregarSonometro").modal("show");
        }, 0);
    };

    $scope.listarSonometro = function () {
        var oide_consultor = $scope.test4[9];
        amb.listarSonometro(
            $scope.idSolicitudSeleccionada,
            oide_consultor,
            function (listaDeSonometrosDevuelta) {
                listaDeSonometrosDevuelta = JSON.parse(listaDeSonometrosDevuelta);
                var RESPUESTA = listaDeSonometrosDevuelta;
                if (
                    RESPUESTA.success.data.length >= 1 &&
                    RESPUESTA.success.code == 200
                ) {
                    $scope.listaSonometros = RESPUESTA.success.data;
                    console.log("LISTA DE SONOMETROS: ", $scope.listaSonometros);
                    $scope.ocultarTabla = "false";
                } else {
                    console.log(
                        "ERROR RECUPERANDO LA LISTA DE SONOMETROS O AUN NO REGISTRÓ SONOMETROS"
                    );
                    // swal("Error", "Error recuperando la lista de sonometros, porfavor vuelva a la página anterior e ingrese nuevamente", "error")
                    $scope.ocultarTabla = "true";
                }
            }
        );
    };

    $scope.confirmarEliminarSonometro = function (idSonometro, equipoEmpleado) {
        $scope.idSonometroParaEeliminar = idSonometro;
        $scope.equipoSonometroParaEeliminar = equipoEmpleado;

        $timeout(function () {
            $("#modalConfirmacionEliminarSonometro").modal("show");
        }, 0);
    };

    $scope.borrarSonometro = function (todo) {
        console.log("Esto llego de SONOMETRO: ", todo);
        var idSonometro = $scope.idSonometroParaEeliminar;
        amb.eliminarSonometro(
            $scope.idSolicitudSeleccionada,
            idSonometro,
            function (resultado) {
                console.log(resultado);
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal("ACCION COMPLETADA", "EL SONOMETRO SE HA ELIMINADO", "success");
                    $scope.listarSonometro();
                } else {
                    swal("NO SE ELIMINÓ", "ERROR AL ELIMINAR EL SONOMETRO", "error");
                }
            }
        );
    };

    $scope.llamarSonometroParaEditar = function (sonometros) {
        $scope.datosSonometroParaEditar = sonometros;
        $timeout(function () {
            $("#modalModificarSonometro").modal("show");
        }, 0);
        console.log("DATOS DEL SONOMETRO", sonometros);
    };

    $scope.modificarSonometro = function (datosSonometroParaEditar) {
        console.log("DATOS SONOETRO PARA MODIFICAR", datosSonometroParaEditar);
        amb.modificarSonometro_01(
            $scope.idSolicitudSeleccionada,
            datosSonometroParaEditar.id_sonometro,
            datosSonometroParaEditar.equipo_empleado,
            datosSonometroParaEditar.marca_equipo,
            datosSonometroParaEditar.modelo_equipo,
            datosSonometroParaEditar.numero_serie_equipo,
            datosSonometroParaEditar.clase_equipo,
            datosSonometroParaEditar.fecha_calibracion_equipo,
            datosSonometroParaEditar.titular_equipo,
            function (resultado) {
                console.log(resultado);
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal(
                        "EXITO!",
                        "LOS DATOS DEL SONOMETRO SE HAN MODIFICADO CORRECTAMENTE",
                        "success"
                    );

                    // $scope.listarSonometro();
                } else {
                    swal(
                        "ERROR",
                        "LOS DATOS NO SE PUDIEONR GUARDAR CORRECTAMENTE",
                        "error"
                    );
                }
            }
        );
    };

    $scope.agregarFuenteSonora = function () {
        // $scope.botonGuardarColindante = false;
        // $scope.botonModificarColindante = true;
        // $scope.listaSonometros = '';
        $scope.registroFuenteSonora = "";
        $timeout(function () {
            $("#modalAgregarFuenteSonora").modal("show");
        }, 0);
    };

    $scope.insertarFuenteSonora = function (registroFuenteSonora) {
        console.log("DATOS FUENTE SONORA", registroFuenteSonora);
        var oide_consultor = $scope.test4[9];
        var oid_ciudadano = $scope.oidCiudadadano;
        amb.insertarFuenteSonora(
            registroFuenteSonora.tipo,
            registroFuenteSonora.potencia,
            registroFuenteSonora.numeroParlantes,
            registroFuenteSonora.propiedad,
            $scope.idSolicitudSeleccionada,
            oid_ciudadano,
            oide_consultor,
            function (resultado) {
                console.log(resultado);
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal(
                        "EXITO!",
                        "LOS DATOS DE LA FUENTE SONORA SE HAN INSERTADO CORRECTAMENTE",
                        "success"
                    );
                    $scope.listarFuenteSonora();
                } else {
                    swal(
                        "ERROR",
                        "LOS DATOS NO SE PUDIERON GUARDAR CORRECTAMENTE",
                        "error"
                    );
                }
            }
        );
    };

    $scope.listarFuenteSonora = function () {
        var oide_consultor = $scope.test4[9];
        amb.listarFuenteSonora(
            $scope.idSolicitudSeleccionada,
            oide_consultor,
            function (listaFuenteSonora) {
                listaFuenteSonora = JSON.parse(listaFuenteSonora);
                var RESPUESTA = listaFuenteSonora;
                if (
                    RESPUESTA.success.data.length >= 1 &&
                    RESPUESTA.success.code == 200
                ) {
                    $scope.fuenteSonora = RESPUESTA.success.data;
                    console.log("LISTA DE FUENTES SONORAS: ", RESPUESTA.success.data);
                    $scope.ocultarTablaFuenteSonora = "false";
                } else {
                    console.log("ERROR RECUPERANDO LA LISTA DE FUENTES SONORAS");
                    $scope.ocultarTablaFuenteSonora = "true";
                }
            }
        );
    };

    $scope.confirmarEliminarFuenteSonora = function (
        idFuenteSonora,
        tipoFuenteSonora
    ) {
        $scope.idFuenteSonoraParaEeliminar = idFuenteSonora;
        $scope.tipoFuenteSonoraParaEeliminar = tipoFuenteSonora;
        $timeout(function () {
            $("#modalConfirmacionEliminarFuenteSonora").modal("show");
        }, 0);
    };

    $scope.borrarFuenteSonora = function () {
        var idFuenteSonora = $scope.idFuenteSonoraParaEeliminar;
        amb.eliminarFuenteSonora(
            $scope.idSolicitudSeleccionada,
            idFuenteSonora,
            function (resultado) {
                console.log(resultado);
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal(
                        "ACCION COMPLETADA",
                        "LA FUENTE SONORA SE HA ELIMINADO",
                        "success"
                    );
                    $scope.listarFuenteSonora();
                } else {
                    swal("NO SE ELIMINÓ", "ERROR AL ELIMINAR LA FUENTE SONORA", "error");
                }
            }
        );
    };

    $scope.llamarFuenteSonoraParaEditar = function (fuenteSonora) {
        $scope.fuenteSonora = fuenteSonora;
        console.log("Fuente Sonora XXX: ", fuenteSonora);
        $timeout(function () {
            $("#modalModificarFuenteSonora").modal("show");
        }, 0);
    };

    $scope.modificarFuenteSonora = function (fuenteSonora) {
        console.log("DATOS FUENTE SONORA PARA MODIFICAR", fuenteSonora);
        amb.modificarFuenteSonora(
            $scope.idSolicitudSeleccionada,
            fuenteSonora.id_fuente_sonora,
            fuenteSonora.tipo,
            fuenteSonora.potencia,
            fuenteSonora.numeroparlantes,
            fuenteSonora.propiedad,
            function (resultado) {
                console.log(resultado);
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal(
                        "EXITO!",
                        "LOS DATOS DEL SONOMETRO SE HAN MODIFICADO CORRECTAMENTE",
                        "success"
                    );
                    $scope.listarFuenteSonora();
                } else {
                    swal(
                        "ERROR",
                        "LOS DATOS NO SE PUDIEONR GUARDAR CORRECTAMENTE",
                        "error"
                    );
                }
            }
        );
    };

    $scope.limpiarFormAgregarNivel = function () {
        // $scope.botonGuardarColindante = false;
        // $scope.botonModificarColindante = true;
        // $scope.listaSonometros = '';
        $scope.registroNivel = "";
        $timeout(function () {
            $("#modalAgregarNivel").modal("show");
        }, 0);
    };

    $scope.insertarNivel = function (registroNivel, numeroDeNivel) {
        console.log("DATOS DEL NIVEL: ", registroNivel);
        console.log("NUMERO DE NIVEL: ", numeroDeNivel);
        var oide_consultor = $scope.test4[9];
        var oid_ciudadano = $scope.oidCiudadadano;
        amb.registrarNivel(
            registroNivel.superficie,
            registroNivel.altura,
            $scope.idSolicitudSeleccionada,
            oid_ciudadano,
            oide_consultor,
            numeroDeNivel,
            function (resultado) {
                console.log(resultado);
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal(
                        "EXITO!",
                        "LOS DATOS DEL NIVEL SE HAN INSERTADO CORRECTAMENTE",
                        "success"
                    );
                    $scope.listarNivel();
                } else {
                    swal(
                        "ERROR",
                        "LOS DATOS DEL NIVEL NO SE PUDIERON GUARDAR CORRECTAMENTE",
                        "error"
                    );
                }
            }
        );
    };

    $scope.llamarNivelParaEditar = function (datosNivel) {
        // swal('INFORMACION', "EDICION EN DESARROLLO", 'info');
        $scope.datosNivel = datosNivel;
        console.log("Fuente Sonora XXX: ", datosNivel);
        $timeout(function () {
            $("#modalModificarNivel").modal("show");
        }, 0);
    };

    $scope.eliminarNivel = function (id_niveles, volumen) {
        // swal('INFORMACION', "ELIMINACION EN DESARROLLO", 'info');
        //console.log("DATOS DEL NIVEL: ", nivel)
        $scope.idNivelParaEliminar = id_niveles;
        $scope.nivelParaEliminar = volumen;
        $timeout(function () {
            $("#modalConfirmacionEliminarNivel").modal("show");
        }, 0);
    };

    $scope.borrarNivel = function () {
        var idNivel = $scope.idNivelParaEliminar;
        amb.eliminarNivel(
            $scope.idSolicitudSeleccionada,
            idNivel,
            function (resultado) {
                console.log(resultado);
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal("ACCION COMPLETADA", "EL NIVEL SE HA ELIMINADO", "success");
                    $scope.listarNivel();
                } else {
                    swal("NO SE ELIMINÓ", "ERROR AL ELIMINAR EL NIVEL", "error");
                }
            }
        );
    };

    $scope.listarNivel = function () {
        var oide_consultor = $scope.test4[9];
        amb.listarNivel(
            $scope.idSolicitudSeleccionada,
            oide_consultor,
            function (listarNiveles) {
                listarNiveles = JSON.parse(listarNiveles);
                var RESPUESTA = listarNiveles;
                $scope.numeroDeNivel = RESPUESTA.success.data.length + 1;

                //console.log("NUMERO DE NIVEL: ", numeroDeNivel)
                if (
                    RESPUESTA.success.data.length >= 1 &&
                    RESPUESTA.success.code == 200
                ) {
                    $scope.niveles = RESPUESTA.success.data;
                    console.log("DATOS: ", RESPUESTA.success.data);
                    $scope.ocultarTablaNivel = "false";
                } else {
                    console.log("ERROR RECUPERANDO LA LISTA DE NIVELES");
                    $scope.ocultarTablaNivel = "true";
                }
            }
        );
    };

    $scope.modificarNivel = function (datosNivel) {
        console.log("DATOS NIVEL PARA MODIFICAR", datosNivel);
        amb.modificarNivel(
            $scope.idSolicitudSeleccionada,
            datosNivel.id_niveles,
            datosNivel.superficie,
            datosNivel.altura,
            datosNivel.numero,
            function (resultado) {
                console.log(resultado);
                var RESPUESTA = JSON.parse(resultado);
                if (RESPUESTA.success != null && RESPUESTA.success.code == 200) {
                    swal(
                        "EXITO!",
                        "LOS DATOS DEL NIVEL SE HAN MODIFICADO CORRECTAMENTE",
                        "success"
                    );
                    $scope.listarNivel();
                } else {
                    swal("ERROR", "LOS DATOS NO SE GUARDARON CORRECTAMENTE", "error");
                }
            }
        );
    };

    $scope.descargarCSVInteriorCA = function (enlaceDescargaIntCA) {
        $window.open(enlaceDescargaIntCA, "_blank");
    };

    $scope.descargarCSVInteriorRF = function (enlaceDescargaIntRF) {
        $window.open(enlaceDescargaIntRF, "_blank");
    };

    $scope.descargarCSVExteriorCA = function (enlaceDescargaExtCA) {
        $window.open(enlaceDescargaExtCA, "_blank");
    };

    $scope.descargarCSVExteriorRF = function (enlaceDescargaExtRF) {
        $window.open(enlaceDescargaExtRF, "_blank");
    };

    $scope.eeisAutogenerado = function () {
        $scope.seMuestraEstudioAutogenerado = true;
        $scope.seMuestraFormularioContinuacion = false;
        $scope.eeisPuntoInterior = $scope.puntosInterioresCAyRFparaEditarEliminar;
        $scope.eeisPuntoExterior = $scope.puntosExterioresCAyRFparaEditarEliminar;

        console.log("SE LLEGÓ A EEIS AUTOGENERADO");
        $scope.datosProcesados = false;
        var ctx0ca = document.getElementById("myChart0ca").getContext("2d");
        var ctx0rf = document.getElementById("myChart0rf").getContext("2d");
        var ctx1 = document.getElementById("myChart1").getContext("2d");
        var ctx = document.getElementById("myChart").getContext("2d");
        var puntos = $scope.PuntosCAyRFparaElFront; //Traemos el objeto con los datos
        console.log("LOS PUNTOS: ", puntos);

        var puntosConAact = puntos.map((item) => ({
            decibeles_ca: item.decibeles_ca,
        }));

        var puntosSinAact = puntos.map((item) => ({
            decibeles_ca: item.decibeles_rf,
        }));

        // CUADRO CERO
        var valoresDeY0_CA = JSON.stringify(puntosConAact[0]);
        const vectorY0_CA = valoresDeY0_CA.split(",").map(Number); // Convertimos el string de decibeles al tipo array
        var valoresDeX0_CA = Array.from(vectorY0_CA.keys(), (num) => num + 1); // generamos los puntos en X a partir de la longitud de decibeles (Y)
        var valoresDeY0_CA = vectorY0_CA;
        $scope.myChart = new Chart(ctx0ca, {
            type: "line",
            data: {
                labels: valoresDeX0_CA,
                datasets: [
                    {
                        label: "DECIBELES A",
                        data: valoresDeY0_CA,
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 2,
                        fill: true,
                        pointRadius: 0,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        type: "linear",
                        position: "bottom",
                        title: {
                            display: true,
                            text: "SEGUNDOS [seg]",
                            color: "black",
                            font: {
                                size: 18, // Tamaño de letra
                                weight: "bold", // Negrita
                                family: "Arial", // Tipo de letra
                            },
                        },
                        ticks: {
                            color: "black", // Cambiar el color del texto de los ticks del eje X
                            font: {
                                family: "Arial",
                                size: 15,
                                weight: "bold", // Tipo de letra para los números del eje Y
                            },
                        },
                        min: 0, // Valor mínimo del eje X
                        max: 300, // Valor máximo del eje X
                    },
                    y: {
                        title: {
                            display: true,
                            text: "DECIBELES [dba]",
                            color: "black",
                            font: {
                                size: 18, // Tamaño de letra
                                weight: "bold", // Negrita
                                family: "Arial", // Tipo de letra
                            },
                        },
                        ticks: {
                            color: "black", // Cambiar el color del texto de los ticks del eje Y
                            font: {
                                family: "Arial",
                                size: 15,
                                weight: "bold", // Tipo de letra para los números del eje Y
                            },
                        },
                        min: 50, // Valor mínimo del eje X
                        max: 150, // Valor máximo del eje X
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            color: "black", // Cambiar el color de fondo de la leyenda
                        },
                    },
                    title: {
                        display: true,
                        text: "NIVELES DE PRESION SONORA CON ACTIVIDAD",
                        font: {
                            size: 20, // Tamaño de letra del título
                            family: "Arial", // Tipo de letra del título
                            weight: "bold", // Peso del título (negrita)
                            style: "italic", // Estilo del título (cursiva)
                        },
                    },
                },
                margins: {
                    left: "150",
                    right: "150",
                    top: "150",
                    bottom: "150",
                },
            },
            datasets: [
                {
                    borderColor: "black",
                    borderWidth: 2,
                },
            ],
        });

        // PARTE EXPERTA
        var numeros = vectorY0_CA;
        let dbCSV = numeros.map((value) => [value, "X"]);
        var posicionDeCopias = [];
        var numeroColor = -1;
        for (let contador = 0; contador < dbCSV.length - 1; contador++) {
            var primero = dbCSV[contador][0];
            var segundo = dbCSV[contador + 1][0];
            for (let i = contador + 2; i < dbCSV.length - 1; i++) {
                if (
                    dbCSV[i][0] == primero &&
                    dbCSV[i + 1][0] == segundo &&
                    dbCSV[i][1] == "X" &&
                    dbCSV[i + 1][1] == "X"
                ) {
                    posicionDeCopias.push(i);
                    posicionDeCopias.push(i + 1);
                }
            }
            if (posicionDeCopias.length !== 0) {
                posicionDeCopias.push(contador);
                posicionDeCopias.push(contador + 1);
                posicionDeCopias = posicionDeCopias
                    .slice(-2)
                    .concat(posicionDeCopias.slice(0, -2));
                numeroColor = numeroColor + 1;
                console.log("COPIAS EN LAS POSICIONES: ", posicionDeCopias);
            }
            posicionDeCopias.forEach((indice) => {
                if (dbCSV[indice] && dbCSV[indice][1] === "X") {
                    dbCSV[indice][1] = numeroColor;
                }
            });
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
        // PARTE EXPERTA

        var valoresDeY0_RF = JSON.stringify(puntosSinAact[0]);
        const vectorY0_RF = valoresDeY0_RF.split(",").map(Number); // Convertimos el string de decibeles al tipo array
        var valoresDeX0_RF = Array.from(vectorY0_RF.keys(), (num) => num + 1); // generamos los puntos en X a partir de la longitud de decibeles (Y)
        var valoresDeY0_RF = vectorY0_RF;
        $scope.myChart = new Chart(ctx0rf, {
            type: "line",
            data: {
                labels: valoresDeX0_RF,
                datasets: [
                    {
                        label: "DECIBELES A",
                        data: valoresDeY0_RF,
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 2,
                        fill: true,
                        pointRadius: 0,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        type: "linear",
                        position: "bottom",
                        title: {
                            display: true,
                            text: "SEGUNDOS [seg]",
                            color: "black",
                            font: {
                                size: 18, // Tamaño de letra
                                weight: "bold", // Negrita
                                family: "Arial", // Tipo de letra
                            },
                        },
                        ticks: {
                            color: "black", // Cambiar el color del texto de los ticks del eje X
                            font: {
                                family: "Arial",
                                size: 15,
                                weight: "bold", // Tipo de letra para los números del eje Y
                            },
                        },
                        min: 0, // Valor mínimo del eje X
                        max: 300, // Valor máximo del eje X
                    },
                    y: {
                        title: {
                            display: true,
                            text: "DECIBELES [dba]",
                            color: "black",
                            font: {
                                size: 18, // Tamaño de letra
                                weight: "bold", // Negrita
                                family: "Arial", // Tipo de letra
                            },
                        },
                        ticks: {
                            color: "black", // Cambiar el color del texto de los ticks del eje Y
                            font: {
                                family: "Arial",
                                size: 15,
                                weight: "bold", // Tipo de letra para los números del eje Y
                            },
                        },
                        min: 50, // Valor mínimo del eje X
                        max: 150, // Valor máximo del eje X
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            color: "black", // Cambiar el color de fondo de la leyenda
                        },
                    },
                    title: {
                        display: true,
                        text: "NIVELES DE PRESION SONORA CON RUIDO DE FONDO",
                        font: {
                            size: 20, // Tamaño de letra del título
                            family: "Arial", // Tipo de letra del título
                            weight: "bold", // Peso del título (negrita)
                            style: "italic", // Estilo del título (cursiva)
                        },
                    },
                },
                margins: {
                    left: "150",
                    right: "150",
                    top: "150",
                    bottom: "150",
                },
            },
            datasets: [
                {
                    borderColor: "black",
                    borderWidth: 2,
                },
            ],
        });

        // PRIMER CUADRO
        var valoresDeY = JSON.stringify(puntosConAact[1]);
        const vectorY = valoresDeY.split(",").map(Number); // Convertimos el string de decibeles al tipo array
        var valoresDeX1 = Array.from(vectorY.keys(), (num) => num + 1); // generamos los puntos en X a partir de la longitud de decibeles (Y)
        var valoresDeY1 = vectorY;

        $scope.myChart = new Chart(ctx1, {
            type: "line",
            data: {
                labels: valoresDeX1,
                datasets: [
                    {
                        label: "DECIBELES A",
                        data: valoresDeY1,
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 2,
                        fill: true,
                        pointRadius: 0,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        type: "linear",
                        position: "bottom",
                        title: {
                            display: true,
                            text: "SEGUNDOS [seg]",
                            color: "black",
                            font: {
                                size: 18, // Tamaño de letra
                                weight: "bold", // Negrita
                                family: "Arial", // Tipo de letra
                            },
                        },
                        ticks: {
                            color: "black", // Cambiar el color del texto de los ticks del eje X
                            font: {
                                family: "Arial",
                                size: 15,
                                weight: "bold", // Tipo de letra para los números del eje Y
                            },
                        },
                        min: 0, // Valor mínimo del eje X
                        max: 300, // Valor máximo del eje X
                    },
                    y: {
                        title: {
                            display: true,
                            text: "DECIBELES [dba]",
                            color: "black",
                            font: {
                                size: 18, // Tamaño de letra
                                weight: "bold", // Negrita
                                family: "Arial", // Tipo de letra
                            },
                        },
                        ticks: {
                            color: "black", // Cambiar el color del texto de los ticks del eje Y
                            font: {
                                family: "Arial",
                                size: 15,
                                weight: "bold", // Tipo de letra para los números del eje Y
                            },
                        },
                        min: 50, // Valor mínimo del eje X
                        max: 150, // Valor máximo del eje X
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            color: "black", // Cambiar el color de fondo de la leyenda
                        },
                    },
                    title: {
                        display: true,
                        text: "NIVELES DE PRESION SONORA",
                        font: {
                            size: 20, // Tamaño de letra del título
                            family: "Arial", // Tipo de letra del título
                            weight: "bold", // Peso del título (negrita)
                            style: "italic", // Estilo del título (cursiva)
                        },
                    },
                },
                margins: {
                    left: "150",
                    right: "150",
                    top: "150",
                    bottom: "150",
                },
            },
            datasets: [
                {
                    borderColor: "black",
                    borderWidth: 2,
                },
            ],
        });
        ///SEGUNDO CUADRO
        var valoresDeY = JSON.stringify(puntosConAact[2]);
        const array = valoresDeY.split(",").map(Number); // Convertimos el string de decibeles al tipo array
        var valoresDeX = Array.from(array.keys(), (num) => num + 1); // generamos los puntos en X a partir de la longitud de decibeles (Y)
        var valoresDeY = array;

        $scope.myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: valoresDeX,
                datasets: [
                    {
                        label: "DECIBELES A",
                        data: valoresDeY,
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 2,
                        fill: true,
                        pointRadius: 0,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        type: "linear",
                        position: "bottom",
                        title: {
                            display: true,
                            text: "SEGUNDOS [seg]",
                            color: "black",
                            font: {
                                size: 18, // Tamaño de letra
                                weight: "bold", // Negrita
                                family: "Arial", // Tipo de letra
                            },
                        },
                        ticks: {
                            color: "black", // Cambiar el color del texto de los ticks del eje X
                            font: {
                                family: "Arial",
                                size: 15,
                                weight: "bold", // Tipo de letra para los números del eje Y
                            },
                        },
                        min: 0, // Valor mínimo del eje X
                        max: 300, // Valor máximo del eje X
                    },
                    y: {
                        title: {
                            display: true,
                            text: "DECIBELES [dba]",
                            color: "black",
                            font: {
                                size: 18, // Tamaño de letra
                                weight: "bold", // Negrita
                                family: "Arial", // Tipo de letra
                            },
                        },
                        ticks: {
                            color: "black", // Cambiar el color del texto de los ticks del eje Y
                            font: {
                                family: "Arial",
                                size: 15,
                                weight: "bold", // Tipo de letra para los números del eje Y
                            },
                        },
                        min: 50, // Valor mínimo del eje X
                        max: 150, // Valor máximo del eje X
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            color: "black", // Cambiar el color de fondo de la leyenda
                        },
                    },
                    title: {
                        display: true,
                        text: "NIVELES DE PRESION SONORA",
                        font: {
                            size: 20, // Tamaño de letra del título
                            family: "Arial", // Tipo de letra del título
                            weight: "bold", // Peso del título (negrita)
                            style: "italic", // Estilo del título (cursiva)
                        },
                    },
                },
                margins: {
                    left: "150",
                    right: "150",
                    top: "150",
                    bottom: "150",
                },
            },
            datasets: [
                {
                    borderColor: "black",
                    borderWidth: 2,
                },
            ],
        });

        $scope.getClass = function (numero) {
            // var primerNumero = $scope.primerNumero;
            // if (numero == primerNumero) {
            //     return 'es';
            // } else {
            //     return 'noes';
            // }
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


    };
}
