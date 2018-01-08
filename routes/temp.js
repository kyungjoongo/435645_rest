try {
    document.execCommand('BackgroundImageCache', false, true);
} catch (e) {
}
naver = window.naver || {};
naver.search = naver.search || {};
naver.search.ext = naver.search.ext || {};
naver.search.map_api = {
    v2: "https://ssl.pstatic.net/sstatic.map/openapi/openapi_v23.js",
    v3: "https://ssl.pstatic.net/sstatic.map/openapi/maps3.js"
};
var nx_au_cookie_domain = "search.naver.com";
var nx_mobile_agent = 0;
var headerfooter_query = "집밥 백선생 레시피 모음";
var headerfooter_query_encoded = "%EC%A7%91%EB%B0%A5+%EB%B0%B1%EC%84%A0%EC%83%9D+%EB%A0%88%EC%8B%9C%ED%94%BC+%EB%AA%A8%EC%9D%8C";
var headerfooter_query_encoded_uhc = "%C1%FD%B9%E4+%B9%E9%BC%B1%BB%FD+%B7%B9%BD%C3%C7%C7+%B8%F0%C0%BD";
var headerfooter_query_encoded_utf8 = "%EC%A7%91%EB%B0%A5+%EB%B0%B1%EC%84%A0%EC%83%9D+%EB%A0%88%EC%8B%9C%ED%94%BC+%EB%AA%A8%EC%9D%8C";
var headerfooter_time_year = 2018;
var headerfooter_time_month = 1;
var headerfooter_time_day = 8;
var headerfooter_time_hour = 6;
var headerfooter_time_minute = 52;
var headerfooter_time_second = 38;
var headerfooter_time_wday = 1;
var headerfooter_time_year_s = "2018";
var headerfooter_time_month_s = "01";
var headerfooter_time_day_s = "08";
var headerfooter_time_hour_s = "06";
var headerfooter_time_minute_s = "52";
var headerfooter_time_second_s = "38";
var headerfooter_time_wday_s = "1";
var g_ssc = "tab.blog.post";
var g_query = headerfooter_query_encoded_uhc;
var g_query_cr = "%C1%FD%B9%E4+%B9%E9%BC%B1%BB%FD+%B7%B9%BD%C3%C7%C7+%B8%F0%C0%BD";
var g_url_query = "";
var g_puid = "TD6TplpySDGssbk84sRssssssLN-304623";
var g_suid = "NNHwwwxkuS7b2mBHCBCYng==";
var g_tab = "blog";
var g_content_tab = "blog";
var g_stab = "post";
var g_stab_orig = "post";
var g_crt = "";
var g_m_str = "";
var g_tablet_device = 0;
var g_nx_splugin;
document.domain = "naver.com";
document.documentElement.setAttribute('data-useragent', window.navigator.userAgent.toLowerCase());
document.documentElement.setAttribute('data-platform', window.navigator.platform.toLowerCase());
window.onerror = function (e) {
    if (!e) e = window.event;
    if (!g_D) {
        window.status = e;
    }
    return !g_D;
};
var g_er_image, g_er_count = 0;

function g_er(msg) {
    if (g_er_count++ > 0) return;
    g_er_image = new Image();
    g_er_image.src = "http://er.search.naver.com/er?f=" + g_tab + "&w=" + g_stab + "&q=%EC%A7%91%EB%B0%A5+%EB%B0%B1%EC%84%A0%EC%83%9D+%EB%A0%88%EC%8B%9C%ED%94%BC+%EB%AA%A8%EC%9D%8C&u=" + encodeURIComponent(document.location) + "&m=" + encodeURIComponent(msg);
}

function trim_space(q) {
    var head_re = /^ */;
    var tail_re = / *$/;
    q = q.replace(head_re, "");
    q = q.replace(tail_re, "");
    return q;
}

function trim_crlf(q) {
    var crlf = /[\r|\n]/;
    q = q.replace(crlf, "");
    return q;
}

