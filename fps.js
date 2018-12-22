function apecx_get_url(e) {
    var n = document.createElement("a");
    return n.href = e, n
}

function apecx_get_host_name(e) {
    return null == e || "" === e || e.match(/^\#/) ? "" : -1 === (e = apecx_get_url(e)).href.search(/^http[s]?:\/\//) ? "" : e.href.split("/")[2].split(":")[0].toLowerCase()
}

function apecx_base64_encode(e) {
    return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, n) {
        return String.fromCharCode("0x" + n)
    }))
}

function apecx_get_wildcard_domains(e) {
    var n = [];
    for (i = 0; i < e.length; i++) e[i].match(/^\*\./) && n.push(e[i].replace(/^\*\./, ""));
    return n
}

function apecx_match_wildcard_domain(e, n) {
    var l = apecx_get_wildcard_domains(e);
    for (i = 0; i < l.length; i++)
        if (n.substr(-1 * l[i].length) === l[i]) return !0;
    return !1
}

function apecx_domain_exist(e, n) {
    return e.indexOf(n) > -1 || apecx_match_wildcard_domain(e, n)
}

document.addEventListener("DOMContentLoaded", function (e) {
    if ("undefined" != typeof apecx_url && "undefined" != typeof apecx_api_token) {
        var l = document.getElementsByTagName("a");
        if ("undefined" == typeof apecx_domains)
            if ("undefined" == typeof apecx_exclude_domains) ;
            else
                for (t = 0; t < l.length; t++) {
                    (a = apecx_get_host_name(l[t].getAttribute("href"))).length > 0 && !1 === apecx_domain_exist(apecx_exclude_domains, a) ? l[t].href = apecx_url + "full/?key=" + encodeURIComponent(apecx_api_token) + "&url=" + apecx_base64_encode(l[t].href) : "magnet:" === l[t].protocol && (l[t].href = apecx_url + "full/?key=" + encodeURIComponent(apecx_api_token) + "&url=" + apecx_base64_encode(l[t].href))
                } else
            for (var t = 0; t < l.length; t++) {
                var a;
                (a = apecx_get_host_name(l[t].getAttribute("href"))).length > 0 && apecx_domain_exist(apecx_domains, a) ? l[t].href = apecx_url + "full/?key=" + encodeURIComponent(apecx_api_token) + "&url=" + apecx_base64_encode(l[t].href) : "magnet:" === l[t].protocol && (l[t].href = apecx_url + "full/?key=" + encodeURIComponent(apecx_api_token) + "&url=" + apecx_base64_encode(l[t].href))
            }
    }
});
