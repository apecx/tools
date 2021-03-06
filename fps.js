function apecx_get_url(e) {
    var n = document.createElement("a");
    return n.href = e, n
}

function apecx_get_host_name(e) {
    return null == e || "" === e || e.match(/^\#/) ? "" : -1 === (e = apecx_get_url(e)).href.search(/^http[s]?:\/\//) ? "" : e.href.split("/")[2].split(":")[0].toLowerCase()
}

function apecx_base64_encode(e) {
    return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(e, n) {
        return String.fromCharCode("0x" + n)
    }))
}

function apecx_get_wildcard_domains(e) {
    var n = [];
    for (i = 0; i < e.length; i++) e[i].match(/^\*\./) && n.push(e[i].replace(/^\*\./, ""));
    return n
}

function apecx_match_wildcard_domain(e, n) {
    var t = apecx_get_wildcard_domains(e);
    for (i = 0; i < t.length; i++)
        if (n.substr(-1 * t[i].length) === t[i]) return !0;
    return !1
}

function apecx_domain_exist(e, n) {
    return -1 < e.indexOf(n) || apecx_match_wildcard_domain(e, n)
}
document.addEventListener("DOMContentLoaded", function(e) {
    if ("undefined" != typeof apecx_url && "undefined" != typeof apecx_api_token) {
        var n = document.getElementsByTagName("a");
        if ("undefined" == typeof apecx_domains)
            if ("undefined" == typeof apecx_exclude_domains);
            else
                for (t = 0; t < n.length; t++) 0 < (a = apecx_get_host_name(n[t].getAttribute("href"))).length && !1 === apecx_domain_exist(apecx_exclude_domains, a) ? (n[t].href = apecx_url + "full/?key=" + encodeURIComponent(apecx_api_token) + "&url=" + apecx_base64_encode(n[t].href), n[t].rel = '') : "magnet:" === n[t].protocol && (n[t].href = apecx_url + "full/?key=" + encodeURIComponent(apecx_api_token) + "&url=" + apecx_base64_encode(n[t].href), n[t].rel = '');
        else
            for (var t = 0; t < n.length; t++) {
                var a;
                0 < (a = apecx_get_host_name(n[t].getAttribute("href"))).length && apecx_domain_exist(apecx_domains, a) ? ( n[t].href = apecx_url + "full/?key=" + encodeURIComponent(apecx_api_token) + "&url=" + apecx_base64_encode(n[t].href), n[t].rel = '' ) : "magnet:" === n[t].protocol && (n[t].href = apecx_url + "full/?key=" + encodeURIComponent(apecx_api_token) + "&url=" + apecx_base64_encode(n[t].href), n[t].rel = '')
            }
    }
});
