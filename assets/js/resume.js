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
        var svg = '<svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">'
        + '<circle cx="50" cy="50" r="30" stroke="white" stroke-width="15" fill="rgb(68, 68, 68)" />'
        + '</svg>';
        logo.setStyle(new ol.style.Style({
            image: new ol.style.Icon({
                src: 'data:image/svg+xml;base64,' + window.btoa(svg),
                scale: 0.25
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