if (typeof(encodeURIComponent) != "function") {
    encodeURIComponent = function (s) {
        function toHex(n) {
            var hexchars = "0123456789ABCDEF";
            return "%" + hexchars.charAt(n >> 4) + hexchars.charAt(n & 0xF);
        }

        var es = "";
        for (var i = 0; i < s.length;) {
            var c = s.charCodeAt(i++);
            if ((c & 0xF800) == 0xD800) {
                var sc = s.charCodeAt(i++);
                c = ((c - 0xD800) << 10) + (sc - 0xDC00) + 0x10000;
            }
            if (!(c & ~0x7F)) {
                if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122) || (c >= 48 && c <= 57) || (c >= 45 && c <= 46) || c == 95 || c == 33 || c == 126 || (c >= 39 && c <= 42)) es += String.fromCharCode(c); else es += toHex(c);
            } else if (!(c & ~0x7FF)) es += toHex(0xC0 + (c >> 6)) + toHex(c & 0x3F); else if (!(c & ~0xFFFF)) es += toHex(0xE0 + (c >> 12)) + toHex(0x80 + (c >> 6 & 0x3F)) + toHex(0x80 + (c & 0x3F)); else es += toHex(0xF0 + (c >> 18)) + toHex(0x80 + (c >> 12 & 0x3F)) + toHex(0x80 + (c >> 6 & 0x3F)) + toHex(0x80 + (c & 0x3F));
        }
        return es;
    }
}

function include_script(type, defer, src, charset) {
    var script = document.createElement("script");
    script.type = type, script.defer = defer;
    script.src = src;
    if (charset) script.charset = charset; else script.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(script);
    return script;
}

function include_style(src, charset) {
    var h = document.getElementsByTagName("head")[0];
    var l = document.createElement('link');
    l.type = 'text/css';
    l.rel = 'stylesheet';
    if (charset) l.charset = charset; else l.charset = 'utf-8';
    l.media = 'screen';
    l.href = src;
    h.appendChild(l);
}

function bt(id, after) {
    document.getElementById(id).src = after;
}

function tt_sub_disable(o) {
    if (typeof(o.tt_sub) == "undefined") return false;
    if ((typeof(o.tt_sub) == "object") && (o.tt_sub.length)) {
        var i;
        for (var i = 0; i < o.tt_sub.length; i++) o.tt_sub[i].disabled = true;
    } else o.tt_sub.disabled = true;
    return true;
}

function cpip() {
    var evt, sx = sy = px = py = -1;
    try {
        evt = window.event;
    } catch (e) {
    }
    try {
        sx = evt.clientX - document.body.clientLeft, sy = evt.clientY - document.body.clientTop;
    } catch (e) {
    }
    try {
        px = document.body.scrollLeft + (sx < 0 ? 0 : sx), py = document.documentElement.scrollTop + (sy < 0 ? 0 : sy);
    } catch (e) {
    }
    try {
        if (evt.pageX) px = evt.pageX;
        if (evt.pageY) py = evt.pageY;
    } catch (e) {
    }
    return "px=" + px + "&py=" + py + "&sx=" + sx + "&sy=" + sy;
}

function nxGetCommonCRParam() {
    return "p=" + g_puid + "&q=" + g_query_cr + "&ssc=" + g_ssc + "&f=" + g_tab + "&w=" + g_stab + "&s=" + g_suid + "&time=" + (new Date()).getTime() + g_crt;
}

function getCRRankingByParam(p, info) {
    if (typeof info == 'undefined' || info == null) return 0;
    var cr = 0;
    try {
        var y, z;
        var y = p.split('&');
        for (var i = 0; i < y.length; i++) {
            if (z = y[i].split('=')) {
                if (z[0] == 'a') {
                    for (var j = 0; j < info.length; j++) {
                        if (z[1].substr(0, info[j].n.length) == info[j].n) {
                            cr = info[j].r;
                            break;
                        }
                    }
                    break;
                }
            }
        }
    } catch (e) {
    }
    return cr;
}

function getCRRanking(p) {
    var cr = 0;
    if (typeof nx_cr_area_info != 'undefined') cr = getCRRankingByParam(p, nx_cr_area_info);
    if (cr) return cr;
    if (typeof nx_cr_right_area_info != 'undefined') cr = getCRRankingByParam(p, nx_cr_right_area_info);
    return cr;
}

function isOutlink(u) {
    if (!u || u.indexOf("://") < 0) return false;
    var b = (u.search(/^\w*:\/\/([^:/?]*\.|)*(?!(ad)?cr\.)[^.:/?]+\.+naver\.com(:\d*)?(\/|$)/) < 0);
    return b;
}

function nxGetCRURL(m, a, b, c, d, e) {
    var p = "";
    var u;
    if (c == undefined && d == undefined && e == undefined) {
        p = (a == undefined ? "" : "&" + a) + (b == undefined || a.indexOf("u=") == 0 || a.indexOf("&u=") > 0 ? "" : "&u=" + urlencode(b));
        u = b;
    } else {
        p = (a == undefined ? "" : "&a=" + urlencode(a)) + (b == undefined ? "" : "&r=" + urlencode(b)) + (c == undefined ? "" : "&i=" + urlencode(c)) + (d == undefined ? "" : "&u=" + urlencode(d)) + (e == undefined ? "" : "&" + e);
        u = d;
    }
    if (!p) return null;
    var url;
    if (naver.search.https) {
        url = (naver.search.meta_referrer ? "/p/crd" : "/p/cr") + "/rd";
        if (m != 0) m = 1;
    } else {
        out = isOutlink(u);
        url = "http://cr.naver.com" + (g_D && out ? "/nr" : "/rd");
        if (m != 0) m = g_D && out ? 2 : 1;
    }
    url += "?m=" + m + "&" + cpip() + "&" + nxGetCommonCRParam() + p;
    return url;
}

