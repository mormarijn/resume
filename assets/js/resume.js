(function () {
    $(document).mousemove(function (e) {
        $(".pointer1, .pointer2").css({left: e.pageX, top: e.pageY});
    }).mousedown(function () {
        $(".pointer1").removeClass("ring").addClass("circle");
    }).mouseup(function () {
        $(".pointer1").removeClass("circle").addClass("ring");
    });

    $("div.content").scroll(function () {
        if (Math.ceil($("div.content").scrollTop()) + $("div.content").height() >= $(document).height()) {
            $("#scroll-to-top").removeClass("transition").fadeIn(500, function () {
                $(this).addClass("transition");
            });
        } else {
            $("#scroll-to-top").removeClass("transition").fadeOut(500, function () {
                $(this).addClass("transition");
            });
        }
    });

    $("#scroll-to-top, .logo").on({
        click: function () {
            scrollToTop();
        }
    });

    function scrollToTop() {
        $("div.content").animate({
            scrollTop: 0
        }, 500);
    }
})();