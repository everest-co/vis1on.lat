// Append URL params to ClickBank links
(function () {
    var params = window.location.search;
    if (!params) return;
    var extra = params.substring(1);
    document.querySelectorAll('.btn-card').forEach(function (el) {
        if (el.href && el.href.indexOf('clickbank.net') !== -1) {
            el.href = el.href + '&' + extra;
        }
    });
})();

// Vturb: reveal quiz at pitch time
var delaySeconds = 2127;
var player = document.querySelector("vturb-smartplayer");
player.addEventListener("player:ready", function () {
    player.displayHiddenElements(delaySeconds, [".invisible"], {
        persist: true,
    });
});
