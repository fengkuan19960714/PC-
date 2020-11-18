! function (a, e, t) {
    "use strict";
    var i = function (a) {
        this.wrap = a.wrap, this.count = a.count, this.callback = a.callback, this.prevText = a.prevText || "&laquo;", this.nextText = a.nextText || "&raquo;", this.differNumber = 3, this.current = a.current || 1, this.ajax = a.ajax, this.init()
    };
    a.Pagination = i, i.prototype.init = function () {
        var a = this,
            e = a.wrap,
            i = a.current,
            r = a.callback,
            l = a.ajax,
            s = a.get,
            n = a.render;
        t(e).html(n.call(a, i)).on("click", "li", function () {
            var e = t(this),
                c = parseInt(e.text()),
                u = e.data("ruler");
            if (t.isNumeric(c) && (i = c), (t.isNumeric(c) || u) && !e.hasClass("am-disabled")) {
                switch (u) {
                    case "prev":
                        i -= 1;
                        break;
                    case "next":
                        i += 1
                }
                t(a.wrap).html(n.call(a, i))
            }
            l && s.call(a, i), "function" == typeof r && r(i)
        }).on("click", "a", function (a) {
            a.preventDefault()
        })
    }, i.prototype.get = function (a) {
        var e = this,
            i = e.ajax,
            r = i.url + a,
            l = i.data,
            s = i.success,
            n = i.error;
        t.get(r, l).success(function (a) {
            "function" == typeof s && s(a)
        }).error(function (a) {
            "function" == typeof n && n(a)
        })
    }, i.prototype.render = function (a) {
        if (a) {
            var e, t, i, r = [],
                l = this,
                s = l.count,
                n = l.differNumber,
                c = l.prevText,
                u = l.nextText,
                h = 2 * n + 1;
            s > h ? (e = 0 >= a - n ? 1 : a - n, t = a + n >= s ? a - (a + n + 1 - s) : e, i = t + (n + 2) >= s ? s : t + n + 1) : (t = 1, i = s), a > 1 ? r.push('<li data-ruler="prev"><a href="#">' + c + "</a></li>") : r.push('<li data-ruler="prev" class="am-disabled"><a href="#">' + c + "</a></li>"), i > h && a + n >= s && (r.push('<li><a href="#">1</a></li>'), r.push('<li class="am-disabled"><a href="#">...</a></li>'));
            for (var o = t; i >= o; o++) a === o ? r.push('<li class="am-active"><a href="#">' + o + "</a></li>") : r.push('<li><a href="#">' + o + "</a></li>");
            return s > h && s > a + n && (r.push('<li class="am-disabled"><a href="#">...</a></li>'), r.push('<li><a href="#">' + s + "</a></li>")), a === s ? r.push('<li data-ruler="next" class="am-disabled"><a href="#">' + u + "</a></li>") : r.push('<li data-ruler="next"><a href="#">' + u + "</a></li>"), r.join("")
        }
    }
}(window, void 0, jQuery);