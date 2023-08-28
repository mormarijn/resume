(function () {
    $(document).mousemove(function (e) {
        $('.pointer1, .pointer2').css({left: e.pageX, top: e.pageY});
    }).mousedown(function () {
        $('.pointer1').removeClass('ring').addClass('circle');
    }).mouseup(function () {
        $('.pointer1').removeClass('circle').addClass('ring');
    });

    $('div.content').scroll(function () {
        if (Math.ceil($('div.content').scrollTop()) + $('div.content').height() >= $(document).height()) {
            $('#scroll-to-top').removeClass('transition').fadeIn(500, function () {
                $(this).addClass('transition');
            });
        } else {
            $('#scroll-to-top').removeClass('transition').fadeOut(500, function () {
                $(this).addClass('transition');
            });
        }
    });

    $('#scroll-to-top, .logo').on({
        click: function () {
            scrollToTop();
        }
    });

    $('a.tag.tag-strava').on({
        mouseenter: function () {
            $(this).find('i').removeClass('fa-solid').addClass('fa-brands');
        },
        mouseleave: function() {
            $(this).find('i').removeClass('fa-brands').addClass('fa-solid');
        }
    });

    window.addEventListener('load', function () {
        renderLeafletMap();
    });

    function scrollToTop() {
        $('div.content').animate({
            scrollTop: 0
        }, 500);
    }

    function renderLeafletMap() {
        var logo = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([3.440047, 51.527508]))
        });
        var svg = '<svg viewBox="21.948 21.948 263.445 285.324" width="46.1667" height="50" xmlns="http://www.w3.org/2000/svg">' 
        + '<g transform="matrix(1, 0, 0, 1, -65.844002, -109.740013)">'
        + '<title>mg</title>'
        + '<path style="stroke: rgb(0, 0, 0); fill: rgb(68, 68, 68); stroke-width: 0px;" d="M 351.237 197.33 L 307.272 219.48 L 307.272 197.532 L 219.48 241.428 L 131.688 197.532 L 131.688 307.272 L 87.792 285.324 L 87.792 131.688 L 219.48 197.532 L 351.168 131.688 L 351.168 197.532">'
        + '<title>m</title>'
        + '</path>'
        + '<path style="stroke: rgb(0, 0, 0); fill: rgb(68, 68, 68); stroke-width: 0px;" d="M 131.455 329.067 L 219.48 373.116 L 307.272 329.22 L 307.272 285.324 L 219.48 329.22 L 219.48 285.324 L 307.272 241.428 L 351.168 219.48 L 351.168 351.168 L 219.48 417.012 L 87.792 351.168 L 87.792 307.272 L 131.688 329.22">'
        + '<title>g</title>'
        + '</path>'
        + '</g>'
        + '</svg>';
        logo.setStyle(new ol.style.Style({
            image: new ol.style.Icon({
                src: 'data:image/svg+xml;base64,' + window.btoa(svg),
                scale: 1
            })
        }));
        var map = new ol.Map({
            layers: [
              new ol.layer.Tile({
                source: new ol.source.Stamen({
                  layer: 'watercolor'
                })
              }),
              new ol.layer.Tile({
                source: new ol.source.Stamen({
                  layer: 'terrain-labels'
                })
              }),
              new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [logo]
                })
              })
            ],
            target: 'map',
            view: new ol.View({
              center: ol.proj.fromLonLat([3.440047, 51.527508]),
              minZoom: 3,
              maxZoom: 14,
              zoom: 7
            })
        });
        $('div.ol-zoom').remove();
        $('div.ol-attribution').remove();
    }
})();