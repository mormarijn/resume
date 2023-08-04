(function () {
    $(document).mousemove(function (e) {
        $(".pointer1, .pointer2").css({left: e.pageX, top: e.pageY});
    }).mousedown(function () {
        $(".pointer1").removeClass("ring").addClass("circle");
    }).mouseup(function () {
        $(".pointer1").removeClass("circle").addClass("ring");
    });
})();