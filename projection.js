ymaps.ready(['projection.LambertConformalConic']).then(function init() {

    // Создаем проекцию Ламберта.
    var LAMBERT_PROJECTION = new ymaps.projection.LambertConformalConic();

    // Создаем карту.
    var map = new ymaps.Map('map', {
        center: [65, 98],
        zoom: 3,
        type: null,
        controls: []
    }, {
        minZoom: 1,
        // Задаем проекцию Ламберта.
        projection: LAMBERT_PROJECTION
    });

    // Добавляем фон.
    var pane = new ymaps.pane.StaticPane(map, {
        zIndex: 100, css: {
            width: '100%', height: '100%', backgroundColor: '#485668'
        }
    });
    map.panes.append('greyBackground', pane);

    // Загружаем и добавляем регионы России на карту.
    ymaps.borders.load('RU', {
        lang: 'ru'
    }).then(function (result) {
        regions = new ymaps.GeoObjectCollection(null, {
            fillColor: '#051c3a',
            strokeColor: '#9299a2',
            hasHint: false,
            cursor: 'default'
        });
        for (var i = 0; i < result.features.length; i++) {
            regions.add(new ymaps.GeoObject(result.features[i]));
        }

        map.geoObjects.add(regions);
    });

    // const placemark = new ymaps.Placemark([55.642063, 37.656123], {
    // balloonContent: 'цвет <strong>красный</strong>'
    // }, {
    //     preset: 'islands#redSportIcon',
    // });
    // map.geoObjects.add(placemark);

    // placemark.events.add('mouseenter', function (e) {        
    //     var balloon = e.get('target').balloon;
    //     balloon.open();
    //     balloon.events.add("mouseleave", closeBalloon)   
    // });
       
    // var closeBalloon = function (e) {      
    //     console.log(e.get('target'));      
    //     e.close();           
    //     e.events.remove("mouseleave", closeBalloon);    
    // };


    var placemarker = new ymaps.Placemark([55.642063, 37.656123], {balloonContent: "test"});
    map.geoObjects.add(placemarker); 
    var closeBalloon = function (e) {  
        var balloon = e.get("target").balloon;
        balloon.close();
        balloon.events.remove("mouseleave", closeBalloon);
    };
    placemarker.events.add("mouseenter", function () {
        var balloon = placemarker.balloon;
        balloon.open();
        balloon.events.add("mouseleave", closeBalloon)
    });
});
