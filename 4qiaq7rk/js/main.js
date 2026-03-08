// Inject affiliate tag + RT clickid into ClickBank buy links
(function () {
    var params = new URLSearchParams(window.location.search);
    var clickid = params.get('clickid') || params.get('tid') || '';

    document.querySelectorAll('.btn-card').forEach(function (el) {
        if (el.href && el.href.indexOf('clickbank.net') !== -1) {
            el.href = el.href + '&affiliate=gglmkt' + (clickid ? '&tid=' + clickid : '');
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