function tCR(a, b, c, d, e) {
    var l = nxGetCRURL(0, a, b, c, d, e);
    var cr = getCRRanking(l);
    if (cr > 0) l = l + "&cr=" + cr;
    if (document.images) (new Image()).src = l; else document.location = l;
    return false;
}

function gCR(u, a, r, i, e, t) {
    if (u) u = urlexpand(u);
    var l = nxGetCRURL(1, a, r, i, u, e);
    var o = document.createElement("a");
    var cr = getCRRanking(l);
    if (cr > 0) l = l + "&cr=" + cr;
    if (o.click) {
        o.href = l;
        o.style.display = "none";
        document.body.appendChild(o);
        o.click();
    } else document.location = l;
}

function goCR(o, p, t) {
    var u = o.href;
    tt_sub_disable(o);
    if (p.indexOf("u=javascript") >= 0) t = true;
    var n = (o.ownerDocument == document && o.target && o.target != "_self" && o.target != "_parent" && o.target != "_top") && !(window.location.protocol && window.location.protocol.indexOf("https:") == 0);
    var cr = getCRRanking(p);
    if (cr > 0) p = p + "&cr=" + cr;
    if (!(u && u.indexOf("http://cr.naver.com/") == 0) && !(o.getAttribute !== undefined && o.getAttribute("crurl"))) {
        if (0 && u && u.indexOf("/search.naver?") >= 0) {
            var str = "";
            if (0) u += "&crcp=1", str += urlencode("&crcp=1");
            if (0) u += "&debug=1", str += urlencode("&debug=1");
            p = p.replace(/(((?:^|&)u=).*\/search.naver%3F[^&]*)/, '$1' + str);
        }
        u = nxGetCRURL(t ? 0 : (n ? -1 : 1), p, u);
    }
    if (u && !u.match(/m=0&/)) {
        var a = o.innerHTML;
        if (g_D && naver.search.https && naver.search.meta_referrer && o.href && isOutlink(o.href)) o.setAttribute("rel", "noreferrer");
        o.href = u;
        if (o.getAttribute !== undefined) o.setAttribute("crurl", "1");
        if (o.innerHTML != a) o.innerHTML = a;
    } else if (document.images) (new Image()).src = u;
    return true;
}

function goOtherCR(o, p) {
    return goCR(o, p, false);
}

function goOtherTCR(o, p) {
    return goCR(o, p, true);
}

function get_form_url(o) {
    var url = o.getAttribute("action");
    if (url == null) url = "";
    var e, n = 0;
    for (var i = 0; i < o.elements.length; i++) {
        e = o.elements[i];
        if (e.disabled || !e.name) continue;
        url += (n++ > 0 ? "&" : url.indexOf("?") < 0 ? "?" : url.indexOf("?") < url.length - 1 ? "&" : "") + encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value);
    }
    return url;
}

function formCR(o, area, rank, id) {
    if (typeof o == 'string') o = document.getElementById(o);
    var target = o.getAttribute("target");
    if (target && target != "_self" && target != "_parent" && target != "_top" || /^post$/i.test(o.getAttribute("method"))) {
        tCR(area, rank, id);
        o.submit();
        return false;
    }
    var url = get_form_url(o);
    var a = document.createElement("a");
    a.href = url;
    var p = area != undefined ? "a=" + area : "";
    if (rank != undefined) p += (p ? "&" : "") + "r=" + encodeURIComponent(rank);
    if (id != undefined) p += (p ? "&" : "") + "i=" + encodeURIComponent(id);
    if (url != undefined) p += (p ? "&" : "") + "u=" + encodeURIComponent(urlexpand(url));
    goCR(a, p);
    if (navigator.userAgent.indexOf('MSIE') > 0) {
        a.style.display = 'none';
        o.appendChild(a);
        a.click();
    } else document.location = a.href;
    return false;
}

function goHist(o, a, e) {
    return true;
}

function rank_val(rank, name, sign, number, ad_onair) {
    this.rank = rank;
    this.name = name;
    this.sign = sign;
    this.number = number;
    this.a…