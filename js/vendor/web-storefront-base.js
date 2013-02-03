 /*
** Copyright © 2013 Apple Inc.
** All rights reserved.
*/

window.its || (window.its = {}), its.currentTime = function() {
    return (new Date).getTime()
}, its.isDefined = function(t) {
    return typeof t != "undefined"
}, its.isDefinedNonNull = function(t) {
    return its.isDefined(t) && t != null
}, its.isDefinedNonNullNonEmpty = function(t) {
    return its.isDefined(t) && t != null && t != ""
}, its.isFunction = function(t) {
    return typeof t == "function"
}, its.isNumber = function(t) {
    return typeof t == "number"
}, its.isString = function(t) {
    return typeof t == "string" || t instanceof String
}, its.isElement = function(t) {
    return t && t.nodeType == 1
}, its.isArray = function(t) {
    return t && t.constructor === Array
}, its.toArray = function(t) {
    var n = [];
    if (its.isDefinedNonNull(t.length))
        for (var r = 0;
        r < t.length;
        r++)
            n[r] = t[r];
    return n
}, its.toBoolean = function(t) {
    return t ? t == "0" || t == "false" ? !1 : !0 : !1
}, its.isEmpty = function(t) {
    var n = !0;
    if (its.isDefinedNonNull(t))
        if (its.isString(t) && t != "")
            n = !1;
        else if (its.isArray(t) && t.length > 0)
            n = !1;
        else
            for (var r in t)
                if (t.hasOwnProperty(r)) {
                    n = !1;
                    break
                }
    return n
}, its.contains = function(t, n) {
    var r = !1;
    return its.isDefinedNonNull(t) && its.isDefinedNonNull(n) && (its.isString(t) && its.isString(n) && t.indexOf(n) != -1 || its.isArray(t) && t.indexOf(n) != -1 || its.isDefinedNonNull(t[n])) && (r = !0), r
}, its.webkitVersion = function() {
    var t = navigator.userAgent, n = /AppleWebKit\/([\d.]+)/, r = n.exec(t), i;
    if (r)
        i = r[1];
    else {
        var s = /^iTunes\/10\.4 \(Windows;.+AppleWebKit\/$/;
        s.exec(t) ? i = "533.21.1" : (window.console && console.warn("Unable to determine WebKit version from user agent: " + t), i = "0")
    }
    return i
}, its.webkitVersionCompare = function(t, n) {
    var r = 0, i = 0, s = t.split("."), o = n.split(".");
    while ((s[i] || o[i]) && r == 0) {
        var u = s[i] ? its.string.toInt(s[i]) : 0, a = o[i] ? its.string.toInt(o[i]) : 0;
        u < a ? r = -1 : u > a && (r = 1), i++
    }
    return r
}, its.poseAs = function(e, t, n) {
    var r = e[t];
    e[t] = function() {
        var e = [r, arguments];
        return n.apply(this, e)
    }
}, its.emptyFunction = function() {
}, window.its.element || (window.its.element = {}), its.element.createDocumentFragmentFromString = function(t) {
    var n = document.createElement("div");
    n.innerHTML = t;
    var r = n.children, i = document.createDocumentFragment(), s = r.length;
    for (var o = 0;
    o < s;
    o++)
        i.appendChild(r[0]);
    return i
}, its.element.createElementFromString = function(t) {
    var n = its.element.createDocumentFragmentFromString(t), r = n.childNodes;
    return r.length > 0 ? (r.length > 1 && window.console && console.warn("its.element.createElementFromString: multiple elements were created, but only the first will be returned"), r[0]) : null
}, its.element.setAttributes = function(t, n) {
    if (n)
        for (var r in n)
            n.hasOwnProperty(r) && t.setAttribute(r, n[r])
}, its.element.getScrollTop = function(e) {
    return e == window ? window.scrollY : e.scrollTop
}, its.element.getScrollLeft = function(e) {
    return e == window ? window.scrollX : e.scrollLeft
}, its.element.getClientHeight = function(e) {
    return e == window ? window.innerHeight : e.clientHeight
}, its.element.getClientWidth = function(e) {
    return e == window ? window.innerWidth : e.clientWidth
}, its.element.getScrollHeight = function(e) {
    return e == window ? window.pageYOffset : e.scrollHeight
}, its.element.getScrollWidth = function(e) {
    return e == window ? window.pageXOffset : e.scrollWidth
}, its.element.getOffsetHeight = function(e) {
    return e == window ? document.body.offsetHeight : e.offsetHeight
}, its.element.getOffsetWidth = function(e) {
    return e == window ? document.body.offsetWidth : e.offsetWidth
}, window.its.geometry || (window.its.geometry = {}), its.geometry.doesRectIntersectRect = function(t, n) {
    var r = !0;
    return t.right < n.left ? r = !1 : t.left > n.right ? r = !1 : t.bottom < n.top ? r = !1 : t.top > n.bottom && (r = !1), r
}, its.geometry.Orientation = {VERTICAL: 1,HORIZONTAL: 2}, window.its.array || (window.its.array = {}), its.array.arrayOfPrimitivesAsSet = function(t) {
    if (t == null)
        return null;
    var n = {};
    for (var r = 0;
    r < t.length;
    r++) {
        var i = t[r];
        switch (typeof i) {
            case "boolean":
            case "number":
            case "string":
                n[i] = !0;
                break;
            default:
                throw "its.array.asSet: array contains non primitive element"
        }
    }
    return n
}, its.array.pushAll = function(t, n) {
    t.push.apply(t, n)
}, its.array.insertArray = function(e, t, n, r) {
    var i = e[n];
    return e[n] = "temp", e[n] = i, r && e.splice(n, t.length), e.splice.apply(e, [n, 0].concat(t)), e
}, window.its.string || (window.its.string = {}), its.string.startsWith = function(t, n, r) {
    var i = !1;
    return t && n && (t = t.substr(0, n.length), r && (t = t.toLowerCase(), n = n.toLowerCase()), i = t.indexOf(n) === 0), i
}, its.string.endsWith = function(t, n, r) {
    var i = !1;
    if (t) {
        r && (t = t.toLowerCase(), n = n.toLowerCase());
        var s = t.length - n.length;
        i = s >= 0 && t.lastIndexOf(n) === s
    }
    return i
}, its.string.pad = function(t, n, r) {
    var i = t += "";
    r = r || "0";
    if (i.length < n) {
        var s = n - i.length, o = [];
        for (var u = s;
        u > 0;
        u--)
            o.push(r);
        i = o.join("") + i
    }
    return i
}, its.string.replaceAll = function(t, n, r, i) {
    n = n.replace(/([.?*+^$[\]\\(){}-])/g, "\\$1");
    var s = "g";
    i && (s += "i");
    var o = new RegExp(n, s);
    return t.replace(o, r)
}, its.string.whitespace = "  \n\f\r             　\u2028\u2029​", its.string._whitespaceTrimStartRegex = new RegExp("^[" + its.string.whitespace + "]+"), its.string._whitespaceTrimEndRegex = new RegExp("[" + its.string.whitespace + "]+$"), its.string.trim = function(t, n, r) {
    var i = null;
    if (t)
        if (!r && (!n || n == its.string.whitespace) && t.trim)
            i = t.trim();
        else {
            var s = null, o = null, u = null;
            its.isDefinedNonNull(n) ? (s = "[" + n + "]", o = new RegExp("^" + s + "+"), u = new RegExp(s + "+$")) : (s = its.string.whitespace, o = its.string._whitespaceTrimStartRegex, u = its.string._whitespaceTrimEndRegex);
            var a = t.replace(o, "");
            i = a.replace(u, "")
        }
    return i
}, its.string.splitTrimmed = function(t, n, r) {
    var i = t.split(n);
    if (i)
        for (var s = 0;
        s < i.length;
        s++)
            i[s] = its.string.trim(i[s], r);
    return i
}, its.string._xmlEscapeMap = {"&": "&amp;","<": "&lt;",">": "&gt;",'"': "&quot;","'": "&#39;"}, its.string.xmlEscape = function(e) {
    var t = e;
    if (typeof t != "undefined" && t != null) {
        typeof t != "string" && (t = t.toString());
        var n = its.string._xmlEscapeMap;
        t = t.replace(/[&<>"']/g, function(e) {
            return n[e]
        })
    }
    return t
}, its.string.xmlUnescape = function(t) {
    return t.replace(/&apos;/g, String.fromCharCode(39)).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
}, its.string.htmlUnescape = function(t) {
    var n = document.createElement("textarea");
    n.innerHTML = t.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var r = n.value;
    return n.remove(), r
}, its.string.urlDecode = function(t) {
    var n = t;
    return t && (n = t.replace(/\+/g, " "), n = decodeURIComponent(n)), n
};
var _dateExpression = new RegExp("^([0-9]{4}/[0-9]{2}/[0-9]{2})/(.*)");
its.string.compare = function(t, n, r, i) {
    var s = null, o = 1;
    r && (o = -1);
    var u = _dateExpression.exec(t), a = _dateExpression.exec(n);
    u && a && (u[1] == a[1] ? (t = u[2], n = a[2]) : (s = u[1] > a[1] ? 1 : -1, i && (o = -1)));
    if (!s) {
        var f = parseFloat(t), l = parseFloat(n);
        if (!isNaN(f) && !isNaN(l) && f != l)
            s = f - l;
        else {
            var c = t.toLowerCase(), h = n.toLowerCase();
            if (c < h)
                s = -1;
            else if (c > h)
                s = 1;
            else {
                s = 0;
                for (var p = 0;
                !s && p < t.length;
                p++) {
                    var d = t.charAt(p), v = n.charAt(p);
                    d < v ? s = 1 : d > v && (s = -1)
                }
            }
        }
    }
    return s *= o, s
}, its.string.compareNumerically = function(e, t) {
    if (!e && !t)
        return 0;
    if (!e)
        return -1;
    if (!t)
        return 1;
    var n = "0123456789", r = 0, i = 0;
    while (r < e.length || i < t.length) {
        var s = e[r], o = t[i];
        if (!o)
            return 1;
        if (!s)
            return -1;
        var u = n.indexOf(s) >= 0, a = n.indexOf(o) >= 0;
        if (u && a) {
            var f = its.string._getNumberFromBeginningOfString(e, r), l = its.string._getNumberFromBeginningOfString(t, i);
            if (parseInt(f, 10) < parseInt(l, 10))
                return -1;
            if (parseInt(f, 10) > parseInt(l, 10))
                return 1;
            r += f.length, i += l.length
        } else {
            if (s < o)
                return -1;
            if (s > o)
                return 1;
            r++, i++
        }
    }
    return 0
}, its.string._getNumberFromBeginningOfString = function(e, t) {
    var n = "0123456789";
    for (var r = t;
    r < e.length;
    r++)
        if (n.indexOf(e[r]) < 0)
            break;
    return e.substring(t, r)
}, its.string.toInt = function(t) {
    return parseInt(t, 10)
}, its.string.isJson = function(t) {
    var n = !1;
    if (!its.isEmpty(t)) {
        var r = t.replace(/\\./g, "@").replace(/"[^"\\\n\r]*"/g, "");
        n = /^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/.test(r)
    }
    return n
}, its.string.evalJson = function itsStringEvalJson(aString) {
    try {
        if (its.string.isJson(aString))
            return eval("(" + aString + ")")
    } catch (e) {
    }
    throw new SyntaxError("Badly formed JSON string: " + aString)
}, its.string.allAlphaNumerics = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", its.string.randomAlphaNumericString = function(t) {
    var n = "";
    for (var r = 0;
    r < t;
    r++)
        n += its.string.allAlphaNumerics[Math.floor(its.string.allAlphaNumerics.length * Math.random())];
    return n
}, its.string.generateUuid = function(t, n) {
    var r = null, i = (new Date).getTime() + "";
    n || (n = 6), t || (t = i.length + n);
    if (n > t)
        throw new Error("its.string.generateUuid cannot generate a string with more random numbers than the max requested string length");
    var s = t - n;
    return s < i.length && (i = i.substring(i.length - s)), r = i + its.string.randomAlphaNumericString(n), r
}, its.string.UUIDv4 = function b(e) {
    return e ? (e ^ Math.random() * 16 >> e / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b)
}, its.string.unstringify = function(t) {
    var n = t;
    return n == "false" ? n = !1 : n == "true" ? n = !0 : /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/.test(n) && (isFinite(parsedNumber = parseFloat(n)) ? n = parsedNumber : isFinite(parsedNumber = parseInt(n, 10)) && (n = parsedNumber)), n
}, window.its.reflect || (window.its.reflect = {}), its.reflect.keys = function keys(e) {
    var keys = [];
    for (var t in e)
        e.hasOwnProperty(t) && !its.isFunction(e[t]) && keys.push(t);
    return keys
}, its.reflect.hasAnyKeys = function(t) {
    for (var n in t)
        if (t.hasOwnProperty(n))
            return !0
}, its.reflect.hasAnyNonNullKeys = function(t) {
    for (var n in t)
        if (t.hasOwnProperty(n) && t[n])
            return !0
}, its.reflect.values = function values(e) {
    var values = [];
    for (var t in e) {
        var n = e[t];
        e.hasOwnProperty(t) && !its.isFunction(n) && values.push(n)
    }
    return values
}, its.reflect.methods = function methods(e) {
    var methods = [];
    for (var t in e) {
        var n = e[t];
        e.hasOwnProperty(t) && its.isFunction(n) && methods.push(n)
    }
    return methods
}, its.reflect.copyKeysAndValues = function(t, n) {
    for (var r in t) {
        var i = t[r];
        t.hasOwnProperty(r) && !its.isFunction(i) && (n[r] = i)
    }
}, its.reflect.invert = function(e) {
    var t = {};
    for (var n in e)
        e.hasOwnProperty(n) && !its.isFunction(e[n]) && (t[e[n]] = n);
    return t
}, window.its.url || (window.its.url = {}), its.url.parentDomainWithNumComponents = function(t, n) {
    var r = t;
    if (t && t != "") {
        var i = t.split("."), s = i.length;
        if (s >= n) {
            r = "";
            while (n)
                r += i[s - n], n--, n && (r += ".")
        }
    }
    return r
}, its.url.queryParamsDict = function(t) {
    var n = null, r = null;
    if (!t)
        r = window.location.search;
    else {
        var i = t.indexOf("?");
        i >= 0 && (r = t.substring(i))
    }
    return r ? n = its.url.parseQueryParams(r) : n = {}, n
}, its.url.queryParamValue = function(t, n) {
    var r = its.url.queryParamsDict(n);
    return r[t]
}, its.url.parseQueryParams = function(t, n) {
    var r = {};
    if (t != null && t.length > 0) {
        t.charAt(0) === "?" && (t = t.substr(1));
        var i = t.indexOf("#");
        i !== -1 && (t = t.substr(0, i));
        var s = t.split("&");
        for (var o = 0;
        o < s.length;
        o++) {
            var u = s[o].split("=");
            if (u.length == 2) {
                var a = u[1];
                n || (a = its.string.urlDecode(a)), r[u[0]] = a
            }
        }
    }
    return r
}, its.url.parseHashAnchorParams = function(t) {
    var n = {};
    t || (t = window.location.hash);
    if (t != null && t.length > 0) {
        t.charAt(0) === "#" && (t = t.substr(1));
        var r = t.split(";");
        for (var i = 0;
        i < r.length;
        i++) {
            var s = r[i].split("=");
            if (s.length == 2) {
                var o = its.string.urlDecode(s[1]);
                n[s[0]] = o
            } else
                n[r[i]] = ""
        }
    }
    return n
}, its.url.parseHostname = function(t) {
    var n = "";
    if (t) {
        t = t.toString();
        if (t && t.indexOf("://") > 0) {
            var r = t.indexOf("://") + 3, i = t.indexOf("/", r);
            i === -1 && (i = t.length), n = t.substring(r, i)
        }
    }
    return n
}, its.url.finalPathComponent = function(t) {
    var n = "";
    if (t) {
        t = t.toString();
        if (t && t != "") {
            var r = t.lastIndexOf("/");
            if (r == t.length - 1 && r > 0)
                var r = t.lastIndexOf(r - 1);
            r != t.length - 1 && (n = t.substring(r + 1)), (r = n.lastIndexOf("/")) != -1 && (n = n.substring(0, r)), (r = n.lastIndexOf("?")) != -1 && (n = n.substring(0, r))
        }
    }
    return n
}, its.url.buildUrlFromMap = function(e) {
    var t = [];
    for (var n in e)
        if (e.hasOwnProperty(n)) {
            var r = e[n];
            typeof r != "undefined" && r != null && t.push(n + "=" + encodeURIComponent(r))
        }
    return t.join("&")
}, its.url.appendUrlParameter = function(t, n, r) {
    var i = {};
    return i[n] = r, its.url.appendUrlParameters(t, i)
}, its.url.appendUrlParameters = function(t, n) {
    if (!n)
        return t;
    var r = its.url.buildUrlFromMap(n);
    return its.url.appendUrlParametersString(t, r)
}, its.url.appendUrlParametersString = function(t, n) {
    if (!n)
        return t;
    var r = t.indexOf("?") === -1 ? "?" : "&";
    return t += r + n, t
}, its.url.baseUrl = function(t) {
    var n = t.indexOf("?");
    if (n === -1) {
        n = t.indexOf("#");
        if (n === -1)
            return t
    }
    return t.substring(0, n)
}, its.url.originalLocationQueryParams = its.url.queryParamsDict(), its.url.originalLocationHashAnchorParams = its.url.parseHashAnchorParams(), its.url.formRedirect = function(t, n, r) {
    var i = document.createElement("form");
    i.method = r ? "post" : "get", i.target = t, i.action = n, document.body.appendChild(i), i.submit()
}, its.url.openExternalUrl = function(t, n) {
    var r = document.createElement("a");
    r.setAttribute("href", t), n == "main" ? r.setAttribute("target", n) : r.setAttribute("target", "_blank");
    var i = document.createEvent("MouseEvents");
    i.initMouseEvent("click", !0, !0, document.defaultView, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), r.dispatchEvent(i)
}, window.its.cookies || (window.its.cookies = {}), its.cookies.EXPIRE_NOW = -1, its.cookies.EXPIRE_SESSION = null, its.cookies.EXPIRE_ONE_SECOND = 1, its.cookies.EXPIRE_ONE_MINUTE = its.cookies.EXPIRE_ONE_SECOND * 60, its.cookies.EXPIRE_ONE_HOUR = its.cookies.EXPIRE_ONE_MINUTE * 60, its.cookies.EXPIRE_ONE_DAY = its.cookies.EXPIRE_ONE_HOUR * 24, its.cookies.EXPIRE_ONE_WEEK = its.cookies.EXPIRE_ONE_DAY * 7, its.cookies.EXPIRE_ONE_MONTH = its.cookies.EXPIRE_ONE_DAY * 31, its.cookies.EXPIRE_ONE_YEAR = its.cookies.EXPIRE_ONE_DAY * 365, its.cookies.EXPIRE_ONE_SIDEREAL_YEAR = its.cookies.EXPIRE_ONE_DAY * 365.25, its.cookies.EXPIRE_SIX_MONTHS = its.cookies.EXPIRE_ONE_DAY * 180, its.cookies.set = function(t, n, r, i, s) {
    return n && (n = escape(n)), its.cookies.setUnescaped(t, n, r, i, s)
}, its.cookies.get = function(t) {
    var n = its.cookies.getUnescaped(t);
    return n && (n = unescape(n)), n
}, its.cookies.setUnescaped = function(t, n, r, i, s) {
    var o = "", u = "";
    if (r) {
        var a = new Date;
        a.setTime(a.getTime() + r * 1e3), o = a.toUTCString()
    }
    i || (i = "/"), s && (u = " domain=" + s);
    var f = t + "=" + n + "; expires=" + o + "; path=" + i + ";" + u;
    its.cookies._debugAndUnitTestLastRawSetCookieString = f;
    var l = r == void 0 || r == its.cookies.EXPIRE_SESSION || r == 0, c = "sf6" in its && "Platform" in its.sf6 && its.sf6.Platform.device();
    if (c && (l || r < 0)) {
        var h = document.cookie = f;
        if (l)
            return h
    }
    return its.cookies._setRaw(f)
}, its.cookies.getUnescaped = function(t) {
    var n = its.cookies._debugAndUnitTestCookieGetterWithRawCookieStringOverride || its.cookies._getRaw();
    if (n && t) {
        its.cookies._debugAndUnitTestCookieGetterWithRawCookieStringOverride = null;
        var r = n.split(";"), i = null;
        for (var s = r.length - 1;
        !i && s >= 0;
        s--) {
            var o = r[s], u = o.indexOf("=");
            if (u > 0)
                if (u + 1 == o.length)
                    i = "";
                else {
                    var a = its.string.trim(o.substring(0, u));
                    a == t && (its.cookies._debugAndUnitTestLastRawGetCookieString = o, i = its.string.trim(o.substring(u + 1)))
                }
        }
    }
    return i
}, its.cookies.remove = function(t, n) {
    return its.cookies.setUnescaped(t, "", its.cookies.EXPIRE_NOW, null, n)
}, its.cookies._cookieOwner = "iTunes" in window && "cookie" in iTunes ? "iTunes" : "document", its.cookies._setRaw = function(e) {
    return window[this._cookieOwner].cookie = e
}, its.cookies._getRaw = function() {
    return window[this._cookieOwner].cookie || ""
}, typeof iTSLocalization == "undefined" && (iTSLocalization = new Object), iTSLocalization._lookup = function(e) {
    var t = iTSLocalization._strings;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = t[n];
            if (r.hasOwnProperty(e))
                return r[e]
        }
}, iTSLocalization.hasLocalizedValue = function(t) {
    var n = iTSLocalization._lookup(t);
    return its.isDefined(n)
}, iTSLocalization.localize = function(e, t) {
    var n = iTSLocalization._lookup(e);
    return typeof n == "undefined" && (n = e), t && (n = iTSLocalization.replaceTokens(n, t)), n
}, iTSLocalization._lookup("_showLocKeys") && (iTSLocalization.localize = function(e) {
    return "+" + e + "+"
}), its.loc = iTSLocalization.localize, iTSLocalization.localizeWithParameter = function(t, n, r) {
    var i = {};
    return i[n] = r, iTSLocalization.localize(t, i)
}, its.locWithParam = iTSLocalization.localizeWithParameter, its.locWithCount = function(e, t, n) {
    return e === 1 ? its.loc(t) : its.loc(n, {count: e})
}, iTSLocalization.replaceTokens = function(t, n) {
    if (n)
        for (var r in n)
            if (n.hasOwnProperty(r)) {
                var i = "@@" + r + "@@";
                t = t.replace(new RegExp(i, "g"), n[r])
            }
    return t
}, iTSLocalization.localizedResourceUrlForPathKey = function(t, n) {
    n === undefined && (n = /https:/.test(window.location.protocol));
    var r = n ? "https://s.mzstatic.com" : "http://r.mzstatic.com";
    return r + iTSLocalization.localize(t)
}, its.formatNumber = function(e, t) {
    if (typeof iTSLocalization.decimalSeparator == "undefined") {
        var n = iTSLocalization._lookup("_decimalSeparator");
        typeof n == "undefined" && (n = "."), iTSLocalization.decimalSeparator = n, n = iTSLocalization._lookup("_thousandsSeparator"), typeof n == "undefined" && (n = ","), iTSLocalization.thousandsSeparator = n
    }
    var r = !0;
    t && t.hasOwnProperty("useGrouping") && (r = t.useGrouping);
    var i = e.toString().split(".");
    if (r) {
        var s = iTSLocalization.thousandsSeparator, o = i[0].split("");
        for (var u = o.length - 3;
        u > 0;
        u -= 3)
            o.splice(u, 0, s);
        i[0] = o.join("")
    }
    var a = i.join(iTSLocalization.decimalSeparator);
    return a
}, its.isXMLResponse = function(e) {
    return e && its.string.startsWith(e.getResponseHeader("content-type"), "text/xml")
}, its.notifications = {_listeners: {},subscribe: function(e, t) {
        var n = this._listeners[e];
        n || (this._listeners[e] = n = []), n.push(t)
    },unsubscribe: function(e, t) {
        var n = this._listeners[e];
        if (!n)
            return;
        var r = n.indexOf(t);
        r >= 0 && n.splice(r, 1)
    },publish: function(e, t) {
        this._sendNotification(this._listeners[e], t)
    },remove: function(e) {
        var t = this._listeners[e];
        if (!t)
            return;
        delete this._listeners[e]
    },hasListeners: function(e) {
        return this._listeners[e] ? !0 : !1
    },_sendNotification: function(e, t) {
        if (!e)
            return;
        for (var n = 0, r = e.length;
        n < r;
        n++)
            e[n] && e[n](t)
    }}, its.plistDictGetValue = function(t, n) {
    if (!t)
        return;
    var r = t.childNodes.length, i = null;
    for (var s = 0;
    s < r;
    s++) {
        var o = t.childNodes[s];
        if (o.nodeType === Node.ELEMENT_NODE) {
            if (i)
                return o.nodeName === "array" || o.nodeName === "dict" ? o : o.textContent;
            o.nodeName === "key" && o.textContent === n && (i = o)
        }
    }
}, its.plistDictRemoveValue = function(t, n) {
    if (!t)
        return;
    var r = t.childNodes.length, i = null, s = null;
    for (var o = 0;
    o < r;
    o++) {
        var u = t.childNodes[o];
        if (u.nodeType === Node.ELEMENT_NODE) {
            if (i) {
                s = u;
                break
            }
            u.nodeName === "key" && u.textContent === n && (i = u)
        }
    }
    i && s && (t.removeChild(i), t.removeChild(s))
};
var _dataCache = {};
its.property = function(e, t) {
    var n = its.dataOverride(e);
    return n == undefined && window.its && window.its.serverData && window.its.serverData.properties && (n = window.its.serverData.properties[e]), !t && its.isDefined(e) && its.isDefined(n) && (_dataCache[e] = n), n
}, its.pageData = function(e, t) {
    return its.dataValue(e, !0, t)
}, its.dataOverride = function(e) {
    var t = its.url.originalLocationQueryParams[e];
    return t == undefined && (t = its.string.unstringify(sessionStorage[e])), t == undefined && (t = its.string.unstringify(localStorage[e])), t == undefined && (t = window[e]), t == undefined && window.its && (t = window.its[e]), t
}, its.dataValue = function(e, t, n) {
    var r, i = e.split(".");
    t && (r = its.dataOverride(i[i.length - 1]));
    if (r == undefined) {
        var s = window;
        for (var o = 0;
        s && o < i.length;
        o++) {
            var u = i[o];
            o != 0 && u == window && (s = s[u])
        }
        s && s != window && (r = s)
    }
    return !n && its.isDefined(e) && its.isDefined(r) && (_dataCache[e] = r), r
}, its.setProperty = function(e, t, n) {
    its.setDataValue(e, t, n)
}, its.setPageData = function(e, t, n) {
    its.setDataValue(e, t, n)
}, its.setDataValue = function(e, t, n) {
    var r = null;
    if (e) {
        its.removeProperty(e);
        var i = null;
        n ? i = localStorage : i = sessionStorage, i[e] = t, r = i[e]
    } else
        console.log("Invalid key. Usage: setProperty(key, value, usePermanentStorage)");
    return r
}, its.removeProperty = function(e) {
    return sessionStorage.removeItem(e), localStorage.removeItem(e), e
}, function(e, t) {
  return;
    function n() {
        if (!y.isReady) {
            try {
                E.documentElement.doScroll("left")
            } catch (e) {
                setTimeout(n, 1);
                return
            }
            y.ready()
        }
    }
    function r(e, t) {
        t.src ? y.ajax({url: t.src,async: !1,dataType: "script"}) : y.globalEval(t.text || t.textContent || t.innerHTML || ""), t.parentNode && t.parentNode.removeChild(t)
    }
    function i(e, n, r, s, o, u) {
        var a = e.length;
        if (typeof n == "object") {
            for (var f in n)
                i(e, f, n[f], s, o, r);
            return e
        }
        if (r !== t) {
            s = !u && s && y.isFunction(r);
            for (f = 0;
            f < a;
            f++)
                o(e[f], n, s ? r.call(e[f], f, o(e[f], n)) : r, u);
            return e
        }
        return a ? o(e[0], n) : null
    }
    function s() {
        return (new Date).getTime()
    }
    function o() {
        return !1
    }
    function u() {
        return !0
    }
    function a(e, t, n) {
        return n[0].type = e, y.event.handle.apply(t, n)
    }
    function f(e) {
        var t = !0, n = [], r = [], i = arguments, s, o, u, a, f, c = y.extend({}, y.data(this, "events").live);
        for (a in c)
            o = c[a], o.live === e.type || o.altLive && y.inArray(e.type, o.altLive) > -1 ? (s = o.data, s.beforeFilter && s.beforeFilter[e.type] && !s.beforeFilter[e.type](e) || r.push(o.selector)) : delete c[a];
        s = y(e.target).closest(r, e.currentTarget), f = 0;
        for (l = s.length;
        f < l;
        f++)
            for (a in c) {
                o = c[a], u = s[f].elem, r = null;
                if (s[f].selector === o.selector) {
                    if (o.live === "mouseenter" || o.live === "mouseleave")
                        r = y(e.relatedTarget).closest(o.selector)[0];
                    (!r || r !== u) && n.push({elem: u,fn: o})
                }
            }
        f = 0;
        for (l = n.length;
        f < l;
        f++) {
            s = n[f], e.currentTarget = s.elem, e.data = s.fn.data;
            if (s.fn.apply(s.elem, i) === !1) {
                t = !1;
                break
            }
        }
        return t
    }
    function c(e, t) {
        return ["live", e, t.replace(/\./g, "`").replace(/ /g, "&")].join(".")
    }
    function h(e) {
        return !e || !e.parentNode || e.parentNode.nodeType === 11
    }
    function p(e, t) {
        var n = 0;
        t.each(function() {
            if (this.nodeName === (e[n] && e[n].nodeName)) {
                var t = y.data(e[n++]), r = y.data(this, t);
                if (t = t && t.events) {
                    delete r.handle, r.events = {};
                    for (var i in t)
                        for (var s in t[i])
                            y.event.add(this, i, t[i][s], t[i][s].data)
                }
            }
        })
    }
    function d(e, t, n) {
        var r, i, s;
        return e.length === 1 && typeof e[0] == "string" && e[0].length < 512 && e[0].indexOf("<option") < 0 && (i = !0, (s = y.fragments[e[0]]) && s !== 1 && (r = s)), r || (t = t && t[0] ? t[0].ownerDocument || t[0] : E, r = t.createDocumentFragment(), y.clean(e, t, r, n)), i && (y.fragments[e[0]] = s ? r : 1), {fragment: r,cacheable: i}
    }
    function v(e) {
        for (var t = 0, n, r;
        (n = e[t]) != null;
        t++)
            !y.noData[n.nodeName.toLowerCase()] && (r = n[j]) && delete y.cache[r]
    }
    function m(e, t) {
        var n = {};
        return y.each(Ut.concat.apply([], Ut.slice(0, t)), function() {
            n[this] = e
        }), n
    }
    function g(e) {
        return "scrollTo" in e && e.document ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
    }
    var y = function(e, t) {
        return new y.fn.init(e, t)
    }, b = e.jQuery, w = e.$, E = e.document, S, x = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/, T = /^.[^:#\[\.,]*$/, N = /\S/, C = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, k = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, L = navigator.userAgent, A = !1, O = [], M, _ = Object.prototype.toString, D = Object.prototype.hasOwnProperty, P = Array.prototype.push, H = Array.prototype.slice, B = Array.prototype.indexOf;
    y.fn = y.prototype = {init: function(e, n) {
            var r, i;
            if (!e)
                return this;
            if (e.nodeType)
                return this.context = this[0] = e, this.length = 1, this;
            if (typeof e == "string")
                if ((r = x.exec(e)) && (r[1] || !n)) {
                    if (!r[1]) {
                        if (n = E.getElementById(r[2])) {
                            if (n.id !== r[2])
                                return S.find(e);
                            this.length = 1, this[0] = n
                        }
                        return this.context = E, this.selector = e, this
                    }
                    i = n ? n.ownerDocument || n : E, (e = k.exec(e)) ? y.isPlainObject(n) ? (e = [E.createElement(e[1])], y.fn.attr.call(e, n, !0)) : e = [i.createElement(e[1])] : (e = d([r[1]], [i]), e = (e.cacheable ? e.fragment.cloneNode(!0) : e.fragment).childNodes)
                } else {
                    if (!!n || !/^\w+$/.test(e))
                        return !n || n.jquery ? (n || S).find(e) : y(n).find(e);
                    this.selector = e, this.context = E, e = E.getElementsByTagName(e)
                }
            else if (y.isFunction(e))
                return S.ready(e);
            return e.selector !== t && (this.selector = e.selector, this.context = e.context), y.isArray(e) ? this.setArray(e) : y.makeArray(e, this)
        },selector: "",jquery: "1.4",length: 0,size: function() {
            return this.length
        },toArray: function() {
            return H.call(this, 0)
        },get: function(e) {
            return e == null ? this.toArray() : e < 0 ? this.slice(e)[0] : this[e]
        },pushStack: function(e, t, n) {
            return e = y(e || null), e.prevObject = this, e.context = this.context, t === "find" ? e.selector = this.selector + (this.selector ? " " : "") + n : t && (e.selector = this.selector + "." + t + "(" + n + ")"), e
        },setArray: function(e) {
            return this.length = 0, P.apply(this, e), this
        },each: function(e, t) {
            return y.each(this, e, t)
        },ready: function(e) {
            return y.bindReady(), y.isReady ? e.call(E, y) : O && O.push(e), this
        },eq: function(e) {
            return e === -1 ? this.slice(e) : this.slice(e, +e + 1)
        },first: function() {
            return this.eq(0)
        },last: function() {
            return this.eq(-1)
        },slice: function() {
            return this.pushStack(H.apply(this, arguments), "slice", H.call(arguments).join(","))
        },map: function(e) {
            return this.pushStack(y.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },end: function() {
            return this.prevObject || y(null)
        },push: P,sort: [].sort,splice: [].splice}, y.fn.init.prototype = y.fn, y.extend = y.fn.extend = function() {
        var e = arguments[0] || {}, n = 1, r = arguments.length, i = !1, s, o, u, a;
        typeof e == "boolean" && (i = e, e = arguments[1] || {}, n = 2), typeof e != "object" && !y.isFunction(e) && (e = {}), r === n && (e = this, --n);
        for (;
        n < r;
        n++)
            if ((s = arguments[n]) != null)
                for (o in s)
                    u = e[o], a = s[o], e !== a && (i && a && (y.isPlainObject(a) || y.isArray(a)) ? (u = u && (y.isPlainObject(u) || y.isArray(u)) ? u : y.isArray(a) ? [] : {}, e[o] = y.extend(i, u, a)) : a !== t && (e[o] = a));
        return e
    }, y.extend({noConflict: function(t) {
            return e.$ = w, t && (e.jQuery = b), y
        },isReady: !1,ready: function() {
            if (!y.isReady) {
                if (!E.body)
                    return setTimeout(y.ready, 13);
                y.isReady = !0;
                if (O) {
                    for (var e, t = 0;
                    e = O[t++];
                    )
                        e.call(E, y);
                    O = null
                }
                y.fn.triggerHandler && y(E).triggerHandler("ready")
            }
        },bindReady: function() {
            if (!A) {
                A = !0;
                if (E.readyState === "complete")
                    return y.ready();
                if (E.addEventListener)
                    E.addEventListener("DOMContentLoaded", M, !1), e.addEventListener("load", y.ready, !1);
                else if (E.attachEvent) {
                    E.attachEvent("onreadystatechange", M), e.attachEvent("onload", y.ready);
                    var t = !1;
                    try {
                        t = e.frameElement == null
                    } catch (r) {
                    }
                    E.documentElement.doScroll && t && n()
                }
            }
        },isFunction: function(e) {
            return _.call(e) === "[object Function]"
        },isArray: function(e) {
            return _.call(e) === "[object Array]"
        },isPlainObject: function(e) {
            if (!e || _.call(e) !== "[object Object]" || e.nodeType || e.setInterval)
                return !1;
            if (e.constructor && !D.call(e, "constructor") && !D.call(e.constructor.prototype, "isPrototypeOf"))
                return !1;
            var n;
            for (n in e)
                ;
            return n === t || D.call(e, n)
        },isEmptyObject: function(e) {
            for (var t in e)
                return !1;
            return !0
        },noop: function() {
        },globalEval: function(e) {
            if (e && N.test(e)) {
                var t = E.getElementsByTagName("head")[0] || E.documentElement, n = E.createElement("script");
                n.type = "text/javascript", y.support.scriptEval ? n.appendChild(E.createTextNode(e)) : n.text = e, t.insertBefore(n, t.firstChild), t.removeChild(n)
            }
        },nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
        },each: function(e, n, r) {
            var i, s = 0, o = e.length, u = o === t || y.isFunction(e);
            if (r) {
                if (u) {
                    for (i in e)
                        if (n.apply(e[i], r) === !1)
                            break
                } else
                    for (;
                    s < o;
                    )
                        if (n.apply(e[s++], r) === !1)
                            break
            } else if (u) {
                for (i in e)
                    if (n.call(e[i], i, e[i]) === !1)
                        break
            } else
                for (r = e[0];
                s < o && n.call(r, s, r) !== !1;
                r = e[++s])
                    ;
            return e
        },trim: function(e) {
            return (e || "").replace(C, "")
        },makeArray: function(e, t) {
            return t = t || [], e != null && (e.length == null || typeof e == "string" || y.isFunction(e) || typeof e != "function" && e.setInterval ? P.call(t, e) : y.merge(t, e)), t
        },inArray: function(e, t) {
            if (t.indexOf)
                return t.indexOf(e);
            for (var n = 0, r = t.length;
            n < r;
            n++)
                if (t[n] === e)
                    return n;
            return -1
        },merge: function(e, n) {
            var r = e.length, i = 0;
            if (typeof n.length == "number")
                for (var s = n.length;
                i < s;
                i++)
                    e[r++] = n[i];
            else
                for (;
                n[i] !== t;
                )
                    e[r++] = n[i++];
            return e.length = r, e
        },grep: function(e, t, n) {
            for (var r = [], i = 0, s = e.length;
            i < s;
            i++)
                !n != !t(e[i], i) && r.push(e[i]);
            return r
        },map: function(e, t, n) {
            for (var r = [], i, s = 0, o = e.length;
            s < o;
            s++)
                i = t(e[s], s, n), i != null && (r[r.length] = i);
            return r.concat.apply([], r)
        },guid: 1,proxy: function(e, n, r) {
            return arguments.length === 2 && (typeof n == "string" ? (r = e, e = r[n], n = t) : n && !y.isFunction(n) && (r = n, n = t)), !n && e && (n = function() {
                return e.apply(r || this, arguments)
            }), e && (n.guid = e.guid = e.guid || n.guid || y.guid++), n
        },uaMatch: function(e) {
            var t = {browser: ""};
            return e = e.toLowerCase(), /webkit/.test(e) ? t = {browser: "webkit",version: /webkit[\/ ]([\w.]+)/} : /opera/.test(e) ? t = {browser: "opera",version: /version/.test(e) ? /version[\/ ]([\w.]+)/ : /opera[\/ ]([\w.]+)/} : /msie/.test(e) ? t = {browser: "msie",version: /msie ([\w.]+)/} : /mozilla/.test(e) && !/compatible/.test(e) && (t = {browser: "mozilla",version: /rv:([\w.]+)/}), t.version = (t.version && t.version.exec(e) || [0, "0"])[1], t
        },browser: {}}), L = y.uaMatch(L), L.browser && (y.browser[L.browser] = !0, y.browser.version = L.version), y.browser.webkit && (y.browser.safari = !0), B && (y.inArray = function(e, t) {
        return B.call(t, e)
    }), S = y(E), E.addEventListener ? M = function() {
        E.removeEventListener("DOMContentLoaded", M, !1), y.ready()
    } : E.attachEvent && (M = function() {
        E.readyState === "complete" && (E.detachEvent("onreadystatechange", M), y.ready())
    }), B && (y.inArray = function(e, t) {
        return B.call(t, e)
    }), function() {
        y.support = {};
        var t = E.documentElement, n = E.createElement("script"), r = E.createElement("div"), i = "script" + s();
        r.style.display = "none", r.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        var o = r.getElementsByTagName("*"), u = r.getElementsByTagName("a")[0];
        if (!(!o || !o.length || !u)) {
            y.support = {leadingWhitespace: r.firstChild.nodeType === 3,tbody: !r.getElementsByTagName("tbody").length,htmlSerialize: !!r.getElementsByTagName("link").length,style: /red/.test(u.getAttribute("style")),hrefNormalized: u.getAttribute("href") === "/a",opacity: /^0.55$/.test(u.style.opacity),cssFloat: !!u.style.cssFloat,checkOn: r.getElementsByTagName("input")[0].value === "on",optSelected: E.createElement("select").appendChild(E.createElement("option")).selected,scriptEval: !1,noCloneEvent: !0,boxModel: null}, n.type = "text/javascript";
            try {
                n.appendChild(E.createTextNode("window." + i + "=1;"))
            } catch (a) {
            }
            t.insertBefore(n, t.firstChild), e[i] && (y.support.scriptEval = !0, delete e[i]), t.removeChild(n), r.attachEvent && r.fireEvent && (r.attachEvent("onclick", function f() {
                y.support.noCloneEvent = !1, r.detachEvent("onclick", f)
            }), r.cloneNode(!0).fireEvent("onclick")), y(function() {
                var e = E.createElement("div");
                e.style.width = e.style.paddingLeft = "1px", E.body.appendChild(e), y.boxModel = y.support.boxModel = e.offsetWidth === 2, E.body.removeChild(e).style.display = "none"
            }), t = function(e) {
                var t = E.createElement("div");
                e = "on" + e;
                var n = e in t;
                return n || (t.setAttribute(e, "return;"), n = typeof t[e] == "function"), n
            }, y.support.submitBubbles = t("submit"), y.support.changeBubbles = t("change"), t = n = r = o = u = null
        }
    }(), y.props = {"for": "htmlFor","class": "className",readonly: "readOnly",maxlength: "maxLength",cellspacing: "cellSpacing",rowspan: "rowSpan",colspan: "colSpan",tabindex: "tabIndex",usemap: "useMap",frameborder: "frameBorder"};
    var j = "jQuery" + s(), F = 0, I = {}, q = {};
    y.extend({cache: {},expando: j,noData: {embed: !0,object: !0,applet: !0},data: function(n, r, i) {
            if (!n.nodeName || !y.noData[n.nodeName.toLowerCase()]) {
                n = n == e ? I : n;
                var s = n[j], o = y.cache;
                return !r && !s ? null : (s || (s = ++F), typeof r == "object" ? (n[j] = s, o = o[s] = y.extend(!0, {}, r)) : o = o[s] ? o[s] : typeof i == "undefined" ? q : o[s] = {}, i !== t && (n[j] = s, o[r] = i), typeof r == "string" ? o[r] : o)
            }
        },removeData: function(t, n) {
            if (!t.nodeName || !y.noData[t.nodeName.toLowerCase()]) {
                t = t == e ? I : t;
                var r = t[j], i = y.cache, s = i[r];
                if (n)
                    s && (delete s[n], y.isEmptyObject(s) && y.removeData(t));
                else {
                    try {
                        delete t[j]
                    } catch (o) {
                        t.removeAttribute && t.removeAttribute(j)
                    }
                    delete i[r]
                }
            }
        }}), y.fn.extend({data: function(e, n) {
            if (typeof e == "undefined" && this.length)
                return y.data(this[0]);
            if (typeof e == "object")
                return this.each(function() {
                    y.data(this, e)
                });
            var r = e.split(".");
            r[1] = r[1] ? "." + r[1] : "";
            if (n === t) {
                var i = this.triggerHandler("getData" + r[1] + "!", [r[0]]);
                return i === t && this.length && (i = y.data(this[0], e)), i === t && r[1] ? this.data(r[0]) : i
            }
            return this.trigger("setData" + r[1] + "!", [r[0], n]).each(function() {
                y.data(this, e, n)
            })
        },removeData: function(e) {
            return this.each(function() {
                y.removeData(this, e)
            })
        }}), y.extend({queue: function(e, t, n) {
            if (e) {
                t = (t || "fx") + "queue";
                var r = y.data(e, t);
                return n ? (!r || y.isArray(n) ? r = y.data(e, t, y.makeArray(n)) : r.push(n), r) : r || []
            }
        },dequeue: function(e, t) {
            t = t || "fx";
            var n = y.queue(e, t), r = n.shift();
            r === "inprogress" && (r = n.shift()), r && (t === "fx" && n.unshift("inprogress"), r.call(e, function() {
                y.dequeue(e, t)
            }))
        }}), y.fn.extend({queue: function(e, n) {
            return typeof e != "string" && (n = e, e = "fx"), n === t ? y.queue(this[0], e) : this.each(function() {
                var t = y.queue(this, e, n);
                e === "fx" && t[0] !== "inprogress" && y.dequeue(this, e)
            })
        },dequeue: function(e) {
            return this.each(function() {
                y.dequeue(this, e)
            })
        },delay: function(e, t) {
            return e = y.fx ? y.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function() {
                var n = this;
                setTimeout(function() {
                    y.dequeue(n, t)
                }, e)
            })
        },clearQueue: function(e) {
            return this.queue(e || "fx", [])
        }});
    var R = /[\n\t]/g, U = /\s+/, z = /\r/g, W = /href|src|style/, X = /(button|input)/i, V = /(button|input|object|select|textarea)/i, $ = /^(a|area)$/i, J = /radio|checkbox/;
    y.fn.extend({attr: function(e, t) {
            return i(this, e, t, !0, y.attr)
        },removeAttr: function(e) {
            return this.each(function() {
                y.attr(this, e, ""), this.nodeType === 1 && this.removeAttribute(e)
            })
        },addClass: function(e) {
            if (y.isFunction(e))
                return this.each(function(t) {
                    var n = y(this);
                    n.addClass(e.call(this, t, n.attr("class")))
                });
            if (e && typeof e == "string")
                for (var t = (e || "").split(U), n = 0, r = this.length;
                n < r;
                n++) {
                    var i = this[n];
                    if (i.nodeType === 1)
                        if (i.className)
                            for (var s = " " + i.className + " ", o = 0, u = t.length;
                            o < u;
                            o++)
                                s.indexOf(" " + t[o] + " ") < 0 && (i.className += " " + t[o]);
                        else
                            i.className = e
                }
            return this
        },removeClass: function(e) {
            if (y.isFunction(e))
                return this.each(function(t) {
                    var n = y(this);
                    n.removeClass(e.call(this, t, n.attr("class")))
                });
            if (e && typeof e == "string" || e === t)
                for (var n = (e || "").split(U), r = 0, i = this.length;
                r < i;
                r++) {
                    var s = this[r];
                    if (s.nodeType === 1 && s.className)
                        if (e) {
                            for (var o = (" " + s.className + " ").replace(R, " "), u = 0, a = n.length;
                            u < a;
                            u++)
                                o = o.replace(" " + n[u] + " ", " ");
                            s.className = o.substring(1, o.length - 1)
                        } else
                            s.className = ""
                }
            return this
        },toggleClass: function(e, t) {
            var n = typeof e, r = typeof t == "boolean";
            return y.isFunction(e) ? this.each(function(n) {
                var r = y(this);
                r.toggleClass(e.call(this, n, r.attr("class"), t), t)
            }) : this.each(function() {
                if (n === "string")
                    for (var i, s = 0, o = y(this), u = t, a = e.split(U);
                    i = a[s++];
                    )
                        u = r ? u : !o.hasClass(i), o[u ? "addClass" : "removeClass"](i);
                else if (n === "undefined" || n === "boolean")
                    this.className && y.data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : y.data(this, "__className__") || ""
            })
        },hasClass: function(e) {
            e = " " + e + " ";
            for (var t = 0, n = this.length;
            t < n;
            t++)
                if ((" " + this[t].className + " ").replace(R, " ").indexOf(e) > -1)
                    return !0;
            return !1
        },val: function(e) {
            if (e === t) {
                var n = this[0];
                if (n) {
                    if (y.nodeName(n, "option"))
                        return (n.attributes.value || {}).specified ? n.value : n.text;
                    if (y.nodeName(n, "select")) {
                        var r = n.selectedIndex, i = [], s = n.options;
                        n = n.type === "select-one";
                        if (r < 0)
                            return null;
                        var o = n ? r : 0;
                        for (r = n ? r + 1 : s.length;
                        o < r;
                        o++) {
                            var u = s[o];
                            if (u.selected) {
                                e = y(u).val();
                                if (n)
                                    return e;
                                i.push(e)
                            }
                        }
                        return i
                    }
                    return J.test(n.type) && !y.support.checkOn ? n.getAttribute("value") === null ? "on" : n.value : (n.value || "").replace(z, "")
                }
                return t
            }
            var a = y.isFunction(e);
            return this.each(function(t) {
                var n = y(this), r = e;
                if (this.nodeType === 1) {
                    a && (r = e.call(this, t, n.val())), typeof r == "number" && (r += "");
                    if (y.isArray(r) && J.test(this.type))
                        this.checked = y.inArray(n.val(), r) >= 0;
                    else if (y.nodeName(this, "select")) {
                        var i = y.makeArray(r);
                        y("option", this).each(function() {
                            this.selected = y.inArray(y(this).val(), i) >= 0
                        }), i.length || (this.selectedIndex = -1)
                    } else
                        this.value = r
                }
            })
        }}), y.extend({attrFn: {val: !0,css: !0,html: !0,text: !0,data: !0,width: !0,height: !0,offset: !0},attr: function(e, n, r, i) {
            if (!e || e.nodeType === 3 || e.nodeType === 8)
                return t;
            if (i && n in y.attrFn)
                return y(e)[n](r);
            i = e.nodeType !== 1 || !y.isXMLDoc(e);
            var s = r !== t;
            n = i && y.props[n] || n;
            if (e.nodeType === 1) {
                var o = W.test(n);
                if (n in e && i && !o) {
                    if (s) {
                        if (n === "type" && X.test(e.nodeName) && e.parentNode)
                            throw "type property can't be changed";
                        e[n] = r
                    }
                    return y.nodeName(e, "form") && e.getAttributeNode(n) ? e.getAttributeNode(n).nodeValue : n === "tabIndex" ? (n = e.getAttributeNode("tabIndex")) && n.specified ? n.value : V.test(e.nodeName) || $.test(e.nodeName) && e.href ? 0 : t : e[n]
                }
                return !y.support.style && i && n === "style" ? (s && (e.style.cssText = "" + r), e.style.cssText) : (s && e.setAttribute(n, "" + r), e = !y.support.hrefNormalized && i && o ? e.getAttribute(n, 2) : e.getAttribute(n), e === null ? t : e)
            }
            return y.style(e, n, r)
        }});
    var K = function(e) {
        return e.replace(/[^\w\s\.\|`]/g, function(e) {
            return "\\" + e
        })
    };
    y.event = {add: function(n, r, i, s) {
            if (n.nodeType !== 3 && n.nodeType !== 8) {
                n.setInterval && n !== e && !n.frameElement && (n = e), i.guid || (i.guid = y.guid++), s !== t && (i = y.proxy(i), i.data = s);
                var o = y.data(n, "events") || y.data(n, "events", {}), u = y.data(n, "handle"), a;
                u || (a = function() {
                    return typeof y != "undefined" && !y.event.triggered ? y.event.handle.apply(a.elem, arguments) : t
                }, u = y.data(n, "handle", a));
                if (u) {
                    u.elem = n, r = r.split(/\s+/);
                    for (var f, l = 0;
                    f = r[l++];
                    ) {
                        var c = f.split(".");
                        f = c.shift(), i.type = c.slice(0).sort().join(".");
                        var h = o[f], p = this.special[f] || {};
                        if (!h) {
                            h = o[f] = {};
                            if (!p.setup || p.setup.call(n, s, c, i) === !1)
                                n.addEventListener ? n.addEventListener(f, u, !1) : n.attachEvent && n.attachEvent("on" + f, u)
                        }
                        p.add && (c = p.add.call(n, i, s, c, h)) && y.isFunction(c) && (c.guid = c.guid || i.guid, i = c), h[i.guid] = i, this.global[f] = !0
                    }
                    n = null
                }
            }
        },global: {},remove: function(e, n, r) {
            if (e.nodeType !== 3 && e.nodeType !== 8) {
                var i = y.data(e, "events"), s, o, u;
                if (i) {
                    if (n === t || typeof n == "string" && n.charAt(0) === ".")
                        for (o in i)
                            this.remove(e, o + (n || ""));
                    else {
                        n.type && (r = n.handler, n = n.type), n = n.split(/\s+/);
                        for (var a = 0;
                        o = n[a++];
                        ) {
                            var f = o.split(".");
                            o = f.shift();
                            var l = !f.length, c = y.map(f.slice(0).sort(), K);
                            c = new RegExp("(^|\\.)" + c.join("\\.(?:.*\\.)?") + "(\\.|$)");
                            var h = this.special[o] || {};
                            if (i[o]) {
                                if (r)
                                    u = i[o][r.guid], delete i[o][r.guid];
                                else
                                    for (var p in i[o])
                                        (l || c.test(i[o][p].type)) && delete i[o][p];
                                h.remove && h.remove.call(e, f, u);
                                for (s in i[o])
                                    break;
                                if (!s) {
                                    if (!h.teardown || h.teardown.call(e, f) === !1)
                                        e.removeEventListener ? e.removeEventListener(o, y.data(e, "handle"), !1) : e.detachEvent && e.detachEvent("on" + o, y.data(e, "handle"));
                                    s = null, delete i[o]
                                }
                            }
                        }
                    }
                    for (s in i)
                        break;
                    if (!s) {
                        if (p = y.data(e, "handle"))
                            p.elem = null;
                        y.removeData(e, "events"), y.removeData(e, "handle")
                    }
                }
            }
        },trigger: function(e, n, r, i) {
            var s = e.type || e;
            if (!i) {
                e = typeof e == "object" ? e[j] ? e : y.extend(y.Event(s), e) : y.Event(s), s.indexOf("!") >= 0 && (e.type = s = s.slice(0, -1), e.exclusive = !0), r || (e.stopPropagation(), this.global[s] && y.each(y.cache, function() {
                    this.events && this.events[s] && y.event.trigger(e, n, this.handle.elem)
                }));
                if (!r || r.nodeType === 3 || r.nodeType === 8)
                    return t;
                e.result = t, e.target = r, n = y.makeArray(n), n.unshift(e)
            }
            e.currentTarget = r;
            var o = y.data(r, "handle");
            o && o.apply(r, n);
            var u, a;
            try {
                r && r.nodeName && y.noData[r.nodeName.toLowerCase()] || (u = r[s], a = r["on" + s])
            } catch (f) {
            }
            o = y.nodeName(r, "a") && s === "click";
            if (!i && u && !e.isDefaultPrevented() && !o) {
                this.triggered = !0;
                try {
                    r[s]()
                } catch (l) {
                }
            } else
                a && r["on" + s].apply(r, n) === !1 && (e.result = !1);
            this.triggered = !1, e.isPropagationStopped() || (r = r.parentNode || r.ownerDocument) && y.event.trigger(e, n, r, !0)
        },handle: function(n) {
            var r, i;
            n = arguments[0] = y.event.fix(n || e.event), n.currentTarget = this, i = n.type.split("."), n.type = i.shift(), r = !i.length && !n.exclusive;
            var s = new RegExp("(^|\\.)" + i.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
            i = (y.data(this, "events") || {})[n.type];
            for (var o in i) {
                var u = i[o];
                if (r || s.test(u.type)) {
                    n.handler = u, n.data = u.data, u = u.apply(this, arguments), u !== t && (n.result = u, u === !1 && (n.preventDefault(), n.stopPropagation()));
                    if (n.isImmediatePropagationStopped())
                        break
                }
            }
            return n.result
        },props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix: function(e) {
            if (e[j])
                return e;
            var n = e;
            e = y.Event(n);
            for (var r = this.props.length, i;
            r;
            )
                i = this.props[--r], e[i] = n[i];
            return e.target || (e.target = e.srcElement || E), e.target.nodeType === 3 && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target ? e.toElement : e.fromElement), e.pageX == null && e.clientX != null && (n = E.documentElement, r = E.body, e.pageX = e.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0) - (n && n.clientLeft || r && r.clientLeft || 0), e.pageY = e.clientY + (n && n.scrollTop || r && r.scrollTop || 0) - (n && n.clientTop || r && r.clientTop || 0)), !e.which && (e.charCode || e.charCode === 0 ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey && (e.metaKey = e.ctrlKey), !e.which && e.button !== t && (e.which = e.button & 1 ? 1 : e.button & 2 ? 3 : e.button & 4 ? 2 : 0), e
        },guid: 1e8,proxy: y.proxy,special: {ready: {setup: y.bindReady,teardown: y.noop},live: {add: function(e, t) {
                    y.extend(e, t || {}), e.guid += t.selector + t.live, y.event.add(this, t.live, f, t)
                },remove: function(e) {
                    if (e.length) {
                        var t = 0, n = new RegExp("(^|\\.)" + e[0] + "(\\.|$)");
                        y.each(y.data(this, "events").live || {}, function() {
                            n.test(this.type) && t++
                        }), t < 1 && y.event.remove(this, e[0], f)
                    }
                },special: {}},beforeunload: {setup: function(e, t, n) {
                    return this.setInterval && (this.onbeforeunload = n), !1
                },teardown: function(e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null)
                }}}}, y.Event = function(e) {
        if (!this.preventDefault)
            return new y.Event(e);
        e && e.type ? (this.originalEvent = e, this.type = e.type) : this.type = e, this.timeStamp = s(), this[j] = !0
    }, y.Event.prototype = {preventDefault: function() {
            this.isDefaultPrevented = u;
            var e = this.originalEvent;
            e && (e.preventDefault && e.preventDefault(), e.returnValue = !1)
        },stopPropagation: function() {
            this.isPropagationStopped = u;
            var e = this.originalEvent;
            e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = u, this.stopPropagation()
        },isDefaultPrevented: o,isPropagationStopped: o,isImmediatePropagationStopped: o};
    var Q = function(e) {
        for (var t = e.relatedTarget;
        t && t !== this;
        )
            try {
                t = t.parentNode
            } catch (n) {
                break
            }
        t !== this && (e.type = e.data, y.event.handle.apply(this, arguments))
    }, G = function(e) {
        e.type = e.data, y.event.handle.apply(this, arguments)
    };
    y.each({mouseenter: "mouseover",mouseleave: "mouseout"}, function(e, t) {
        y.event.special[e] = {setup: function(n) {
                y.event.add(this, t, n && n.selector ? G : Q, e)
            },teardown: function(e) {
                y.event.remove(this, t, e && e.selector ? G : Q)
            }}
    }), y.support.submitBubbles || (y.event.special.submit = {setup: function(e, t, n) {
            if (this.nodeName.toLowerCase() === "form")
                return !1;
            y.event.add(this, "click.specialSubmit." + n.guid, function(e) {
                var t = e.target, n = t.type;
                if ((n === "submit" || n === "image") && y(t).closest("form").length)
                    return a("submit", this, arguments)
            }), y.event.add(this, "keypress.specialSubmit." + n.guid, function(e) {
                var t = e.target, n = t.type;
                if ((n === "text" || n === "password") && y(t).closest("form").length && e.keyCode === 13)
                    return a("submit", this, arguments)
            })
        },remove: function(e, t) {
            y.event.remove(this, "click.specialSubmit" + (t ? "." + t.guid : "")), y.event.remove(this, "keypress.specialSubmit" + (t ? "." + t.guid : ""))
        }});
    if (!y.support.changeBubbles) {
        var Y = /textarea|input|select/i;
        function Z(e) {
            var t = e.type, n = e.value;
            return t === "radio" || t === "checkbox" ? n = e.checked : t === "select-multiple" ? n = e.selectedIndex > -1 ? y.map(e.options, function(e) {
                return e.selected
            }).join("-") : "" : e.nodeName.toLowerCase() === "select" && (n = e.selectedIndex), n
        }
        function et(e, t) {
            var n = e.target, r, i;
            if (!!Y.test(n.nodeName) && !n.readOnly) {
                r = y.data(n, "_change_data"), i = Z(n);
                if (i !== r) {
                    (e.type !== "focusout" || n.type !== "radio") && y.data(n, "_change_data", i);
                    if (n.type !== "select" && (r != null || i))
                        return e.type = "change", y.event.trigger(e, t, this)
                }
            }
        }
        y.event.special.change = {filters: {focusout: et,click: function(e) {
                    var t = e.target, n = t.type;
                    if (n === "radio" || n === "checkbox" || t.nodeName.toLowerCase() === "select")
                        return et.call(this, e)
                },keydown: function(e) {
                    var t = e.target, n = t.type;
                    if (e.keyCode === 13 && t.nodeName.toLowerCase() !== "textarea" || e.keyCode === 32 && (n === "checkbox" || n === "radio") || n === "select-multiple")
                        return et.call(this, e)
                },beforeactivate: function(e) {
                    e = e.target, e.nodeName.toLowerCase() === "input" && e.type === "radio" && y.data(e, "_change_data", Z(e))
                }},setup: function(e, t, n) {
                for (var r in tt)
                    y.event.add(this, r + ".specialChange." + n.guid, tt[r]);
                return Y.test(this.nodeName)
            },remove: function(e, t) {
                for (var n in tt)
                    y.event.remove(this, n + ".specialChange" + (t ? "." + t.guid : ""), tt[n]);
                return Y.test(this.nodeName)
            }};
        var tt = y.event.special.change.filters
    }
    E.addEventListener && y.each({focus: "focusin",blur: "focusout"}, function(e, t) {
        function n(e) {
            return e = y.event.fix(e), e.type = t, y.event.handle.call(this, e)
        }
        y.event.special[t] = {setup: function() {
                this.addEventListener(e, n, !0)
            },teardown: function() {
                this.removeEventListener(e, n, !0)
            }}
    }), y.each(["bind", "one"], function(e, n) {
        y.fn[n] = function(e, r, i) {
            if (typeof e == "object") {
                for (var s in e)
                    this[n](s, r, e[s], i);
                return this
            }
            y.isFunction(r) && (thisObject = i, i = r, r = t);
            var o = n === "one" ? y.proxy(i, function(e) {
                return y(this).unbind(e, o), i.apply(this, arguments)
            }) : i;
            return e === "unload" && n !== "one" ? this.one(e, r, i, thisObject) : this.each(function() {
                y.event.add(this, e, o, r)
            })
        }
    }), y.fn.extend({unbind: function(e, t) {
            if (typeof e == "object" && !e.preventDefault) {
                for (var n in e)
                    this.unbind(n, e[n]);
                return this
            }
            return this.each(function() {
                y.event.remove(this, e, t)
            })
        },trigger: function(e, t) {
            return this.each(function() {
                y.event.trigger(e, t, this)
            })
        },triggerHandler: function(e, t) {
            if (this[0])
                return e = y.Event(e), e.preventDefault(), e.stopPropagation(), y.event.trigger(e, t, this[0]), e.result
        },toggle: function(e) {
            for (var t = arguments, n = 1;
            n < t.length;
            )
                y.proxy(e, t[n++]);
            return this.click(y.proxy(e, function(r) {
                var i = (y.data(this, "lastToggle" + e.guid) || 0) % n;
                return y.data(this, "lastToggle" + e.guid, i + 1), r.preventDefault(), t[i].apply(this, arguments) || !1
            }))
        },hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },live: function(e, n, r) {
            return y.isFunction(n) && (r = n, n = t), y(this.context).bind(c(e, this.selector), {data: n,selector: this.selector,live: e}, r), this
        },die: function(e, t) {
            return y(this.context).unbind(c(e, this.selector), t ? {guid: t.guid + this.selector + e} : null), this
        }}), y.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(e, t) {
        y.fn[t] = function(e) {
            return e ? this.bind(t, e) : this.trigger(t)
        }, y.attrFn && (y.attrFn[t] = !0)
    }), e.attachEvent && !e.addEventListener && e.attachEvent("onunload", function() {
        for (var e in y.cache)
            if (y.cache[e].handle)
                try {
                    y.event.remove(y.cache[e].handle.elem)
                } catch (t) {
                }
    }), function() {
        function e(t) {
            for (var n = "", r, i = 0;
            t[i];
            i++)
                r = t[i], r.nodeType === 3 || r.nodeType === 4 ? n += r.nodeValue : r.nodeType !== 8 && (n += e(r.childNodes));
            return n
        }
        function n(e, t, n, r, i, s) {
            i = 0;
            for (var o = r.length;
            i < o;
            i++) {
                var u = r[i];
                if (u) {
                    u = u[e];
                    for (var a = !1;
                    u;
                    ) {
                        if (u.sizcache === n) {
                            a = r[u.sizset];
                            break
                        }
                        u.nodeType === 1 && !s && (u.sizcache = n, u.sizset = i);
                        if (u.nodeName.toLowerCase() === t) {
                            a = u;
                            break
                        }
                        u = u[e]
                    }
                    r[i] = a
                }
            }
        }
        function r(e, t, n, r, i, s) {
            i = 0;
            for (var o = r.length;
            i < o;
            i++) {
                var u = r[i];
                if (u) {
                    u = u[e];
                    for (var a = !1;
                    u;
                    ) {
                        if (u.sizcache === n) {
                            a = r[u.sizset];
                            break
                        }
                        if (u.nodeType === 1) {
                            s || (u.sizcache = n, u.sizset = i);
                            if (typeof t != "string") {
                                if (u === t) {
                                    a = !0;
                                    break
                                }
                            } else if (f.filter(t, [u]).length > 0) {
                                a = u;
                                break
                            }
                        }
                        u = u[e]
                    }
                    r[i] = a
                }
            }
        }
        var i = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, s = 0, o = Object.prototype.toString, u = !1, a = !0;
        [0, 0].sort(function() {
            return a = !1, 0
        });
        var f = function(e, t, n, r) {
            n = n || [];
            var s = t = t || E;
            if (t.nodeType !== 1 && t.nodeType !== 9)
                return [];
            if (!e || typeof e != "string")
                return n;
            for (var u = [], a, h, d, v, y = !0, w = g(t), S = e;
            (i.exec(""), a = i.exec(S)) !== null;
            ) {
                S = a[3], u.push(a[1]);
                if (a[2]) {
                    v = a[3];
                    break
                }
            }
            if (u.length > 1 && c.exec(e))
                if (u.length === 2 && l.relative[u[0]])
                    h = b(u[0] + u[1], t);
                else
                    for (h = l.relative[u[0]] ? [t] : f(u.shift(), t);
                    u.length;
                    )
                        e = u.shift(), l.relative[e] && (e += u.shift()), h = b(e, h);
            else {
                !r && u.length > 1 && t.nodeType === 9 && !w && l.match.ID.test(u[0]) && !l.match.ID.test(u[u.length - 1]) && (a = f.find(u.shift(), t, w), t = a.expr ? f.filter(a.expr, a.set)[0] : a.set[0]);
                if (t) {
                    a = r ? {expr: u.pop(),set: p(r)} : f.find(u.pop(), u.length !== 1 || u[0] !== "~" && u[0] !== "+" || !t.parentNode ? t : t.parentNode, w), h = a.expr ? f.filter(a.expr, a.set) : a.set, u.length > 0 ? d = p(h) : y = !1;
                    for (;
                    u.length;
                    ) {
                        var x = u.pop();
                        a = x, l.relative[x] ? a = u.pop() : x = "", a == null && (a = t), l.relative[x](d, a, w)
                    }
                } else
                    d = []
            }
            d || (d = h);
            if (!d)
                throw "Syntax error, unrecognized expression: " + (x || e);
            if (o.call(d) === "[object Array]")
                if (y)
                    if (t && t.nodeType === 1)
                        for (e = 0;
                        d[e] != null;
                        e++)
                            d[e] && (d[e] === !0 || d[e].nodeType === 1 && m(t, d[e])) && n.push(h[e]);
                    else
                        for (e = 0;
                        d[e] != null;
                        e++)
                            d[e] && d[e].nodeType === 1 && n.push(h[e]);
                else
                    n.push.apply(n, d);
            else
                p(d, n);
            return v && (f(v, s, n, r), f.uniqueSort(n)), n
        };
        f.uniqueSort = function(e) {
            if (v) {
                u = a, e.sort(v);
                if (u)
                    for (var t = 1;
                    t < e.length;
                    t++)
                        e[t] === e[t - 1] && e.splice(t--, 1)
            }
            return e
        }, f.matches = function(e, t) {
            return f(e, null, null, t)
        }, f.find = function(e, t, n) {
            var r, i;
            if (!e)
                return [];
            for (var s = 0, o = l.order.length;
            s < o;
            s++) {
                var u = l.order[s];
                if (i = l.leftMatch[u].exec(e)) {
                    var a = i[1];
                    i.splice(1, 1);
                    if (a.substr(a.length - 1) !== "\\") {
                        i[1] = (i[1] || "").replace(/\\/g, ""), r = l.find[u](i, t, n);
                        if (r != null) {
                            e = e.replace(l.match[u], "");
                            break
                        }
                    }
                }
            }
            return r || (r = t.getElementsByTagName("*")), {set: r,expr: e}
        }, f.filter = function(e, n, r, i) {
            for (var s = e, o = [], u = n, a, f, c = n && n[0] && g(n[0]);
            e && n.length;
            ) {
                for (var h in l.filter)
                    if ((a = l.leftMatch[h].exec(e)) != null && a[2]) {
                        var p = l.filter[h], d, v;
                        v = a[1], f = !1, a.splice(1, 1);
                        if (v.substr(v.length - 1) !== "\\") {
                            u === o && (o = []);
                            if (l.preFilter[h])
                                if (a = l.preFilter[h](a, u, r, o, i, c)) {
                                    if (a === !0)
                                        continue
                                } else
                                    f = d = !0;
                            if (a)
                                for (var m = 0;
                                (v = u[m]) != null;
                                m++)
                                    if (v) {
                                        d = p(v, a, m, u);
                                        var y = i ^ !!d;
                                        r && d != null ? y ? f = !0 : u[m] = !1 : y && (o.push(v), f = !0)
                                    }
                            if (d !== t) {
                                r || (u = o), e = e.replace(l.match[h], "");
                                if (!f)
                                    return [];
                                break
                            }
                        }
                    }
                if (e === s) {
                    if (f == null)
                        throw "Syntax error, unrecognized expression: " + e;
                    break
                }
                s = e
            }
            return u
        };
        var l = f.selectors = {order: ["ID", "NAME", "TAG"],match: {ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch: {},attrMap: {"class": "className","for": "htmlFor"},attrHandle: {href: function(e) {
                    return e.getAttribute("href")
                }},relative: {"+": function(e, t) {
                    var n = typeof t == "string", r = n && !/\W/.test(t);
                    n = n && !r, r && (t = t.toLowerCase()), r = 0;
                    for (var i = e.length, s;
                    r < i;
                    r++)
                        if (s = e[r]) {
                            for (;
                            (s = s.previousSibling) && s.nodeType !== 1;
                            )
                                ;
                            e[r] = n || s && s.nodeName.toLowerCase() === t ? s || !1 : s === t
                        }
                    n && f.filter(t, e, !0)
                },">": function(e, t) {
                    var n = typeof t == "string";
                    if (n && !/\W/.test(t)) {
                        t = t.toLowerCase();
                        for (var r = 0, i = e.length;
                        r < i;
                        r++) {
                            var s = e[r];
                            s && (n = s.parentNode, e[r] = n.nodeName.toLowerCase() === t ? n : !1)
                        }
                    } else {
                        r = 0;
                        for (i = e.length;
                        r < i;
                        r++)
                            if (s = e[r])
                                e[r] = n ? s.parentNode : s.parentNode === t;
                        n && f.filter(t, e, !0)
                    }
                },"": function(e, t, i) {
                    var o = s++, u = r;
                    if (typeof t == "string" && !/\W/.test(t)) {
                        var a = t = t.toLowerCase();
                        u = n
                    }
                    u("parentNode", t, o, e, a, i)
                },"~": function(e, t, i) {
                    var o = s++, u = r;
                    if (typeof t == "string" && !/\W/.test(t)) {
                        var a = t = t.toLowerCase();
                        u = n
                    }
                    u("previousSibling", t, o, e, a, i)
                }},find: {ID: function(e, t, n) {
                    if (typeof t.getElementById != "undefined" && !n)
                        return (e = t.getElementById(e[1])) ? [e] : []
                },NAME: function(e, t) {
                    if (typeof t.getElementsByName != "undefined") {
                        var n = [];
                        t = t.getElementsByName(e[1]);
                        for (var r = 0, i = t.length;
                        r < i;
                        r++)
                            t[r].getAttribute("name") === e[1] && n.push(t[r]);
                        return n.length === 0 ? null : n
                    }
                },TAG: function(e, t) {
                    return t.getElementsByTagName(e[1])
                }},preFilter: {CLASS: function(e, t, n, r, i, s) {
                    e = " " + e[1].replace(/\\/g, "") + " ";
                    if (s)
                        return e;
                    s = 0;
                    for (var o;
                    (o = t[s]) != null;
                    s++)
                        o && (i ^ (o.className && (" " + o.className + " ").replace(/[\t\n]/g, " ").indexOf(e) >= 0) ? n || r.push(o) : n && (t[s] = !1));
                    return !1
                },ID: function(e) {
                    return e[1].replace(/\\/g, "")
                },TAG: function(e) {
                    return e[1].toLowerCase()
                },CHILD: function(e) {
                    if (e[1] === "nth") {
                        var t = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                        e[2] = t[1] + (t[2] || 1) - 0, e[3] = t[3] - 0
                    }
                    return e[0] = s++, e
                },ATTR: function(e, t, n, r, i, s) {
                    return t = e[1].replace(/\\/g, ""), !s && l.attrMap[t] && (e[1] = l.attrMap[t]), e[2] === "~=" && (e[4] = " " + e[4] + " "), e
                },PSEUDO: function(e, t, n, r, s) {
                    if (e[1] === "not") {
                        if (!((i.exec(e[3]) || "").length > 1 || /^\w/.test(e[3])))
                            return e = f.filter(e[3], t, n, !0 ^ s), n || r.push.apply(r, e), !1;
                        e[3] = f(e[3], null, null, t)
                    } else if (l.match.POS.test(e[0]) || l.match.CHILD.test(e[0]))
                        return !0;
                    return e
                },POS: function(e) {
                    return e.unshift(!0), e
                }},filters: {enabled: function(e) {
                    return e.disabled === !1 && e.type !== "hidden"
                },disabled: function(e) {
                    return e.disabled === !0
                },checked: function(e) {
                    return e.checked === !0
                },selected: function(e) {
                    return e.selected === !0
                },parent: function(e) {
                    return !!e.firstChild
                },empty: function(e) {
                    return !e.firstChild
                },has: function(e, t, n) {
                    return !!f(n[3], e).length
                },header: function(e) {
                    return /h\d/i.test(e.nodeName)
                },text: function(e) {
                    return "text" === e.type
                },radio: function(e) {
                    return "radio" === e.type
                },checkbox: function(e) {
                    return "checkbox" === e.type
                },file: function(e) {
                    return "file" === e.type
                },password: function(e) {
                    return "password" === e.type
                },submit: function(e) {
                    return "submit" === e.type
                },image: function(e) {
                    return "image" === e.type
                },reset: function(e) {
                    return "reset" === e.type
                },button: function(e) {
                    return "button" === e.type || e.nodeName.toLowerCase() === "button"
                },input: function(e) {
                    return /input|select|textarea|button/i.test(e.nodeName)
                }},setFilters: {first: function(e, t) {
                    return t === 0
                },last: function(e, t, n, r) {
                    return t === r.length - 1
                },even: function(e, t) {
                    return t % 2 === 0
                },odd: function(e, t) {
                    return t % 2 === 1
                },lt: function(e, t, n) {
                    return t < n[3] - 0
                },gt: function(e, t, n) {
                    return t > n[3] - 0
                },nth: function(e, t, n) {
                    return n[3] - 0 === t
                },eq: function(e, t, n) {
                    return n[3] - 0 === t
                }},filter: {PSEUDO: function(t, n, r, i) {
                    var s = n[1], o = l.filters[s];
                    if (o)
                        return o(t, r, n, i);
                    if (s === "contains")
                        return (t.textContent || t.innerText || e([t]) || "").indexOf(n[3]) >= 0;
                    if (s === "not") {
                        n = n[3], r = 0;
                        for (i = n.length;
                        r < i;
                        r++)
                            if (n[r] === t)
                                return !1;
                        return !0
                    }
                    throw "Syntax error, unrecognized expression: " + s
                },CHILD: function(e, t) {
                    var n = t[1], r = e;
                    switch (n) {
                        case "only":
                        case "first":
                            for (;
                            r = r.previousSibling;
                            )
                                if (r.nodeType === 1)
                                    return !1;
                            if (n === "first")
                                return !0;
                            r = e;
                        case "last":
                            for (;
                            r = r.nextSibling;
                            )
                                if (r.nodeType === 1)
                                    return !1;
                            return !0;
                        case "nth":
                            n = t[2];
                            var i = t[3];
                            if (n === 1 && i === 0)
                                return !0;
                            t = t[0];
                            var s = e.parentNode;
                            if (s && (s.sizcache !== t || !e.nodeIndex)) {
                                var o = 0;
                                for (r = s.firstChild;
                                r;
                                r = r.nextSibling)
                                    r.nodeType === 1 && (r.nodeIndex = ++o);
                                s.sizcache = t
                            }
                            return e = e.nodeIndex - i, n === 0 ? e === 0 : e % n === 0 && e / n >= 0
                    }
                },ID: function(e, t) {
                    return e.nodeType === 1 && e.getAttribute("id") === t
                },TAG: function(e, t) {
                    return t === "*" && e.nodeType === 1 || e.nodeName.toLowerCase() === t
                },CLASS: function(e, t) {
                    return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t) > -1
                },ATTR: function(e, t) {
                    var n = t[1];
                    e = l.attrHandle[n] ? l.attrHandle[n](e) : e[n] != null ? e[n] : e.getAttribute(n), n = e + "";
                    var r = t[2];
                    return t = t[4], e == null ? r === "!=" : r === "=" ? n === t : r === "*=" ? n.indexOf(t) >= 0 : r === "~=" ? (" " + n + " ").indexOf(t) >= 0 : t ? r === "!=" ? n !== t : r === "^=" ? n.indexOf(t) === 0 : r === "$=" ? n.substr(n.length - t.length) === t : r === "|=" ? n === t || n.substr(0, t.length + 1) === t + "-" : !1 : n && e !== !1
                },POS: function(e, t, n, r) {
                    var i = l.setFilters[t[2]];
                    if (i)
                        return i(e, n, t, r)
                }}}, c = l.match.POS;
        for (var h in l.match)
            l.match[h] = new RegExp(l.match[h].source + /(?![^\[]*\])(?![^\(]*\))/.source), l.leftMatch[h] = new RegExp(/(^(?:.|\r|\n)*?)/.source + l.match[h].source.replace(/\\(\d+)/g, function(e, t) {
                return "\\" + (t - 0 + 1)
            }));
        var p = function(e, t) {
            return e = Array.prototype.slice.call(e, 0), t ? (t.push.apply(t, e), t) : e
        };
        try {
            Array.prototype.slice.call(E.documentElement.childNodes, 0)
        } catch (d) {
            p = function(e, t) {
                t = t || [];
                if (o.call(e) === "[object Array]")
                    Array.prototype.push.apply(t, e);
                else if (typeof e.length == "number")
                    for (var n = 0, r = e.length;
                    n < r;
                    n++)
                        t.push(e[n]);
                else
                    for (n = 0;
                    e[n];
                    n++)
                        t.push(e[n]);
                return t
            }
        }
        var v;
        E.documentElement.compareDocumentPosition ? v = function(e, t) {
            return !e.compareDocumentPosition || !t.compareDocumentPosition ? (e == t && (u = !0), e.compareDocumentPosition ? -1 : 1) : (e = e.compareDocumentPosition(t) & 4 ? -1 : e === t ? 0 : 1, e === 0 && (u = !0), e)
        } : "sourceIndex" in E.documentElement ? v = function(e, t) {
            return !e.sourceIndex || !t.sourceIndex ? (e == t && (u = !0), e.sourceIndex ? -1 : 1) : (e = e.sourceIndex - t.sourceIndex, e === 0 && (u = !0), e)
        } : E.createRange && (v = function(e, t) {
            if (!e.ownerDocument || !t.ownerDocument)
                return e == t && (u = !0), e.ownerDocument ? -1 : 1;
            var n = e.ownerDocument.createRange(), r = t.ownerDocument.createRange();
            return n.setStart(e, 0), n.setEnd(e, 0), r.setStart(t, 0), r.setEnd(t, 0), e = n.compareBoundaryPoints(Range.START_TO_END, r), e === 0 && (u = !0), e
        }), function() {
            var e = E.createElement("div"), n = "script" + (new Date).getTime();
            e.innerHTML = "<a name='" + n + "'/>";
            var r = E.documentElement;
            r.insertBefore(e, r.firstChild), E.getElementById(n) && (l.find.ID = function(e, n, r) {
                if (typeof n.getElementById != "undefined" && !r)
                    return (n = n.getElementById(e[1])) ? n.id === e[1] || typeof n.getAttributeNode != "undefined" && n.getAttributeNode("id").nodeValue === e[1] ? [n] : t : []
            }, l.filter.ID = function(e, t) {
                var n = typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id");
                return e.nodeType === 1 && n && n.nodeValue === t
            }), r.removeChild(e), r = e = null
        }(), function() {
            var e = E.createElement("div");
            e.appendChild(E.createComment("")), e.getElementsByTagName("*").length > 0 && (l.find.TAG = function(e, t) {
                t = t.getElementsByTagName(e[1]);
                if (e[1] === "*") {
                    e = [];
                    for (var n = 0;
                    t[n];
                    n++)
                        t[n].nodeType === 1 && e.push(t[n]);
                    t = e
                }
                return t
            }), e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute != "undefined" && e.firstChild.getAttribute("href") !== "#" && (l.attrHandle.href = function(e) {
                return e.getAttribute("href", 2)
            }), e = null
        }(), E.querySelectorAll && function() {
            var e = f, t = E.createElement("div");
            t.innerHTML = "<p class='TEST'></p>";
            if (!t.querySelectorAll || t.querySelectorAll(".TEST").length !== 0) {
                f = function(t, n, r, i) {
                    n = n || E;
                    if (!i && n.nodeType === 9 && !g(n))
                        try {
                            return p(n.querySelectorAll(t), r)
                        } catch (s) {
                        }
                    return e(t, n, r, i)
                };
                for (var n in e)
                    f[n] = e[n];
                t = null
            }
        }(), function() {
            var e = E.createElement("div");
            e.innerHTML = "<div class='test e'></div><div class='test'></div>", !!e.getElementsByClassName && e.getElementsByClassName("e").length !== 0 && (e.lastChild.className = "e", e.getElementsByClassName("e").length !== 1 && (l.order.splice(1, 0, "CLASS"), l.find.CLASS = function(e, t, n) {
                if (typeof t.getElementsByClassName != "undefined" && !n)
                    return t.getElementsByClassName(e[1])
            }, e = null))
        }();
        var m = E.compareDocumentPosition ? function(e, t) {
            return e.compareDocumentPosition(t) & 16
        } : function(e, t) {
            return e !== t && (e.contains ? e.contains(t) : !0)
        }, g = function(e) {
            return (e = (e ? e.ownerDocument || e : 0).documentElement) ? e.nodeName !== "HTML" : !1
        }, b = function(e, t) {
            var n = [], r = "", i;
            for (t = t.nodeType ? [t] : t;
            i = l.match.PSEUDO.exec(e);
            )
                r += i[0], e = e.replace(l.match.PSEUDO, "");
            e = l.relative[e] ? e + "*" : e, i = 0;
            for (var s = t.length;
            i < s;
            i++)
                f(e, t[i], n);
            return f.filter(r, n)
        };
        y.find = f, y.expr = f.selectors, y.expr[":"] = y.expr.filters, y.unique = f.uniqueSort, y.getText = e, y.isXMLDoc = g, y.contains = m
    }();
    var nt = /Until$/, rt = /^(?:parents|prevUntil|prevAll)/, it = /,/;
    H = Array.prototype.slice;
    var st = function(e, t, n) {
        if (y.isFunction(t))
            return y.grep(e, function(e, r) {
                return !!t.call(e, r, e) === n
            });
        if (t.nodeType)
            return y.grep(e, function(e) {
                return e === t === n
            });
        if (typeof t == "string") {
            var r = y.grep(e, function(e) {
                return e.nodeType === 1
            });
            if (T.test(t))
                return y.filter(t, r, !n);
            t = y.filter(t, e)
        }
        return y.grep(e, function(e) {
            return y.inArray(e, t) >= 0 === n
        })
    };
    y.fn.extend({find: function(e) {
            for (var t = this.pushStack("", "find", e), n = 0, r = 0, i = this.length;
            r < i;
            r++) {
                n = t.length, y.find(e, this[r], t);
                if (r > 0)
                    for (var s = n;
                    s < t.length;
                    s++)
                        for (var o = 0;
                        o < n;
                        o++)
                            if (t[o] === t[s]) {
                                t.splice(s--, 1);
                                break
                            }
            }
            return t
        },has: function(e) {
            var t = y(e);
            return this.filter(function() {
                for (var e = 0, n = t.length;
                e < n;
                e++)
                    if (y.contains(this, t[e]))
                        return !0
            })
        },not: function(e) {
            return this.pushStack(st(this, e, !1), "not", e)
        },filter: function(e) {
            return this.pushStack(st(this, e, !0), "filter", e)
        },is: function(e) {
            return !!e && y.filter(e, this).length > 0
        },closest: function(e, t) {
            if (y.isArray(e)) {
                var n = [], r = this[0], i, s = {}, o;
                if (r && e.length) {
                    i = 0;
                    for (var u = e.length;
                    i < u;
                    i++)
                        o = e[i], s[o] || (s[o] = y.expr.match.POS.test(o) ? y(o, t || this.context) : o);
                    for (;
                    r && r.ownerDocument && r !== t;
                    ) {
                        for (o in s) {
                            i = s[o];
                            if (i.jquery ? i.index(r) > -1 : y(r).is(i))
                                n.push({selector: o,elem: r}), delete s[o]
                        }
                        r = r.parentNode
                    }
                }
                return n
            }
            var a = y.expr.match.POS.test(e) ? y(e, t || this.context) : null;
            return this.map(function(n, r) {
                for (;
                r && r.ownerDocument && r !== t;
                ) {
                    if (a ? a.index(r) > -1 : y(r).is(e))
                        return r;
                    r = r.parentNode
                }
                return null
            })
        },index: function(e) {
            return !e || typeof e == "string" ? y.inArray(this[0], e ? y(e) : this.parent().children()) : y.inArray(e.jquery ? e[0] : e, this)
        },add: function(e, t) {
            return e = typeof e == "string" ? y(e, t || this.context) : y.makeArray(e), t = y.merge(this.get(), e), this.pushStack(h(e[0]) || h(t[0]) ? t : y.unique(t))
        },andSelf: function() {
            return this.add(this.prevObject)
        }}), y.each({parent: function(e) {
            return (e = e.parentNode) && e.nodeType !== 11 ? e : null
        },parents: function(e) {
            return y.dir(e, "parentNode")
        },parentsUntil: function(e, t, n) {
            return y.dir(e, "parentNode", n)
        },next: function(e) {
            return y.nth(e, 2, "nextSibling")
        },prev: function(e) {
            return y.nth(e, 2, "previousSibling")
        },nextAll: function(e) {
            return y.dir(e, "nextSibling")
        },prevAll: function(e) {
            return y.dir(e, "previousSibling")
        },nextUntil: function(e, t, n) {
            return y.dir(e, "nextSibling", n)
        },prevUntil: function(e, t, n) {
            return y.dir(e, "previousSibling", n)
        },siblings: function(e) {
            return y.sibling(e.parentNode.firstChild, e)
        },children: function(e) {
            return y.sibling(e.firstChild)
        },contents: function(e) {
            return y.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : y.makeArray(e.childNodes)
        }}, function(e, t) {
        y.fn[e] = function(n, r) {
            var i = y.map(this, t, n);
            return nt.test(e) || (r = n), r && typeof r == "string" && (i = y.filter(r, i)), i = this.length > 1 ? y.unique(i) : i, (this.length > 1 || it.test(r)) && rt.test(e) && (i = i.reverse()), this.pushStack(i, e, H.call(arguments).join(","))
        }
    }), y.extend({filter: function(e, t, n) {
            return n && (e = ":not(" + e + ")"), y.find.matches(e, t)
        },dir: function(e, n, r) {
            var i = [];
            for (e = e[n];
            e && e.nodeType !== 9 && (r === t || !y(e).is(r));
            )
                e.nodeType === 1 && i.push(e), e = e[n];
            return i
        },nth: function(e, t, n) {
            t = t || 1;
            for (var r = 0;
            e;
            e = e[n])
                if (e.nodeType === 1 && ++r === t)
                    break;
            return e
        },sibling: function(e, t) {
            for (var n = [];
            e;
            e = e.nextSibling)
                e.nodeType === 1 && e !== t && n.push(e);
            return n
        }});
    var ot = / jQuery\d+="(?:\d+|null)"/g, ut = /^\s+/, at = /(<([\w:]+)[^>]*?)\/>/g, ft = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i, lt = /<([\w:]+)/, ct = /<tbody/i, ht = /<|&\w+;/, pt = function(e, t, n) {
        return ft.test(n) ? e : t + "></" + n + ">"
    }, dt = {option: [1, "<select multiple='multiple'>", "</select>"],legend: [1, "<fieldset>", "</fieldset>"],thead: [1, "<table>", "</table>"],tr: [2, "<table><tbody>", "</tbody></table>"],td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],area: [1, "<map>", "</map>"],_default: [0, "", ""]};
    dt.optgroup = dt.option, dt.tbody = dt.tfoot = dt.colgroup = dt.caption = dt.thead, dt.th = dt.td, y.support.htmlSerialize || (dt._default = [1, "div<div>", "</div>"]), y.fn.extend({text: function(e) {
            return y.isFunction(e) ? this.each(function(t) {
                var n = y(this);
                return n.text(e.call(this, t, n.text()))
            }) : typeof e != "object" && e !== t ? this.empty().append((this[0] && this[0].ownerDocument || E).createTextNode(e)) : y.getText(this)
        },wrapAll: function(e) {
            if (y.isFunction(e))
                return this.each(function(t) {
                    y(this).wrapAll(e.call(this, t))
                });
            if (this[0]) {
                var t = y(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this;
                    e.firstChild && e.firstChild.nodeType === 1;
                    )
                        e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },wrapInner: function(e) {
            return this.each(function() {
                var t = y(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },wrap: function(e) {
            return this.each(function() {
                y(this).wrapAll(e)
            })
        },unwrap: function() {
            return this.parent().each(function() {
                y.nodeName(this, "body") || y(this).replaceWith(this.childNodes)
            }).end()
        },append: function() {
            return this.domManip(arguments, !0, function(e) {
                this.nodeType === 1 && this.appendChild(e)
            })
        },prepend: function() {
            return this.domManip(arguments, !0, function(e) {
                this.nodeType === 1 && this.insertBefore(e, this.firstChild)
            })
        },before: function() {
            if (this[0] && this[0].parentNode)
                return this.domManip(arguments, !1, function(e) {
                    this.parentNode.insertBefore(e, this)
                });
            if (arguments.length) {
                var e = y(arguments[0]);
                return e.push.apply(e, this.toArray()), this.pushStack(e, "before", arguments)
            }
        },after: function() {
            if (this[0] && this[0].parentNode)
                return this.domManip(arguments, !1, function(e) {
                    this.parentNode.insertBefore(e, this.nextSibling)
                });
            if (arguments.length) {
                var e = this.pushStack(this, "after", arguments);
                return e.push.apply(e, y(arguments[0]).toArray()), e
            }
        },clone: function(e) {
            var t = this.map(function() {
                if (!y.support.noCloneEvent && !y.isXMLDoc(this)) {
                    var e = this.outerHTML, t = this.ownerDocument;
                    return e || (e = t.createElement("div"), e.appendChild(this.cloneNode(!0)), e = e.innerHTML), y.clean([e.replace(ot, "").replace(ut, "")], t)[0]
                }
                return this.cloneNode(!0)
            });
            return e === !0 && (p(this, t), p(this.find("*"), t.find("*"))), t
        },html: function(e) {
            if (e === t)
                return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(ot, "") : null;
            if (typeof e == "string" && !/<script/i.test(e) && (y.support.leadingWhitespace || !ut.test(e)) && !dt[(lt.exec(e) || ["", ""])[1].toLowerCase()])
                try {
                    for (var n = 0, r = this.length;
                    n < r;
                    n++)
                        this[n].nodeType === 1 && (v(this[n].getElementsByTagName("*")), this[n].innerHTML = e)
                } catch (i) {
                    this.empty().append(e)
                }
            else
                y.isFunction(e) ? this.each(function(t) {
                    var n = y(this), r = n.html();
                    n.empty().append(function() {
                        return e.call(this, t, r)
                    })
                }) : this.empty().append(e);
            return this
        },replaceWith: function(e) {
            return this[0] && this[0].parentNode ? (y.isFunction(e) || (e = y(e).detach()), this.each(function() {
                var t = this.nextSibling, n = this.parentNode;
                y(this).remove(), t ? y(t).before(e) : y(n).append(e)
            })) : this.pushStack(y(y.isFunction(e) ? e() : e), "replaceWith", e)
        },detach: function(e) {
            return this.remove(e, !0)
        },domManip: function(e, n, i) {
            function s(e) {
                return y.nodeName(e, "table") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
            }
            var o, u, a = e[0], f = [];
            if (y.isFunction(a))
                return this.each(function(r) {
                    var s = y(this);
                    return e[0] = a.call(this, r, n ? s.html() : t), s.domManip(e, n, i)
                });
            if (this[0]) {
                o = e[0] && e[0].parentNode && e[0].parentNode.nodeType === 11 ? {fragment: e[0].parentNode} : d(e, this, f);
                if (u = o.fragment.firstChild) {
                    n = n && y.nodeName(u, "tr");
                    for (var l = 0, c = this.length;
                    l < c;
                    l++)
                        i.call(n ? s(this[l], u) : this[l], o.cacheable || this.length > 1 || l > 0 ? o.fragment.cloneNode(!0) : o.fragment)
                }
                f && y.each(f, r)
            }
            return this
        }}), y.fragments = {}, y.each({appendTo: "append",prependTo: "prepend",insertBefore: "before",insertAfter: "after",replaceAll: "replaceWith"}, function(e, t) {
        y.fn[e] = function(n) {
            var r = [];
            n = y(n);
            for (var i = 0, s = n.length;
            i < s;
            i++) {
                var o = (i > 0 ? this.clone(!0) : this).get();
                y.fn[t].apply(y(n[i]), o), r = r.concat(o)
            }
            return this.pushStack(r, e, n.selector)
        }
    }), y.each({remove: function(e, t) {
            if (!e || y.filter(e, [this]).length)
                !t && this.nodeType === 1 && (v(this.getElementsByTagName("*")), v([this])), this.parentNode && this.parentNode.removeChild(this)
        },empty: function() {
            for (this.nodeType === 1 && v(this.getElementsByTagName("*"));
            this.firstChild;
            )
                this.removeChild(this.firstChild)
        }}, function(e, t) {
        y.fn[e] = function() {
            return this.each(t, arguments)
        }
    }), y.extend({clean: function(e, t, n, r) {
            t = t || E, typeof t.createElement == "undefined" && (t = t.ownerDocument || t[0] && t[0].ownerDocument || E);
            var i = [];
            y.each(e, function(e, n) {
                typeof n == "number" && (n += "");
                if (n) {
                    if (typeof n == "string" && !ht.test(n))
                        n = t.createTextNode(n);
                    else if (typeof n == "string") {
                        n = n.replace(at, pt);
                        var r = (lt.exec(n) || ["", ""])[1].toLowerCase(), s = dt[r] || dt._default, o = s[0];
                        e = t.createElement("div");
                        for (e.innerHTML = s[1] + n + s[2];
                        o--;
                        )
                            e = e.lastChild;
                        if (!y.support.tbody) {
                            o = ct.test(n), r = r === "table" && !o ? e.firstChild && e.firstChild.childNodes : s[1] === "<table>" && !o ? e.childNodes : [];
                            for (s = r.length - 1;
                            s >= 0;
                            --s)
                                y.nodeName(r[s], "tbody") && !r[s].childNodes.length && r[s].parentNode.removeChild(r[s])
                        }
                        !y.support.leadingWhitespace && ut.test(n) && e.insertBefore(t.createTextNode(ut.exec(n)[0]), e.firstChild), n = y.makeArray(e.childNodes)
                    }
                    n.nodeType ? i.push(n) : i = y.merge(i, n)
                }
            });
            if (n)
                for (e = 0;
                i[e];
                e++)
                    r && y.nodeName(i[e], "script") && (!i[e].type || i[e].type.toLowerCase() === "text/javascript") ? r.push(i[e].parentNode ? i[e].parentNode.removeChild(i[e]) : i[e]) : (i[e].nodeType === 1 && i.splice.apply(i, [e + 1, 0].concat(y.makeArray(i[e].getElementsByTagName("script")))), n.appendChild(i[e]));
            return i
        }});
    var vt = /z-?index|font-?weight|opacity|zoom|line-?height/i, mt = /alpha\([^)]*\)/, gt = /opacity=([^)]*)/, yt = /float/i, bt = /-([a-z])/ig, wt = /([A-Z])/g, Et = /^-?\d+(?:px)?$/i, St = /^-?\d/, xt = {position: "absolute",visibility: "hidden",display: "block"}, Tt = ["Left", "Right"], Nt = ["Top", "Bottom"], Ct = E.defaultView && E.defaultView.getComputedStyle, kt = y.support.cssFloat ? "cssFloat" : "styleFloat", Lt = function(e, t) {
        return t.toUpperCase()
    };
    y.fn.css = function(e, n) {
        return i(this, e, n, !0, function(e, n, r) {
            if (r === t)
                return y.curCSS(e, n);
            typeof r == "number" && !vt.test(n) && (r += "px"), y.style(e, n, r)
        })
    }, y.extend({style: function(e, n, r) {
            if (!e || e.nodeType === 3 || e.nodeType === 8)
                return t;
            (n === "width" || n === "height") && parseFloat(r) < 0 && (r = t);
            var i = e.style || e, s = r !== t;
            return !y.support.opacity && n === "opacity" ? (s && (i.zoom = 1, n = parseInt(r, 10) + "" == "NaN" ? "" : "alpha(opacity=" + r * 100 + ")", e = i.filter || y.curCSS(e, "filter") || "", i.filter = mt.test(e) ? e.replace(mt, n) : n), i.filter && i.filter.indexOf("opacity=") >= 0 ? parseFloat(gt.exec(i.filter)[1]) / 100 + "" : "") : (yt.test(n) && (n = kt), n = n.replace(bt, Lt), s && (i[n] = r), i[n])
        },css: function(e, t, n, r) {
            if (t === "width" || t === "height") {
                var i, s = t === "width" ? Tt : Nt;
                function o() {
                    i = t === "width" ? e.offsetWidth : e.offsetHeight, r !== "border" && y.each(s, function() {
                        r || (i -= parseFloat(y.curCSS(e, "padding" + this, !0)) || 0), r === "margin" ? i += parseFloat(y.curCSS(e, "margin" + this, !0)) || 0 : i -= parseFloat(y.curCSS(e, "border" + this + "Width", !0)) || 0
                    })
                }
                return e.offsetWidth !== 0 ? o() : y.swap(e, xt, o), Math.max(0, Math.round(i))
            }
            return y.curCSS(e, t, n)
        },curCSS: function(e, t, n) {
            var r, i = e.style;
            if (!y.support.opacity && t === "opacity" && e.currentStyle)
                return r = gt.test(e.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "", r === "" ? "1" : r;
            yt.test(t) && (t = kt);
            if (!n && i && i[t])
                r = i[t];
            else if (Ct) {
                yt.test(t) && (t = "float"), t = t.replace(wt, "-$1").toLowerCase(), i = e.ownerDocument.defaultView;
                if (!i)
                    return null;
                if (e = i.getComputedStyle(e, null))
                    r = e.getPropertyValue(t);
                t === "opacity" && r === "" && (r = "1")
            } else if (e.currentStyle) {
                n = t.replace(bt, Lt), r = e.currentStyle[t] || e.currentStyle[n];
                if (!Et.test(r) && St.test(r)) {
                    t = i.left;
                    var s = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, i.left = n === "fontSize" ? "1em" : r || 0, r = i.pixelLeft + "px", i.left = t, e.runtimeStyle.left = s
                }
            }
            return r
        },swap: function(e, t, n) {
            var r = {};
            for (var i in t)
                r[i] = e.style[i], e.style[i] = t[i];
            n.call(e);
            for (i in t)
                e.style[i] = r[i]
        }}), y.expr && y.expr.filters && (y.expr.filters.hidden = function(e) {
        var t = e.offsetWidth, n = e.offsetHeight, r = e.nodeName.toLowerCase() === "tr";
        return t === 0 && n === 0 && !r ? !0 : t > 0 && n > 0 && !r ? !1 : y.curCSS(e, "display") === "none"
    }, y.expr.filters.visible = function(e) {
        return !y.expr.filters.hidden(e)
    });
    var At = s(), Ot = /<script(.|\s)*?\/script>/gi, Mt = /select|textarea/i, _t = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i, Dt = /=\?(&|$)/, Pt = /\?/, Ht = /(\?|&)_=.*?(&|$)/, Bt = /^(\w+:)?\/\/([^\/?#]+)/, jt = /%20/g;
    y.fn.extend({_load: y.fn.load,load: function(e, t, n) {
            if (typeof e != "string")
                return this._load(e);
            if (!this.length)
                return this;
            var r = e.indexOf(" ");
            if (r >= 0) {
                var i = e.slice(r, e.length);
                e = e.slice(0, r)
            }
            return r = "GET", t && (y.isFunction(t) ? (n = t, t = null) : typeof t == "object" && (t = y.param(t, y.ajaxSettings.traditional), r = "POST")), y.ajax({url: e,type: r,dataType: "html",data: t,context: this,complete: function(e, t) {
                    (t === "success" || t === "notmodified") && this.html(i ? y("<div />").append(e.responseText.replace(Ot, "")).find(i) : e.responseText), n && this.each(n, [e.responseText, t, e])
                }}), this
        },serialize: function() {
            return y.param(this.serializeArray())
        },serializeArray: function() {
            return this.map(function() {
                return this.elements ? y.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || Mt.test(this.nodeName) || _t.test(this.type))
            }).map(function(e, t) {
                return e = y(this).val(), e == null ? null : y.isArray(e) ? y.map(e, function(e) {
                    return {name: t.name,value: e}
                }) : {name: t.name,value: e}
            }).get()
        }}), y.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
        y.fn[t] = function(e) {
            return this.bind(t, e)
        }
    }), y.extend({get: function(e, t, n, r) {
            return y.isFunction(t) && (r = r || n, n = t, t = null), y.ajax({type: "GET",url: e,data: t,success: n,dataType: r})
        },getScript: function(e, t) {
            return y.get(e, null, t, "script")
        },getJSON: function(e, t, n) {
            return y.get(e, t, n, "json")
        },post: function(e, t, n, r) {
            return y.isFunction(t) && (r = r || n, n = t, t = {}), y.ajax({type: "POST",url: e,data: t,success: n,dataType: r})
        },ajaxSetup: function(e) {
            y.extend(y.ajaxSettings, e)
        },ajaxSettings: {url: location.href,global: !0,type: "GET",contentType: "application/x-www-form-urlencoded",processData: !0,async: !0,xhr: e.XMLHttpRequest && (e.location.protocol !== "file:" || !e.ActiveXObject) ? function() {
                return new e.XMLHttpRequest
            } : function() {
                try {
                    return new e.ActiveXObject("Microsoft.XMLHTTP")
                } catch (t) {
                }
            },accepts: {xml: "application/xml, text/xml",html: "text/html",script: "text/javascript, application/javascript",json: "application/json, text/javascript",text: "text/plain",_default: "*/*"}},lastModified: {},etag: {},ajax: function(n) {
            function r() {
                u.success && u.success.call(c, l, f, w), u.global && o("ajaxSuccess", [w, u])
            }
            function i() {
                u.complete && u.complete.call(c, w, f), u.global && o("ajaxComplete", [w, u]), u.global && !--y.active && y.event.trigger("ajaxStop")
            }
            function o(e, t) {
                (u.context ? y(u.context) : y.event).trigger(e, t)
            }
            var u = y.extend(!0, {}, y.ajaxSettings, n), a, f, l, c = u.context || u, h = u.type.toUpperCase();
            u.data && u.processData && typeof u.data != "string" && (u.data = y.param(u.data, u.traditional));
            if (u.dataType === "jsonp") {
                if (h === "GET")
                    Dt.test(u.url) || (u.url += (Pt.test(u.url) ? "&" : "?") + (u.jsonp || "callback") + "=?");
                else if (!u.data || !Dt.test(u.data))
                    u.data = (u.data ? u.data + "&" : "") + (u.jsonp || "callback") + "=?";
                u.dataType = "json"
            }
            u.dataType === "json" && (u.data && Dt.test(u.data) || Dt.test(u.url)) && (a = u.jsonpCallback || "jsonp" + At++, u.data && (u.data = (u.data + "").replace(Dt, "=" + a + "$1")), u.url = u.url.replace(Dt, "=" + a + "$1"), u.dataType = "script", e[a] = e[a] || function(n) {
                l = n, r(), i(), e[a] = t;
                try {
                    delete e[a]
                } catch (s) {
                }
                v && v.removeChild(m)
            }), u.dataType === "script" && u.cache === null && (u.cache = !1);
            if (u.cache === !1 && h === "GET") {
                var p = s(), d = u.url.replace(Ht, "$1_=" + p + "$2");
                u.url = d + (d === u.url ? (Pt.test(u.url) ? "&" : "?") + "_=" + p : "")
            }
            u.data && h === "GET" && (u.url += (Pt.test(u.url) ? "&" : "?") + u.data), u.global && !(y.active++) && y.event.trigger("ajaxStart"), p = (p = Bt.exec(u.url)) && (p[1] && p[1] !== location.protocol || p[2] !== location.host);
            if (u.dataType === "script" && h === "GET" && p) {
                var v = E.getElementsByTagName("head")[0] || E.documentElement, m = E.createElement("script");
                m.src = u.url, u.scriptCharset && (m.charset = u.scriptCharset);
                if (!a) {
                    var g = !1;
                    m.onload = m.onreadystatechange = function() {
                        !g && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (g = !0, r(), i(), m.onload = m.onreadystatechange = null, v && m.parentNode && v.removeChild(m))
                    }
                }
                return v.insertBefore(m, v.firstChild), t
            }
            var b = !1, w = u.xhr();
            if (w) {
                u.username ? w.open(h, u.url, u.async, u.username, u.password) : w.open(h, u.url, u.async);
                try {
                    (u.data || n && n.contentType) && w.setRequestHeader("Content-Type", u.contentType), u.ifModified && (y.lastModified[u.url] && w.setRequestHeader("If-Modified-Since", y.lastModified[u.url]), y.etag[u.url] && w.setRequestHeader("If-None-Match", y.etag[u.url])), p || w.setRequestHeader("X-Requested-With", "XMLHttpRequest"), w.setRequestHeader("Accept", u.dataType && u.accepts[u.dataType] ? u.accepts[u.dataType] + ", */*" : u.accepts._default)
                } catch (S) {
                }
                if (u.beforeSend && u.beforeSend.call(c, w, u) === !1)
                    return u.global && !--y.active && y.event.trigger("ajaxStop"), w.abort(), !1;
                u.global && o("ajaxSend", [w, u]);
                var x = w.onreadystatechange = function(e) {
                    if (!w || w.readyState === 0)
                        b || i(), b = !0, w && (w.onreadystatechange = y.noop);
                    else if (!b && w && (w.readyState === 4 || e === "timeout")) {
                        b = !0, w.onreadystatechange = y.noop, f = e === "timeout" ? "timeout" : y.httpSuccess(w) ? u.ifModified && y.httpNotModified(w, u.url) ? "notmodified" : "success" : "error";
                        if (f === "success")
                            try {
                                l = y.httpData(w, u.dataType, u)
                            } catch (t) {
                                f = "parsererror"
                            }
                        f === "success" || f === "notmodified" ? a || r() : y.handleError(u, w, f), i(), e === "timeout" && w.abort(), u.async && (w = null)
                    }
                };
                try {
                    var T = w.abort;
                    w.abort = function() {
                        w && (T.call(w), w && (w.readyState = 0)), x()
                    }
                } catch (N) {
                }
                u.async && u.timeout > 0 && setTimeout(function() {
                    w && !b && x("timeout")
                }, u.timeout);
                try {
                    w.send(h === "POST" || h === "PUT" || h === "DELETE" ? u.data : null)
                } catch (C) {
                    y.handleError(u, w, null, C), i()
                }
                return u.async || x(), w
            }
        },handleError: function(t, n, r, i) {
            t.error && t.error.call(t.context || e, n, r, i), t.global && (t.context ? y(t.context) : y.event).trigger("ajaxError", [n, t, i])
        },active: 0,httpSuccess: function(e) {
            try {
                return !e.status && location.protocol === "file:" || e.status >= 200 && e.status < 300 || e.status === 304 || e.status === 1223 || e.status === 0
            } catch (t) {
            }
            return !1
        },httpNotModified: function(e, t) {
            var n = e.getResponseHeader("Last-Modified"), r = e.getResponseHeader("Etag");
            return n && (y.lastModified[t] = n), r && (y.etag[t] = r), e.status === 304 || e.status === 0
        },httpData: function(t, n, r) {
            var i = t.getResponseHeader("content-type") || "", s = n === "xml" || !n && i.indexOf("xml") >= 0;
            t = s ? t.responseXML : t.responseText;
            if (s && t.documentElement.nodeName === "parsererror")
                throw "parsererror";
            r && r.dataFilter && (t = r.dataFilter(t, n));
            if (typeof t == "string")
                if (n === "json" || !n && i.indexOf("json") >= 0) {
                    if (!/^[\],:{}\s]*$/.test(t.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
                        throw "Invalid JSON: " + t;
                    t = e.JSON && e.JSON.parse ? e.JSON.parse(t) : (new Function("return " + t))()
                } else
                    (n === "script" || !n && i.indexOf("javascript") >= 0) && y.globalEval(t);
            return t
        },param: function(e, n) {
            function r(e, t) {
                t = y.isFunction(t) ? t() : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            }
            var i = [];
            return n === t && (n = y.ajaxSettings.traditional), y.isArray(e) || e.jquery ? y.each(e, function() {
                r(this.name, this.value)
            }) : y.each(e, function s(e, t) {
                y.isArray(t) ? y.each(t, function(t, i) {
                    n ? r(e, i) : s(e + "[" + (typeof i == "object" || y.isArray(i) ? t : "") + "]", i)
                }) : !n && t != null && typeof t == "object" ? y.each(t, function(t, n) {
                    s(e + "[" + t + "]", n)
                }) : r(e, t)
            }), i.join("&").replace(jt, "+")
        }});
    var Ft = {}, It = /toggle|show|hide/, qt = /^([+-]=)?([\d+-.]+)(.*)$/, Rt, Ut = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
    y.fn.extend({show: function(e, t) {
            if (e != null)
                return this.animate(m("show", 3), e, t);
            e = 0;
            for (t = this.length;
            e < t;
            e++) {
                var n = y.data(this[e], "olddisplay");
                this[e].style.display = n || "";
                if (y.css(this[e], "display") === "none") {
                    n = this[e].nodeName;
                    var r;
                    if (Ft[n])
                        r = Ft[n];
                    else {
                        var i = y("<" + n + " />").appendTo("body");
                        r = i.css("display"), r === "none" && (r = "block"), i.remove(), Ft[n] = r
                    }
                    y.data(this[e], "olddisplay", r)
                }
            }
            e = 0;
            for (t = this.length;
            e < t;
            e++)
                this[e].style.display = y.data(this[e], "olddisplay") || "";
            return this
        },hide: function(e, t) {
            if (e != null)
                return this.animate(m("hide", 3), e, t);
            e = 0;
            for (t = this.length;
            e < t;
            e++) {
                var n = y.data(this[e], "olddisplay");
                !n && n !== "none" && y.data(this[e], "olddisplay", y.css(this[e], "display"))
            }
            e = 0;
            for (t = this.length;
            e < t;
            e++)
                this[e].style.display = "none";
            return this
        },_toggle: y.fn.toggle,toggle: function(e, t) {
            var n = typeof e == "boolean";
            return y.isFunction(e) && y.isFunction(t) ? this._toggle.apply(this, arguments) : e == null || n ? this.each(function() {
                var t = n ? e : y(this).is(":hidden");
                y(this)[t ? "show" : "hide"]()
            }) : this.animate(m("toggle", 3), e, t), this
        },fadeTo: function(e, t, n) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: t}, e, n)
        },animate: function(e, t, n, r) {
            var i = y.speed(t, n, r);
            return y.isEmptyObject(e) ? this.each(i.complete) : this[i.queue === !1 ? "each" : "queue"](function() {
                var t = y.extend({}, i), n, r = this.nodeType === 1 && y(this).is(":hidden"), s = this;
                for (n in e) {
                    var o = n.replace(bt, Lt);
                    n !== o && (e[o] = e[n], delete e[n], n = o);
                    if (e[n] === "hide" && r || e[n] === "show" && !r)
                        return t.complete.call(this);
                    (n === "height" || n === "width") && this.style && (t.display = y.css(this, "display"), t.overflow = this.style.overflow), y.isArray(e[n]) && ((t.specialEasing = t.specialEasing || {})[n] = e[n][1], e[n] = e[n][0])
                }
                return t.overflow != null && (this.style.overflow = "hidden"), t.curAnim = y.extend({}, e), y.each(e, function(n, i) {
                    var o = new y.fx(s, t, n);
                    if (It.test(i))
                        o[i === "toggle" ? r ? "show" : "hide" : i](e);
                    else {
                        var u = qt.exec(i), a = o.cur(!0) || 0;
                        if (u) {
                            i = parseFloat(u[2]);
                            var f = u[3] || "px";
                            f !== "px" && (s.style[n] = (i || 1) + f, a = (i || 1) / o.cur(!0) * a, s.style[n] = a + f), u[1] && (i = (u[1] === "-=" ? -1 : 1) * i + a), o.custom(a, i, f)
                        } else
                            o.custom(a, i, "")
                    }
                }), !0
            })
        },stop: function(e, t) {
            var n = y.timers;
            return e && this.queue([]), this.each(function() {
                for (var e = n.length - 1;
                e >= 0;
                e--)
                    n[e].elem === this && (t && n[e](!0), n.splice(e, 1))
            }), t || this.dequeue(), this
        }}), y.each({slideDown: m("show", 1),slideUp: m("hide", 1),slideToggle: m("toggle", 1),fadeIn: {opacity: "show"},fadeOut: {opacity: "hide"}}, function(e, t) {
        y.fn[e] = function(e, n) {
            return this.animate(t, e, n)
        }
    }), y.extend({speed: function(e, t, n) {
            var r = e && typeof e == "object" ? e : {complete: n || !n && t || y.isFunction(e) && e,duration: e,easing: n && t || t && !y.isFunction(t) && t};
            return r.duration = y.fx.off ? 0 : typeof r.duration == "number" ? r.duration : y.fx.speeds[r.duration] || y.fx.speeds._default, r.old = r.complete, r.complete = function() {
                r.queue !== !1 && y(this).dequeue(), y.isFunction(r.old) && r.old.call(this)
            }, r
        },easing: {linear: function(e, t, n, r) {
                return n + r * e
            },swing: function(e, t, n, r) {
                return (-Math.cos(e * Math.PI) / 2 + .5) * r + n
            }},timers: [],fx: function(e, t, n) {
            this.options = t, this.elem = e, this.prop = n, t.orig || (t.orig = {})
        }}), y.fx.prototype = {update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this), (y.fx.step[this.prop] || y.fx.step._default)(this), (this.prop === "height" || this.prop === "width") && this.elem.style && (this.elem.style.display = "block")
        },cur: function(e) {
            return this.elem[this.prop] == null || !!this.elem.style && this.elem.style[this.prop] != null ? (e = parseFloat(y.css(this.elem, this.prop, e))) && e > -1e4 ? e : parseFloat(y.curCSS(this.elem, this.prop)) || 0 : this.elem[this.prop]
        },custom: function(e, t, n) {
            function r(e) {
                return i.step(e)
            }
            this.startTime = s(), this.start = e, this.end = t, this.unit = n || this.unit || "px", this.now = this.start, this.pos = this.state = 0;
            var i = this;
            r.elem = this.elem, r() && y.timers.push(r) && !Rt && (Rt = setInterval(y.fx.tick, 13))
        },show: function() {
            this.options.orig[this.prop] = y.style(this.elem, this.prop), this.options.show = !0, this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), y(this.elem).show()
        },hide: function() {
            this.options.orig[this.prop] = y.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        },step: function(e) {
            var t = s(), n = !0;
            if (e || t >= this.options.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), this.options.curAnim[this.prop] = !0;
                for (var r in this.options.curAnim)
                    this.options.curAnim[r] !== !0 && (n = !1);
                if (n) {
                    this.options.display != null && (this.elem.style.overflow = this.options.overflow, e = y.data(this.elem, "olddisplay"), this.elem.style.display = e ? e : this.options.display, y.css(this.elem, "display") === "none" && (this.elem.style.display = "block")), this.options.hide && y(this.elem).hide();
                    if (this.options.hide || this.options.show)
                        for (var i in this.options.curAnim)
                            y.style(this.elem, i, this.options.orig[i]);
                    this.options.complete.call(this.elem)
                }
                return !1
            }
            return i = t - this.startTime, this.state = i / this.options.duration, e = this.options.easing || (y.easing.swing ? "swing" : "linear"), this.pos = y.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || e](this.state, i, 0, 1, this.options.duration), this.now = this.start + (this.end - this.start) * this.pos, this.update(), !0
        }}, y.extend(y.fx, {tick: function() {
            for (var e = y.timers, t = 0;
            t < e.length;
            t++)
                e[t]() || e.splice(t--, 1);
            e.length || y.fx.stop()
        },stop: function() {
            clearInterval(Rt), Rt = null
        },speeds: {slow: 600,fast: 200,_default: 400},step: {opacity: function(e) {
                y.style(e.elem, "opacity", e.now)
            },_default: function(e) {
                e.elem.style && e.elem.style[e.prop] != null ? e.elem.style[e.prop] = (e.prop === "width" || e.prop === "height" ? Math.max(0, e.now) : e.now) + e.unit : e.elem[e.prop] = e.now
            }}}), y.expr && y.expr.filters && (y.expr.filters.animated = function(e) {
        return y.grep(y.timers, function(t) {
            return e === t.elem
        }).length
    }), y.fn.offset = "getBoundingClientRect" in E.documentElement ? function(e) {
        var t = this[0];
        if (!t || !t.ownerDocument)
            return null;
        if (e)
            return this.each(function(t) {
                y.offset.setOffset(this, e, t)
            });
        if (t === t.ownerDocument.body)
            return y.offset.bodyOffset(t);
        var n = t.getBoundingClientRect(), r = t.ownerDocument;
        return t = r.body, r = r.documentElement, {top: n.top + (self.pageYOffset || y.support.boxModel && r.scrollTop || t.scrollTop) - (r.clientTop || t.clientTop || 0),left: n.left + (self.pageXOffset || y.support.boxModel && r.scrollLeft || t.scrollLeft) - (r.clientLeft || t.clientLeft || 0)}
    } : function(e) {
        var t = this[0];
        if (!t || !t.ownerDocument)
            return null;
        if (e)
            return this.each(function(t) {
                y.offset.setOffset(this, e, t)
            });
        if (t === t.ownerDocument.body)
            return y.offset.bodyOffset(t);
        y.offset.initialize();
        var n = t.offsetParent, r = t, i = t.ownerDocument, s, o = i.documentElement, u = i.body;
        r = (i = i.defaultView) ? i.getComputedStyle(t, null) : t.currentStyle;
        for (var a = t.offsetTop, f = t.offsetLeft;
        (t = t.parentNode) && t !== u && t !== o;
        ) {
            if (y.offset.supportsFixedPosition && r.position === "fixed")
                break;
            s = i ? i.getComputedStyle(t, null) : t.currentStyle, a -= t.scrollTop, f -= t.scrollLeft, t === n && (a += t.offsetTop, f += t.offsetLeft, y.offset.doesNotAddBorder && (!y.offset.doesAddBorderForTableAndCells || !/^t(able|d|h)$/i.test(t.nodeName)) && (a += parseFloat(s.borderTopWidth) || 0, f += parseFloat(s.borderLeftWidth) || 0), r = n, n = t.offsetParent), y.offset.subtractsBorderForOverflowNotVisible && s.overflow !== "visible" && (a += parseFloat(s.borderTopWidth) || 0, f += parseFloat(s.borderLeftWidth) || 0), r = s
        }
        if (r.position === "relative" || r.position === "static")
            a += u.offsetTop, f += u.offsetLeft;
        return y.offset.supportsFixedPosition && r.position === "fixed" && (a += Math.max(o.scrollTop, u.scrollTop), f += Math.max(o.scrollLeft, u.scrollLeft)), {top: a,left: f}
    }, y.offset = {initialize: function() {
            var e = E.body, t = E.createElement("div"), n, r, i, s = parseFloat(y.curCSS(e, "marginTop", !0)) || 0;
            y.extend(t.style, {position: "absolute",top: 0,left: 0,margin: 0,border: 0,width: "1px",height: "1px",visibility: "hidden"}), t.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>", e.insertBefore(t, e.firstChild), n = t.firstChild, r = n.firstChild, i = n.nextSibling.firstChild.firstChild, this.doesNotAddBorder = r.offsetTop !== 5, this.doesAddBorderForTableAndCells = i.offsetTop === 5, r.style.position = "fixed", r.style.top = "20px", this.supportsFixedPosition = r.offsetTop === 20 || r.offsetTop === 15, r.style.position = r.style.top = "", n.style.overflow = "hidden", n.style.position = "relative", this.subtractsBorderForOverflowNotVisible = r.offsetTop === -5, this.doesNotIncludeMarginInBodyOffset = e.offsetTop !== s, e.removeChild(t), y.offset.initialize = y.noop
        },bodyOffset: function(e) {
            var t = e.offsetTop, n = e.offsetLeft;
            return y.offset.initialize(), y.offset.doesNotIncludeMarginInBodyOffset && (t += parseFloat(y.curCSS(e, "marginTop", !0)) || 0, n += parseFloat(y.curCSS(e, "marginLeft", !0)) || 0), {top: t,left: n}
        },setOffset: function(e, t, n) {
            /static/.test(y.curCSS(e, "position")) && (e.style.position = "relative");
            var r = y(e), i = r.offset(), s = parseInt(y.curCSS(e, "top", !0), 10) || 0, o = parseInt(y.curCSS(e, "left", !0), 10) || 0;
            y.isFunction(t) && (t = t.call(e, n, i)), n = {top: t.top - i.top + s,left: t.left - i.left + o}, "using" in t ? t.using.call(e, n) : r.css(n)
        }}, y.fn.extend({position: function() {
            if (!this[0])
                return null;
            var e = this[0], t = this.offsetParent(), n = this.offset(), r = /^body|html$/i.test(t[0].nodeName) ? {top: 0,left: 0} : t.offset();
            return n.top -= parseFloat(y.curCSS(e, "marginTop", !0)) || 0, n.left -= parseFloat(y.curCSS(e, "marginLeft", !0)) || 0, r.top += parseFloat(y.curCSS(t[0], "borderTopWidth", !0)) || 0, r.left += parseFloat(y.curCSS(t[0], "borderLeftWidth", !0)) || 0, {top: n.top - r.top,left: n.left - r.left}
        },offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || E.body;
                e && !/^body|html$/i.test(e.nodeName) && y.css(e, "position") === "static";
                )
                    e = e.offsetParent;
                return e
            })
        }}), y.each(["Left", "Top"], function(e, n) {
        var r = "scroll" + n;
        y.fn[r] = function(n) {
            var i = this[0], s;
            return i ? n !== t ? this.each(function() {
                (s = g(this)) ? s.scrollTo(e ? y(s).scrollLeft() : n, e ? n : y(s).scrollTop()) : this[r] = n
            }) : (s = g(i)) ? "pageXOffset" in s ? s[e ? "pageYOffset" : "pageXOffset"] : y.support.boxModel && s.document.documentElement[r] || s.document.body[r] : i[r] : null
        }
    }), y.each(["Height", "Width"], function(e, n) {
        var r = n.toLowerCase();
        y.fn["inner" + n] = function() {
            return this[0] ? y.css(this[0], r, !1, "padding") : null
        }, y.fn["outer" + n] = function(e) {
            return this[0] ? y.css(this[0], r, !1, e ? "margin" : "border") : null
        }, y.fn[r] = function(e) {
            var i = this[0];
            return i ? "scrollTo" in i && i.document ? i.document.compatMode === "CSS1Compat" && i.document.documentElement["client" + n] || i.document.body["client" + n] : i.nodeType === 9 ? Math.max(i.documentElement["client" + n], i.body["scroll" + n], i.documentElement["scroll" + n], i.body["offset" + n], i.documentElement["offset" + n]) : e === t ? y.css(i, r) : this.css(r, typeof e == "string" ? e : e + "px") : e == null ? null : this
        }
    }), e.jQuery = e.$ = y
}(window), function(e) {
    e.fn.ellipsis = function(t) {
        var n = document.documentElement.style;
        return "textOverflow" in n || "OTextOverflow" in n ? this : this.each(function() {
            var n = e(this);
            if (n.css("overflow") == "hidden") {
                var r = n.html(), i = n.width(), s = e(this.cloneNode(!0)).hide().css({position: "absolute",width: "auto",overflow: "visible","max-width": "inherit"});
                n.after(s);
                var o = r;
                while (o.length > 0 && s.width() > n.width())
                    o = o.substr(0, o.length - 1), s.html(o + "...");
                n.html(s.html()), s.remove();
                if (t == 1) {
                    var u = n.width();
                    setInterval(function() {
                        n.width() != u && (u = n.width(), n.html(r), n.ellipsis())
                    }, 200)
                }
            }
        })
    }
}(jQuery), jQuery(document).ready(function() {
    jQuery("div#main div#content div.center-stack a.name,          #main #content #selectedgenre #selectedcontent ul li a,          #main #content .center-stack div.lockup-info ul li,          #main #content .center-stack div.content div.lockup div.lockup-info a.album,          #main #content #left-stack div.in-app-purchases span.in-app-title,          #main #content .nav ul li a.top-level-genre,          #main #content .track-list table tr td.name span.text,          #main #content .track-list table tr:not(.tv-episode) td span.text,          #main #content .track-list table tr td span.itunes-plus,          #main #content .track-list table tr td.price > span,          #main #content .track-list table tr td > span a,          #main #content .track-list table tr td > span a,          #main #content .track-list table tr td > a span,          body.linkmaker #lm_results div.result div.artists h5,          body.linkmaker #search_form label span,          body.linkmaker #bulk_form label span,          body.linkmaker #lm_results div.result div.tracklist table thead th span,          body.linkmaker #lm_results div.result div.tracklist table tbody td span,          body.linkmaker #lm_results div.result div.artists a.link,          body.linkmaker #lm_results div.result div.tracklist table tbody td a.link,          .itvs_bottom > #purchase_history div.purchase table td span,          .itvs_bottom > #purchase_history div.purchase table td a").ellipsis()
})
